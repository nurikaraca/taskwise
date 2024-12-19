
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

    const { title, description, groupId, dueDate } = await req.json();

    
    if (!dueDate || new Date(dueDate) <= new Date()) {
      return NextResponse.json(
        { message: "Invalid or past due date" },
        { status: 400 }
      );
    }

    
    const groupExists = await db.group.findUnique({
      where: { id: groupId },
    });
    if (!groupExists) {
      return NextResponse.json({ message: "Group not found" }, { status: 404 });
    }

 
    const nonAdminUsers = await db.userGroup.findMany({
      where: {
        groupId,
        role: "USER",
      },
      include: {
        user: true,
      },
    });

    if (nonAdminUsers.length === 0) {
      return NextResponse.json(
        { message: "No non-admin users found in the group" },
        { status: 404 }
      );
    }

    
    const task = await db.$transaction(async (prisma) => {
      
      const userId = session.user?.id

      if(!userId) {
        throw new Error("User is not authenticated.");
      }

      const newTask = await prisma.task.create({
    
        data: {
          title: title || "",
          description: description || "",
          groupId, 
          dueDate: new Date(dueDate),
          assignedToId: userId,
        },
      });

     
      await Promise.all(
        nonAdminUsers.map(async (userGroup) => {
          await prisma.userTaskStatus.create({
            data: {
              userId: userGroup.user.id,
              taskId: newTask.id,
              isCompleted: false, 
            },
          });
        })
      );

      return newTask;
    });

  
    return NextResponse.json(task);
  } catch (error) {
    console.error("Server Error", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
