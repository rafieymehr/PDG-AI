import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const rows = await prisma.generation.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 20,
    select: {
      id: true,
      productName: true,
      category: true,
      tone: true,
      seoTitle: true,
      description: true,
      bullets: true,
      model: true,
      createdAt: true,
    },
  });

  return NextResponse.json(rows);
}
