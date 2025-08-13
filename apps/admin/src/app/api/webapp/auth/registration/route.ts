/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@repo/database";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import systemHandler from "../../../_system-handler";

type Body = {
  email: string;
  name: string;
  contact: string;
  role: string;
};

export const POST = systemHandler(async (req: NextRequest) => {
  const { email, name, contact, role = "MANAGER" } = (await req.json()) as Body;

  const erpUserItem = await prisma.erpUser.findUnique({ where: { email } });

  if (erpUserItem) {
    return NextResponse.json(
      {
        message: "이미 등록된 사용자입니다.",
        status: "FAIL",
      },
      { status: 400 },
    );
  }

  const password = Math.random().toString(36).slice(-8);

  const item = await prisma.erpUser.create({
    data: {
      email,
      name,
      contact: contact.replace(/-/g, ""),
      role,
      password: await hash(password, 10),
    },
  });

  return NextResponse.json(
    {
      data: {
        erpUser: { ...item, password },
      },
      message: "사용자가 성공적으로 등록되었습니다.",
      status: "OK",
    },
    { status: 200 },
  );
}) as any;
