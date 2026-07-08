import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");
  const lastName = searchParams.get("lastName");

  if (!reference || !lastName) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    const booking = await prisma.booking.findFirst({
      where: {
        reference: {
          equals: reference,
          mode: "insensitive"
        },
        clientName: {
          contains: lastName,
          mode: "insensitive"
        }
      }
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
