import { NextResponse } from "next/server";
import { db } from "@/db";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const memberId = url.searchParams.get("memberId");
    const taskId = url.searchParams.get("taskId");

    if (!memberId || !taskId) {
      return NextResponse.json({ message: "Member ID and Task ID are required" }, { status: 400 });
    }

    const userTaskStatus = await db.userTaskStatus.findUnique({
      where: {
        userId_taskId: { userId: memberId, taskId },
      },
      select: {
        isCompleted: true,
      },
    });

    return NextResponse.json(userTaskStatus);
  } catch (error) {
    console.error("Error fetching user task status:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching user task status." },
      { status: 500 }
    );
  }
}
