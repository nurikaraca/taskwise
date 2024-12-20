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
   


    if (!groupId) {
        return NextResponse.json({ message: "Group ID is required" }, { status: 400 });
    }

    const group = await db.group.findUnique({
        where: { id: groupId },
    });
 
    if (!group) {
        return NextResponse.json({ message: "Group not found" }, { status: 404 });
    }

    if (group.ownerId !== session.user.id) {
        return NextResponse.json({ message: "You are not authorized to delete this group" }, { status: 403 });
    }
    
    await db.task.deleteMany({
        where: { groupId: groupId }
    })

    await db.userGroup.deleteMany({
        where: { groupId: groupId }
    })

    await db.group.delete({
        where: { id: groupId }
    })

    return NextResponse.json({ message: 'Group deleted' })
}