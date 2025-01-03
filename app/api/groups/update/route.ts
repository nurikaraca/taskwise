import { NextResponse } from "next/server";
import { db } from '@/db';
import { auth } from "@/auth"

export async function PUT(req: Request) {
    const session = await auth();

    if (!session || !session.user?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

   try {
    const data = await req.json();
    const {groupId,name,description} = data;

    
    if (!groupId || !name) {
        return NextResponse.json(
            { message: "Invalid data. 'id' and 'title' are required." },
            { status: 400 }
        );
    }


    if (description && description.length > 500) {
        return NextResponse.json(
            { message: "Description is too long. Maximum 500 characters allowed." },
            { status: 400 }
        );
    }

    const updatedGroup = await db.group.update({
        where: {id: groupId },
        data: { name: name, description: description || "" },
    });

    return NextResponse.json(updatedGroup);


   } catch (error: unknown) {
    console.error("Error updating group:", error);
    if (error instanceof Error) {
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }

    return NextResponse.json(
        { message: "Internal Server Error", error: "Unknown error occurred" },
        { status: 500 }
    );
}
}