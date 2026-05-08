import { NextRequest, NextResponse } from "next/server";
import { generateDescription } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, category, features } = body;

    if (!name?.trim() || !category?.trim() || !features?.trim()) {
      return NextResponse.json(
        { error: "All fields (name, category, features) are required." },
        { status: 400 }
      );
    }

    const result = await generateDescription({ name, category, features });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "Failed to generate description. Please try again." },
      { status: 500 }
    );
  }
}
