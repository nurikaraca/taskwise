import { NextResponse } from "next/server";
import { db } from '@/db';
import { auth } from "@/auth"

export async function GET() {
    try {
        const session = await auth();
        if (!session || !session.user?.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }
        
        const userId = session.user.id;
        const groups = await db.group.findMany({
           
            where: {
                OR: [
                    { ownerId: userId },  
                    { members: { some: { userId: userId } } } 
                ]
            },
            include: {
                members: true 
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