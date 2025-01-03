import { NextResponse } from "next/server";
import { db } from "@/db";
import { auth } from "@/auth";

export async function GET() {
    try {
        const session = await auth();
        if (!session || !session.user?.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;
        const tasks = await db.userTaskStatus.findMany({
            where: {
                userId: userId,
                isCompleted: false,
                task: {
                    status: "PENDING", 
                    dueDate: {
                        gte: new Date(), 
                    },
                },
            },
            include: {
                task: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        dueDate: true,
                        status:true,
                        groupId: true,
                        assignedToId: true,
                    },
                },
            },
        });

        return NextResponse.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return NextResponse.json(
            { message: "An error occurred while fetching tasks." },
            { status: 500 }
        );
    }
}
