/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthError, getErrorMessage } from "@repo/common";
import { NextRequest, NextResponse } from "next/server";

export default function systemHandler(handler: any) {
  return async (req: NextRequest, res: NextResponse) => {
    try {
      if (
        req.headers.get("Authorization") !==
        `Bearer ${process.env.SYSTEM_AUTHENTICATION_KEY}`
      ) {
        throw new AuthError();
      }

      return await handler(req, res);
    } catch (error) {
      console.error("[API] system handler", error);

      if (error instanceof AuthError) {
        return NextResponse.json(
          {
            message: getErrorMessage(error),
            status: "FAIL",
          },
          { status: 401 },
        );
      }

      return NextResponse.json(
        {
          message: getErrorMessage(error),
          status: "FAIL",
        },
        { status: 500 },
      );
    }
  };
}
