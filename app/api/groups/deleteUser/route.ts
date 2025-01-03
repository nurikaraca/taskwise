import { NextResponse } from "next/server";
import { db } from '@/db';
import { auth } from "@/auth"

export async function DELETE(req: Request) {
    const session = await auth();
    if (!session || !session.user?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    const data = await req.json()
     const groupId = data.groupId;
    const userId = data.userId


    if (!groupId) {
        return NextResponse.json({ message: "Group ID is required" }, { status: 400 });
    }
    if (!userId) {
        return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    const group = await db.group.findUnique({
        where: { id: groupId },
        include: {members: true},
    });
 
    if (!group) {
        return NextResponse.json({ message: "Group not found" }, { status: 404 });
    }

 

 await db.userGroup.delete({
    where:{
        userId_groupId: {
            userId: userId,
            groupId: groupId,
        },
    }
 });

 return NextResponse.json({ message: 'User removed from group successfully' });
}