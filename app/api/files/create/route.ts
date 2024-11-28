import { NextResponse } from "next/server";
import { db } from "@/db";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    
    const userExists = await db.user.findUnique({
      where: { id: session.user.id },
    });
    if (!userExists) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    

   
    const data = await req.json();
    const { taskId, fileUrl, fileId } = data;

    
    if (!taskId || !fileUrl || !fileId) {
      return NextResponse.json(
        { message: "Missing required fields: taskId, fileUrl, fileId" },
        { status: 400 }
      );
    }

    
    const taskExists = await db.task.findUnique({
      where: { id: taskId },
    });
    if (!taskExists) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    
    const file = await db.file.create({
      data: {
        fileUrl,
        fileId,
        uploadedBy: session.user.id,
        taskId,
      },
    });

    return NextResponse.json(file, { status: 201 });
  } catch (error) {
    console.error("Server Error", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
