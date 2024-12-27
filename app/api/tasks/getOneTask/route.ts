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
        const taskId  = searchParams.get("taskId");

        if (!taskId) {
            return NextResponse.json({ message: "Task ID is required" }, { status: 400 });
          }

        const task = await db.task.findUnique({
            where: { id: taskId },
        });

        if (!task) {
            return NextResponse.json({ message: "Task not found" }, { status: 404 });
          }

        

        return NextResponse.json(task);
    } catch (error) {
        console.error("Error fetching task:", error);
        return NextResponse.json(
            { message: "An error occurred while fetching the  task." },
            { status: 500 }
        );
    }
}
