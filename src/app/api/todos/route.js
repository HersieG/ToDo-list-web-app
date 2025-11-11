import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(request) {
  try {
    const session = await auth();
    if (session) {
      var userId = session.user?.id;
    }
    const body = await request.json();
    const { title, description, due_date, priority } = body;

    const todo = await prisma.todo.create({
      data: {
        title: title,
        description: description,
        userId: userId,
        due_date: due_date,
        priority: priority,
      },
    });
    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.error("ERR:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (session) {
      var userId = session.user?.id;
    }

    const todos = await prisma.todo.findMany({
      orderBy: { due_date: "desc" },
      where: { userId: userId },
    });
    return NextResponse.json(todos);
  } catch (error) {
    console.error("ERR:", error);
    return NextResponse.json(
      { error: "Failed to fetch task" },
      { status: 500 }
    );
  }
}

// export async function DELETE(request){
//   try{
//     const session = await auth();
//     if(session){
//       var userId = session.user?.id;
//     }

//     const deletedTodo = await prisma.todo.delete({
//       where: {id: request.id}
//     })
//   }
// }
