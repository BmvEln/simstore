import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany();

  return NextResponse.json({ users });
}

export async function POST(request: NextResponse) {
  const data = await request.json();

  const user = await prisma.user.create({
    data,
  });

  return NextResponse.json(user);
}

export async function DELETE(request: NextResponse) {
  const { id } = await request.json();
  const user = await prisma.user.delete({
    where: { id },
  });
  return NextResponse.json({ user, message: "User deleted successfully" });
}

export async function PATCH(request: NextResponse) {
  const { id, ...data } = await request.json();
  const user = await prisma.user.update({
    where: { id },
    data,
  });
  return NextResponse.json({ user, message: "User updated successfully" });
}
