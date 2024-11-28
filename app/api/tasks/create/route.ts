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
    const { title, description, groupId } = data;


   // Checks if a group with the given groupId exists in the database
    const groupExists = await db.group.findUnique({
      where: { id: groupId },
    });
    // If the group does not exist, return a 404 status with an error message
    if (!groupExists) {
      return NextResponse.json({ message: "Group not found" }, { status: 404 });
    }

    //Filtering group members (non-admins)
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
      return NextResponse.json({ message: "No non-admin users found in the group" }, { status: 404 });
    }

 // Tasks are created for users who are not admins
    const tasks = await Promise.all(
      nonAdminUsers.map(async (userGroup) => {
        return db.task.create({
          data: {
            title: title || "",
            description: description || "",
            groupId,
            assignedToId: userGroup.user.id, 
          },
        });
      })
    );

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Server Error", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
