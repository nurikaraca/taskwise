// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import bcrypt from 'bcrypt';

export const POST = async (req: Request) => {
    const { fullname, email, password } = await req.json();
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    try {

        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 409 }
            );
        }
        // Create a new user
        const user = await prisma.user.create({
            data: {
                fullname,
                email,
                password: hashedPassword
            }
        });
        return NextResponse.json(
            { message: 'User created successfully', user },
            { status: 201 }
        )
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json(
            { error: 'User could not be created' },
            { status: 400 }
        )
    }


};
