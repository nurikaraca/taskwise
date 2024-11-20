
import { NextResponse } from "next/server";
import { db } from '@/db';
import { auth } from "@/auth";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  const baseURL = "http://localhost:3000/join/";
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userExists = await db.user.findUnique({
      where: { id: session.user.id },
    });
    if (!userExists) {
      console.log("User not found in the database!");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const data = await req.json();
    const inviteCode = uuidv4(); 
    const inviteLink = `${baseURL}${inviteCode}`;  

    const newGroup = await db.group.create({
      data: {
        name: data.name,
        description: data.description || '',
        ownerId: session.user.id,
        inviteCode,
        inviteLink,  
        members: {
          create: {
            userId: session.user.id,
            role: "ADMIN", 
          },
        },
      },
    });

    return NextResponse.json(newGroup , { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating group:", error.message, error.stack);
      return NextResponse.json(
        { message: "Error creating group!", error: error.message },
        { status: 500 }
      );
    } else {
      console.error("Unknown error creating group:", error);
      return NextResponse.json(
        { message: "Unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
