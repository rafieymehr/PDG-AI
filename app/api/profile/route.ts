import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

const FREE_LIMIT = 10;

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  const [user, usedThisMonth, totalGenerations, onWaitlist] = await Promise.all([
    currentUser(),
    prisma.generation.count({ where: { userId, createdAt: { gte: startOfMonth } } }),
    prisma.generation.count({ where: { userId } }),
    prisma.waitlist.findUnique({ where: { userId } }),
  ]);

  return NextResponse.json({
    name: user?.fullName ?? user?.firstName ?? "User",
    email: user?.primaryEmailAddress?.emailAddress ?? "",
    imageUrl: user?.imageUrl ?? null,
    memberSince: user?.createdAt ?? null,
    plan: "Free",
    usedThisMonth,
    limit: FREE_LIMIT,
    totalGenerations,
    onWaitlist: !!onWaitlist,
  });
}
