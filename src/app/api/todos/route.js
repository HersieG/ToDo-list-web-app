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

export async function DELETE(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();
    // console.log("id type:", typeof id);
    const deletedTodo = await prisma.todo.delete({
      where: { id: id },
    });

    return NextResponse.json(deletedTodo);
  } catch (error) {
    console.error("ERR: ", error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const { id, title, description, due_date, priority } = body;

    const updatedPost = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        description: description,
        due_date: due_date,
        priority: priority,
      },
    });
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}
