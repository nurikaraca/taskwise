
import { NextResponse } from "next/server";
import { db } from "@/db";
import { auth } from "@/auth";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session || !session.user?.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const { searchParams } = new URL(req.url);
        const groupId = searchParams.get("groupId");

        if (!groupId) {
            return NextResponse.json({ message: "Group ID is required" }, { status: 400 });
        }


        const tasks = await db.task.findMany({
            where: { groupId },
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