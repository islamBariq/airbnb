import bcrypt from "bcrypt";
import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  if (!email && !name && !password) {
    return NextResponse.json("Missing email, name, or password", {
      status: 500,
    });
  }
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashdedPassword: hashedPassword,
    },
  });
  return NextResponse.json(user);
}
