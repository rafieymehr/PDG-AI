import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { generateDescription } from "@/lib/ai";
import { prisma } from "@/lib/db";

const FREE_LIMIT = 10;

function startOfMonth() {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const used = await prisma.generation.count({
      where: { userId, createdAt: { gte: startOfMonth() } },
    });

    if (used >= FREE_LIMIT) {
      return NextResponse.json(
        { error: "LIMIT_REACHED", used, limit: FREE_LIMIT },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, category, features, tone = "Professional" } = body;

    if (!name?.trim() || !category?.trim() || !features?.trim()) {
      return NextResponse.json(
        { error: "All fields (name, category, features) are required." },
        { status: 400 }
      );
    }

    const [result, user] = await Promise.all([
      generateDescription({ name, category, features, tone }),
      currentUser(),
    ]);

    await prisma.generation.create({
      data: {
        userId,
        userEmail: user?.primaryEmailAddress?.emailAddress ?? "",
        productName: name,
        category,
        features,
        tone,
        seoTitle: result.seoTitle,
        description: result.description,
        bullets: result.bullets,
        model: process.env.MODEL ?? "claude-sonnet-4-6",
      },
    });

    return NextResponse.json({ ...result, used: used + 1, limit: FREE_LIMIT });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "Failed to generate description. Please try again." },
      { status: 500 }
    );
  }
}
