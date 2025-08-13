/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@repo/database";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import systemHandler from "../../../_system-handler";

type Body = {
  email: string;
};

export const POST = systemHandler(async (req: NextRequest) => {
  const { email } = (await req.json()) as Body;

  const newPassword = Math.random().toString(36).slice(-8);

  const item = await prisma.erpUser.update({
    where: {
      email,
    },
    data: {
      password: await hash(newPassword, 10),
    },
  });

  if (!item) {
    return NextResponse.json(
      {
        status: "FAIL",
      },
      { status: 404 },
    );
  }

  /**
   * TODO: email 발송
   */

  return NextResponse.json(
    {
      data: newPassword,
      message: "임시 비밀번호가 성공적으로 발생됐습니다.",
      status: "OK",
    },
    { status: 200 },
  );
}) as any;
