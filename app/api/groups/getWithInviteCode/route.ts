
import { NextResponse } from "next/server";
import { db } from '@/db'; 
import { auth } from "@/auth"; 

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const inviteCode = url.searchParams.get("inviteCode");
  

    if (!inviteCode) {
      return NextResponse.json(
        { message: "Invite code is required" },
        { status: 400 }
      );
    }


    const group = await db.group.findFirst({
      where: {
        inviteCode,
      },
    });
   console.log(group)
    if (!group) {
      return NextResponse.json({ message: "Group not found" }, { status: 404 });
    }
   
    return NextResponse.json({ group });
  } catch (error) {
    console.error("Error fetching group:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the group." },
      { status: 500 }
    );
  }
}
