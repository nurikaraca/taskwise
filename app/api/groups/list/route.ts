import { NextResponse } from "next/server";
import { db } from '@/db';
import { auth } from "@/auth"

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session || !session.user?.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }
        const groups = await db.group.findMany({
            where: {
                ownerId: session.user.id 
               
            }
          });
      
        return NextResponse.json(groups)
    } catch (error) {
        console.error("Error fetching groups:", error);
        return NextResponse.json(
            { message: "An error occurred while fetching groups." },
            { status: 500 }
        );
    }
}