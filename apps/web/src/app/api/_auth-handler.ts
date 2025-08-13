/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthError, getErrorMessage } from "@repo/common";
import { NextResponse } from "next/server";
import { auth } from "../../auth";

export default function authHandler(handler: any) {
  return auth(async (req, ...args) => {
    try {
      if (!req.auth) {
        throw new AuthError();
      }

      req.headers.set("userId", req.auth?.user?.id || "");

      return await handler(req, ...args);
    } catch (error) {
      console.error("[API] auth handler", error);

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
  });
}
