/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthError, getErrorMessage } from "@repo/common";
import { NextResponse } from "next/server";
import { auth } from "../../auth";

export default function handler(handler: any) {
  return auth(async (req, ...args) => {
    try {
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
