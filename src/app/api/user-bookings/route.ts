import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        OR: [
          { userId: (session.user as any).id },
          { clientEmail: session.user.email || undefined }
        ]
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
