
import { NextResponse } from 'next/server';
import { db } from '@/db';
import { auth } from '@/auth';

export async function DELETE(req: Request) {
    try {
        const session = await auth();
        if (!session || !session.user?.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const userExists = await db.user.findUnique({
            where: { id: session.user.id },
        });
        if (!userExists) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const url = new URL(req.url);
        const taskId = url.searchParams.get("taskId")
        console.log("apitaskid" , taskId)

        if (!taskId) {
            return NextResponse.json({ message: "Task Id is required" }, { status: 400 })
        }

        const task = await db.task.findUnique({
            where:{id: taskId},
            include:{files: true, group: true}
        });

        if(!task){
            return NextResponse.json({message:"Task Not Found" }, {status:404 })
        }

      
        if(task.assignedToId !== session.user.id){
            return NextResponse.json({
                message:"You are not authorized to delete this task" },
            {status: 403})
        }
        
        console.log("task bu " ,taskId, task)

        await db.task.delete({
            where: { id: taskId }
        });
   
        return NextResponse.json({message: "Task deleted successfully"}, { status: 200 })

    } catch (error: any) {
        console.error("Server Error", error);
        return NextResponse.json(
          { message: error.message || "Internal server error" },
          { status: 500 }
        );
      }
    }