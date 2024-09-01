import bcrypt from 'bcryptjs';
import prisma from '@/db'; // Adjust the path based on your project structure
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { email, password, name } = await req.json();
    // return NextResponse.json({email, password, name});
    console.log("body", req.json())
    // Check if email and password are provided
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        email,
        hashedPassword,
        name,
      },
    });

    return NextResponse.json({ message: 'User registered successfully', user: newUser }, { status: 201 });
  } catch (error) {
    console.error('Error during user registration:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
