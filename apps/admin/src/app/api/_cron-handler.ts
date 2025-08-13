/* eslint-disable @typescript-eslint/no-explicit-any */

import { AuthError, getErrorMessage } from "@repo/common";
import { NextRequest, NextResponse } from "next/server";

export default function cronHandler(handler: any) {
  return async (req: NextRequest, res: NextResponse) => {
    try {
      if (
        req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
      ) {
        throw new AuthError();
      }

      return await handler(req, res);
    } catch (error) {
      console.error("[API] cron handler", error);

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
