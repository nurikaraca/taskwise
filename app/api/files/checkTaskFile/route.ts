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
    const taskId = searchParams.get("taskId");

    if (!taskId) {
      return NextResponse.json(
        { message: "Missing required query parameter: taskId" },
        { status: 400 }
      );
    }

    const existingFile = await db.file.findFirst({
      where: {
        taskId,
        uploadedBy: session.user.id,
      },
    });

    if (existingFile) {
      return NextResponse.json(
        { message: "File exists for this task and user." },
        { status: 200 }
      );
    }

    return NextResponse.json({ message: "No file found." }, { status: 404 });
  } catch (error) {
    console.error("Server Error", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
