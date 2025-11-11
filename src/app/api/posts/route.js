import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import next from "next";
import { useSession } from "next-auth/react";
import { auth } from "@/auth";

export async function POST(request) {
  try {
    const session = await auth();
    let userId = "";
    console.log(session);
    if (session) {
      userId = session.user?.id;
    }
    const body = await request.json();
    console.log(body);

    const { title, description } = body;

    // saving to database
    const post = await prisma.post.create({
      data: {
        title: title,
        description: description,
        userId: userId,
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();
    let userId = "";
    if (session) {
      userId = session.user?.id;
    }
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      where: { userId: userId },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
