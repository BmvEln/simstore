import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const features = await prisma.feature.findMany();

  return NextResponse.json(features);
}
