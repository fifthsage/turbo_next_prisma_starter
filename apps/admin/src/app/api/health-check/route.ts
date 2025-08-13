import { networkInterfaces } from "os";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    return NextResponse.json(networkInterfaces(), { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 401 });
  }
};
