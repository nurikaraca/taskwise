// import { NextResponse } from "next/server";
// import { db } from "@/db";
// import { auth } from "@/auth";

// export async function POST(req: Request) {
//   try {
//     const session = await auth();
//     if (!session || !session.user?.id) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const userExists = await db.user.findUnique({
//       where: { id: session.user.id },
//     });
//     if (!userExists) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     const data = await req.json();
//     const { title, description, groupId, dueDate } = data;



//     if (!dueDate || new Date(dueDate) <= new Date()) {
//       return NextResponse.json(
//         { message: "Invalid or past due date" },
//         { status: 400 }
//       );
//     }


//    // Checks if a group with the given groupId exists in the database
//     const groupExists = await db.group.findUnique({
//       where: { id: groupId },
//     });
//     // If the group does not exist, return a 404 status with an error message
//     if (!groupExists) {
//       return NextResponse.json({ message: "Group not found" }, { status: 404 });
//     }

//     //Filtering group members (non-admins)
//     const nonAdminUsers = await db.userGroup.findMany({
//       where: {
//         groupId,
//         role: "USER", 
//       },
//       include: {
//         user: true, 
//       },
//     });

//     if (nonAdminUsers.length === 0) {
//       return NextResponse.json({ message: "No non-admin users found in the group" }, { status: 404 });
//     }

//  // Tasks are created for users who are not admins
//     const tasks = await Promise.all(
//       nonAdminUsers.map(async (userGroup) => {
//         console.log("uergroup bu ",userGroup)
//         const task =  db.task.create({
//           data: {
//             title: title || "",
//             description: description || "",
//             groupId,
//             assignedToId: userGroup.user.id ,
//             dueDate: new Date(dueDate),
//           },
//         });

//         await db.userTaskStatus.create({
//           data: {
//             userId: userGroup.user.id,
//             taskId: (await task).id,
//             isCompleted: false, // Başlangıç durumu
//           },
//         });
//         return task;
//       })
//     );



//     return NextResponse.json(tasks);
//   } catch (error) {
//     console.error("Server Error", error);
//     return NextResponse.json({ message: "Internal server error" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { db } from "@/db";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();

    // Yetki kontrolü
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Kullanıcı doğrulama
    const userExists = await db.user.findUnique({
      where: { id: session.user.id },
    });
    if (!userExists) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const { title, description, groupId, dueDate } = await req.json();

    // Tarih kontrolü
    if (!dueDate || new Date(dueDate) <= new Date()) {
      return NextResponse.json(
        { message: "Invalid or past due date" },
        { status: 400 }
      );
    }

    // Grup kontrolü
    const groupExists = await db.group.findUnique({
      where: { id: groupId },
    });
    if (!groupExists) {
      return NextResponse.json({ message: "Group not found" }, { status: 404 });
    }

    // Gruba ait kullanıcılar (USER rolündeki kullanıcılar)
    const nonAdminUsers = await db.userGroup.findMany({
      where: {
        groupId,
        role: "USER",
      },
      include: {
        user: true,
      },
    });

    if (nonAdminUsers.length === 0) {
      return NextResponse.json(
        { message: "No non-admin users found in the group" },
        { status: 404 }
      );
    }

    // Görev ve userTaskStatus oluşturma
    const task = await db.$transaction(async (prisma) => {
      
      const userId = session.user?.id

      if(!userId) {
        throw new Error("User is not authenticated.");
      }

      const newTask = await prisma.task.create({
    
        data: {
          title: title || "",
          description: description || "",
          groupId, // Görevin ait olduğu grup
          dueDate: new Date(dueDate),
          assignedToId: userId, // İlk etapta kullanıcıya atanmış olmayabilir
        },
      });

      // Her kullanıcı için userTaskStatus oluştur
      await Promise.all(
        nonAdminUsers.map(async (userGroup) => {
          await prisma.userTaskStatus.create({
            data: {
              userId: userGroup.user.id,
              taskId: newTask.id,
              isCompleted: false, // Varsayılan olarak tamamlanmadı
            },
          });
        })
      );

      return newTask;
    });

    // Başarılı yanıt
    return NextResponse.json(task);
  } catch (error) {
    console.error("Server Error", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
