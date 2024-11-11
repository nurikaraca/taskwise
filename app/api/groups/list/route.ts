import { NextResponse } from "next/server";
import { db } from '@/db';
import { auth } from "@/auth"

export async function GET(req: Request) {
    const session = await auth();
    if (!session || !session.user?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    const groups = await db.group.findMany({
        where: {
            members:{
                some:{
                    userId: session.user.id
                }
            }
        }
    })
    return NextResponse.json(groups)
}