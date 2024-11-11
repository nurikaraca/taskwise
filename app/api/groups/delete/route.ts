import { NextResponse } from "next/server";
import { db } from '@/db';
import { auth } from "@/auth"

export async function DELETE(req: Request) {
    const session = await auth();
    if (!session || !session.user?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    const data = await req.json()

    await db.task.deleteMany({
        where: { groupId: data.id }
    })

    await db.userGroup.deleteMany({
        where: { groupId: data.id }
    })

    await db.group.delete({
        where: { id: data.id }
    })

    return NextResponse.json({ message: 'Group deleted' })
}