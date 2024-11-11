import { NextResponse } from "next/server";
import { db } from '@/db';
import { auth } from "@/auth"

export async function PATCH(req: Request) {
    const session = await auth();
    if (!session || !session.user?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json();
    const updatedGroup = await db.group.update({
        where: { id: data.id },
        data: { name: data.name, description: data.description || '' }
    })
    return NextResponse.json(updatedGroup);

}