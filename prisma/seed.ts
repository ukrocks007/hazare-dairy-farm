import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database for Hazare Dairy Farm...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@hazaredairy.com' },
    update: {},
    create: {
      email: 'admin@hazaredairy.com',
      name: 'Hazare Admin',
      password: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create test customer
  const customerPassword = await bcrypt.hash('customer123', 10);
  const customer = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      name: 'Ravi Kumar',
      password: customerPassword,
      role: 'CUSTOMER',
    },
  });
  console.log('✅ Customer user created:', customer.email);

  // Clear existing products to avoid duplicates if re-seeding differently
  // await prisma.product.deleteMany({}); 

  // Create dairy products
  const products = [
    {
      name: 'Cow Milk (1L)',
      description: 'Fresh, pure cow milk. Delivered daily morning.',
      price: 70,
      image: 'https://images.unsplash.com/photo-1517448931760-9bf4414148c5?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'MILK',
      stock: 500,
      isAvailable: true,
      fatPercentage: 4.5,
      shelfLifeDays: 2,
      isRefrigerated: true,
    },
    {
      name: 'Cow Milk (500ml)',
      description: 'Fresh, pure cow milk in 500ml pack.',
      price: 38,
      image: 'https://images.unsplash.com/photo-1517448931760-9bf4414148c5?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'MILK',
      stock: 500,
      isAvailable: true,
      fatPercentage: 4.5,
      shelfLifeDays: 2,
      isRefrigerated: true,
    },
    {
      name: 'Buffalo Milk (1L)',
      description: 'Rich and creamy buffalo milk. High fat content.',
      price: 85,
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=400',
      category: 'MILK',
      stock: 300,
      isAvailable: true,
      fatPercentage: 7.0,
      shelfLifeDays: 2,
      isRefrigerated: true,
    },
    {
      name: 'Fresh Curd (500g)',
      description: 'Thick, creamy curd set from pure milk.',
      price: 50,
      image: 'https://images.unsplash.com/photo-1562114808-b4b33cf60f4f?q=80&w=2673&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=2048',
      category: 'CURD',
      stock: 100,
      isAvailable: true,
      fatPercentage: 4.0,
      shelfLifeDays: 5,
      isRefrigerated: true,
    },
    {
      name: 'Desi Ghee (500ml)',
      description: 'Aromatic ghee made from traditional bilona method.',
      price: 650,
      image: 'https://images.unsplash.com/photo-1590147315472-e701a4775379?w=2048',
      category: 'GHEE',
      stock: 50,
      isAvailable: true,
      shelfLifeDays: 180,
      isRefrigerated: false,
    },
    {
      name: 'Fresh Paneer (200g)',
      description: 'Soft and fresh paneer cubes. Protein-rich & made from our farm-fresh milk.',
      price: 90,
      image: 'https://www.seriouseats.com/thmb/jdFyRQOfbKA1COGPrkN5927FiBs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20220628-FreshPaneer-AmandaSuarez-11c5e6f76d064cf88153a93d28384bc8.jpg', // Placeholder
      category: 'PANEER',
      stock: 100,
      isAvailable: true,
      fatPercentage: 15.0,
      shelfLifeDays: 3,
      isRefrigerated: true,
    },
    {
      name: 'Butter (500g)',
      description: 'Rich, creamy butter made from pure, fresh milk for everyday goodness.',
      price: 300,
      image: 'https://images.unsplash.com/photo-1662988564960-e7937ade2c99?q=80&w=1307&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Placeholder
      category: 'BUTTER',
      stock: 100,
      isAvailable: true,
      fatPercentage: 80.0,
      shelfLifeDays: 270,
      isRefrigerated: true,
    },
    // Additional products requested
    {
      name: 'Gir Cow Milk (1L)',
      description: 'Premium Gir cow milk — rich, creamy and full-bodied from Gir breed cows.',
      price: 95,
      image: 'https://images.unsplash.com/photo-1517448931760-9bf4414148c5?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0',
      category: 'MILK',
      stock: 200,
      isAvailable: true,
      fatPercentage: 6.0,
      shelfLifeDays: 2,
      isRefrigerated: true,
    },
    {
      name: 'Cow Ghee (500ml)',
      description: 'Pure cow ghee made using traditional methods for authentic aroma and taste.',
      price: 700,
      image: 'https://images.unsplash.com/photo-1590147315472-e701a4775379?w=2048',
      category: 'GHEE',
      stock: 60,
      isAvailable: true,
      shelfLifeDays: 365,
      isRefrigerated: false,
    },
    {
      name: 'Buffalo Ghee (500ml)',
      description: 'Rich buffalo ghee with a deeper flavor and higher solids.',
      price: 750,
      image: 'https://images.unsplash.com/photo-1590147315472-e701a4775379?w=2048',
      category: 'GHEE',
      stock: 40,
      isAvailable: true,
      shelfLifeDays: 365,
      isRefrigerated: false,
    },
    {
      name: 'Taak (Buttermilk) (1L)',
      description: 'Traditional spiced buttermilk, light and refreshing.',
      price: 30,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0',
      category: 'BUTTERMILK',
      stock: 300,
      isAvailable: true,
      fatPercentage: 1.5,
      shelfLifeDays: 1,
      isRefrigerated: true,
    },
    {
      name: 'Lassi (Sweet) (500ml)',
      description: 'Creamy sweet lassi made from fresh curd and milk.',
      price: 55,
      image: 'https://images.unsplash.com/photo-1524594154907-2ddf0c1d8fdf?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0',
      category: 'LASSI',
      stock: 200,
      isAvailable: true,
      fatPercentage: 3.5,
      shelfLifeDays: 2,
      isRefrigerated: true,
    },
    {
      name: 'Khawa (Khoa) (200g)',
      description: 'Rich khawa (khoa) made by reducing full-fat milk — perfect for sweets.',
      price: 130,
      image: 'https://images.unsplash.com/photo-1604908177522-58b0a2f3f4d0?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0',
      category: 'KHOVA',
      stock: 80,
      isAvailable: true,
      fatPercentage: 25.0,
      shelfLifeDays: 7,
      isRefrigerated: true,
    },
    {
      name: 'Basundi (200g)',
      description: 'Thick, sweetened reduced milk dessert flavored with cardamom.',
      price: 95,
      image: 'https://images.unsplash.com/photo-1570246998520-8ed0d603b253?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0',
      category: 'DESSERT',
      stock: 60,
      isAvailable: true,
      shelfLifeDays: 3,
      isRefrigerated: true,
    },
    {
      name: 'Rabadi (200g)',
      description: 'Creamy rabadi made from slow-cooked milk and layered cream.',
      price: 105,
      image: 'https://images.unsplash.com/photo-1562004760-aceedc1eaed5?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0',
      category: 'DESSERT',
      stock: 50,
      isAvailable: true,
      shelfLifeDays: 3,
      isRefrigerated: true,
    },
    {
      name: 'Shrikhand (200g)',
      description: 'Creamy, strained sweetened yogurt flavored with saffron and cardamom.',
      price: 120,
      image: 'https://images.unsplash.com/photo-1612178995668-6a97e5f8b75e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0',
      category: 'DESSERT',
      stock: 80,
      isAvailable: true,
      fatPercentage: 10.0,
      shelfLifeDays: 5,
      isRefrigerated: true,
    },
    {
      name: 'Amrakhand (200g)',
      description: 'Mango-flavored shrikhand made from ripe mangoes and thick yogurt.',
      price: 140,
      image: 'https://images.unsplash.com/photo-1599785209791-6b1df3e8fa9b?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0',
      category: 'DESSERT',
      stock: 70,
      isAvailable: true,
      shelfLifeDays: 5,
      isRefrigerated: true,
    },
  ];

  for (const product of products) {
    const existing = await prisma.product.findFirst({
      where: { name: product.name },
    });

    if (!existing) {
      await prisma.product.create({
        data: product,
      });
    } else {
      // Update existing if needed
      await prisma.product.update({
        where: { id: existing.id },
        data: product
      });
    }
  }
  console.log(`✅ Seeded ${products.length} products`);

  // Create Subscription Packages
  const packages = [
    {
      name: 'Daily Milk Subscription',
      description: 'Get fresh milk delivered to your doorstep every morning.',
      frequency: 'DAILY',
      price: 0, // Pay per delivery calculation usually, or monthly
      features: ['Free Delivery', 'Morning 6-8 AM', 'Pause Anytime'].join('\n'),
      imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400'
    },
    {
      name: 'Alternate Day Milk',
      description: 'Milk delivery every alternate day.',
      frequency: 'ALTERNATE_DAYS',
      price: 0,
      features: ['Flexible Schedule', 'Morning 6-8 AM'].join('\n'),
      imageUrl: 'https://images.unsplash.com/photo-1517448931760-9bf4414148c5?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  ];

  for (const pkg of packages) {
    const existing = await prisma.subscriptionPackage.findFirst({ where: { name: pkg.name } });
    if (!existing) {
      await prisma.subscriptionPackage.create({ data: pkg });
    }
  }
  console.log(`✅ Seeded subscription packages`);

  // Get products for creating sample orders (Recommendation data)
  const allProducts = await prisma.product.findMany();

  // Create a sample address for the customer
  const customerAddress = await prisma.address.upsert({
    where: { id: 'sample-address-1' },
    update: {},
    create: {
      id: 'sample-address-1',
      userId: customer.id,
      name: 'Ravi Kumar',
      phone: '9876543210',
      addressLine1: 'Flat 402, Hazare Heights',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001',
      isDefault: true,
    },
  });
  console.log('✅ Created sample address');

  // Create sample orders
  // Order 1: Milk & Curd
  const milk1L = allProducts.find(p => p.name === 'Cow Milk (1L)');
  const curd = allProducts.find(p => p.name === 'Fresh Curd (500g)');

  if (milk1L && curd) {
    await prisma.order.create({
      data: {
        userId: customer.id,
        addressId: customerAddress.id,
        orderNumber: `ORD-${Date.now()}`,
        totalAmount: milk1L.price + curd.price,
        status: 'DELIVERED',
        paymentStatus: 'PAID',
        items: {
          create: [
            { productId: milk1L.id, quantity: 1, price: milk1L.price },
            { productId: curd.id, quantity: 1, price: curd.price }
          ]
        }
      }
    });
  }

  console.log('🎉 Seeding completed!');
  console.log('\n📝 Test Credentials:');
  console.log('Admin: admin@hazaredairy.com / admin123');
  console.log('Customer: customer@example.com / customer123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
