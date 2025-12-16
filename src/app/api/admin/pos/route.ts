import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Role } from '@/types';

interface POSOrderItem {
  productId: string;
  quantity: number;
}

// POST - Create a POS (in-store) order
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { 
      items, 
      paymentMethod = 'CASH', 
      customerName = 'Walk-in Customer',
      customerPhone = '',
      amountReceived = 0,
      notes = ''
    } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in order' },
        { status: 400 }
      );
    }

    // Validate and fetch products
    const productIds = items.map((item: POSOrderItem) => item.productId);
    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds },
        isAvailable: true,
      },
    });

    if (products.length !== items.length) {
      return NextResponse.json(
        { error: 'Some products not found or unavailable' },
        { status: 404 }
      );
    }

    // Calculate total and validate stock
    let totalAmount = 0;
    const orderItems: { productId: string; quantity: number; price: number }[] = [];

    for (const item of items as POSOrderItem[]) {
      const product = products.find(p => p.id === item.productId);
      if (!product) {
        return NextResponse.json(
          { error: `Product not found: ${item.productId}` },
          { status: 404 }
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${product.name}. Available: ${product.stock}` },
          { status: 400 }
        );
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // Generate order number for POS
    const orderNumber = `POS-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Find or create the customer user (allow walk-in without email/password)
    let customer = null;

    if (customerPhone) {
      customer = await prisma.user.findFirst({ where: { phone: customerPhone } });
    }

    if (!customer && customerName) {
      // Try to find by name and no identifying phone/email - only as a last resort
      customer = await prisma.user.findFirst({ where: { name: customerName } });
    }

    if (!customer && customerPhone) {
      // Create a lightweight walk-in customer with phone
      customer = await prisma.user.create({
        data: {
          name: customerName || 'Walk-in Customer',
          email: null as unknown as string,
          phone: customerPhone,
          role: 'CUSTOMER',
        },
      });
    }

    if (!customer) {
      // Create an anonymous walk-in customer without phone/email
      customer = await prisma.user.create({
        data: {
          name: customerName || 'Walk-in Customer',
          email: null as unknown as string,
          phone: null as unknown as string,
          role: 'CUSTOMER',
        },
      });
    }

    // Update customer name if provided and missing
    if (customerName && (!customer.name || customer.name === 'Walk-in Customer')) {
      customer = await prisma.user.update({ where: { id: customer.id }, data: { name: customerName } });
    }

    // POS orders do not use an address record. They are created without attaching an address.

    // Create the order (assigned to the customer). POS orders do not attach an address
    const createdOrder = await prisma.order.create({
      data: {
        user: { connect: { id: customer.id } },
        orderNumber,
        totalAmount,
        status: 'DELIVERED', // POS orders are immediately delivered
        paymentStatus: 'PAID', // POS orders are paid immediately
        notes: `POS Sale | Customer: ${customerName}${customerPhone ? ` | Phone: ${customerPhone}` : ''}${notes ? ` | Notes: ${notes}` : ''} | Payment: ${paymentMethod}${amountReceived > 0 ? ` | Amount Received: ₹${amountReceived} | Change: ₹${(amountReceived - totalAmount).toFixed(2)}` : ''}`,
        items: {
          create: orderItems,
        },
      },
    });

    // Fetch the created order with items and product details
    const order = await prisma.order.findUnique({
      where: { id: createdOrder.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      throw new Error('Failed to fetch created order');
    }

    // Update product stock
    for (const item of orderItems) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        totalAmount: order.totalAmount,
        items: order.items,
        customerName,
        paymentMethod,
        amountReceived,
        change: amountReceived > 0 ? amountReceived - totalAmount : 0,
      },
    });
  } catch (error) {
    console.error('Error creating POS order:', error);
    return NextResponse.json(
      { error: 'Failed to create POS order' },
      { status: 500 }
    );
  }
}
