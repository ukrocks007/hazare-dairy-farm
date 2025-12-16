import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email = '', phone = '', password } = body;

    // Require at least email or phone
    if (!email && !phone) {
      return NextResponse.json({ error: 'Email or phone is required' }, { status: 400 });
    }

    if (!password || password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    // Find existing users by phone or email
    const existingByPhone = phone ? await prisma.user.findFirst({ where: { phone } }) : null;
    const existingByEmail = email ? await prisma.user.findFirst({ where: { email } }) : null;

    // Conflicting records
    if (existingByPhone && existingByEmail && existingByPhone.id !== existingByEmail.id) {
      return NextResponse.json({ error: 'Conflicting user records found for provided email and phone' }, { status: 409 });
    }

    const existing = existingByPhone || existingByEmail;

    const hashedPassword = await bcrypt.hash(password, 10);

    if (existing) {
      if (existing.password) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 });
      }

      const updated = await prisma.user.update({
        where: { id: existing.id },
        data: {
          name: name || existing.name,
          email: email || existing.email,
          phone: phone || existing.phone,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
        },
      });

      return NextResponse.json({ success: true, user: updated }, { status: 200 });
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        name: name || null,
        email: email || null,
        phone: phone || null,
        password: hashedPassword,
        role: 'CUSTOMER',
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
      },
    });

    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
