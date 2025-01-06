import { NextResponse } from "next/server";
import { db } from '@/db';
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const { inviteCode } = await req.json();

    if (!inviteCode) {
      return NextResponse.json({ message: "Invite code is required" }, { status: 400 });
    }

    console.log("invitekoduuuuuuuuuuuu" , inviteCode)
    const group = await db.group.findFirst({
      where: { inviteCode }, 
    });

    if (!group) {
      return NextResponse.json({ message: "Group not found" }, { status: 404 });
    }

    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const  isMember = await db.userGroup.findFirst({
      where: {
        userId: session.user.id,
        groupId: group.id,
      },
    })
    
    if (isMember){
      return NextResponse.json({ message: "User is already a member of the group" }, { status: 400 });
    }

    
    await db.userGroup.create({
      data: {
        userId: session.user.id,
        groupId: group.id,
        role: "USER",
      },
    });

    return NextResponse.json({ message: "Joined group successfully" });
  } catch (error) {
    console.error("Error creating user-group relationship:", error);
    return NextResponse.json(
      { message: "An error occurred while joining the group." },
      { status: 500 }
    );
  }
}
