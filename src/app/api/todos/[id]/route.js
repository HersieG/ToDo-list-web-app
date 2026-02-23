// app/api/todos/[id]/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(request, { params }) {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = params;

    const todo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(todo);
  } catch (error) {
    console.error("ERR:", error);
    return NextResponse.json({ error: "Failed to get todo" }, { status: 500 });
  }
}
