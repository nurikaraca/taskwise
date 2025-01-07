import { NextResponse } from "next/server";
import { db } from '@/db';
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const session = await auth();
        if (!session || !session.user?.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }



        const userId = session.user.id;


        const adminGroups  = await db.group.findMany({
            where: {
                ownerId: userId,
            },
            select: {
                id: true,
                name: true,
                description: true,
                createdAt: true,
            },
        });
       
        return NextResponse.json(adminGroups);
    } catch (error) {
        console.error("Error fetching admin groups:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
