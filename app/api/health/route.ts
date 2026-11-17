import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    service: "saharacare-backend",
    version: "0.1.0-backend.1",
    timestamp: new Date().toISOString(),
  });
}
