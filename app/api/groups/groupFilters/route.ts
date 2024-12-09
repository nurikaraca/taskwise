import { NextResponse } from "next/server";
import { db } from '@/db';
import { auth } from "@/auth";
import { URL } from 'url';
import { GroupRole } from "@prisma/client";

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session || !session.user?.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const url = new URL(req.url);
        const roleParame = url.searchParams.get("role") || "USER";
        

        const role = roleParame.toUpperCase() as keyof typeof GroupRole;
       
        if (!["ADMIN", "USER"].includes(role)) {
            return NextResponse.json({ message: "Invalid role" }, { status: 400 });
        }
        console.log("User ID:", session.user.id);
        console.log("Role:", role);

        const groups = await db.userGroup.findMany({
            where: {
                userId: session.user.id,
                role,
            },
            select: {
                groupId: true, 
            },
        });
        const groupIds = groups.map((group) => group.groupId);

        const relatedGroups = await db.group.findMany({
            where: {
                id: {
                    in: groupIds, 
                },
            },
        });

        return NextResponse.json(relatedGroups);
    } catch (error) {
        console.error("Error fetching groups with role:", error);
        return NextResponse.json(
            { message: "An error occurred while fetching groups with roles." },
            { status: 500 }
        );
    }
}
