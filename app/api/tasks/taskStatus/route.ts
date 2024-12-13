import { NextResponse } from "next/server";
import { db } from "@/db";
import { auth } from "@/auth";

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session || !session.user?.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const taskId = searchParams.get("taskId");

        if (!taskId) {
            return NextResponse.json({ message: "Task ID is required" }, { status: 400 });
        }

        const userId = session.user.id;
        const tasks = await db.userTaskStatus.findMany({
            where: {
                taskId: taskId,
                userId: userId, 
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
