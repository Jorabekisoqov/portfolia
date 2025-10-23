import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  // In production, send an email or store in DB here
  return NextResponse.json({ ok: true, received: body });
}
