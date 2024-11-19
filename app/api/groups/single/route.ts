

import { NextResponse } from "next/server";
import { db } from '@/db'; 
import { auth } from "@/auth";

export async function GET(req: Request) {
  try {
    
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    
    const url = new URL(req.url);
    const groupId = url.searchParams.get("id");

    if (!groupId) {
      return NextResponse.json({ message: "Group id is required" }, { status: 400 });
    }

  
    const group = await db.group.findUnique({
      where: {
        id: groupId, 
      },
    });

    if (!group) {
      return NextResponse.json({ message: "Group not found" }, { status: 404 });
    }

    return NextResponse.json(group);
  } catch (error) {
    console.error("Error fetching group:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the group." },
      { status: 500 }
    );
  }
}
