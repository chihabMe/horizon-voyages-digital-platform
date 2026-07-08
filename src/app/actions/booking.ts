"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createBooking(formData: {
  fullName: string;
  email: string;
  phone: string;
  numberOfPeople: number;
  tripTitle: string;
  totalAmount: number;
  userId?: string;
  notes?: string;
}) {
  const reference = `HV-${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Dates for the tour
  const departureDate = new Date();
  departureDate.setDate(departureDate.getDate() + 30); // 30 days from now
  const returnDate = new Date(departureDate);
  returnDate.setDate(returnDate.getDate() + 8); // 8-day trip
  
  const booking = await prisma.booking.create({
    data: {
      reference,
      clientName: formData.fullName,
      clientEmail: formData.email,
      clientPhone: formData.phone,
      totalAmount: formData.totalAmount,
      departureDate,
      returnDate,
      tripTitle: formData.tripTitle,
      numberOfPeople: formData.numberOfPeople,
      notes: formData.notes,
      userId: formData.userId || null,
      status: "PENDING"
    }
  });

  revalidatePath("/booking");
  return { success: true, reference, booking };
}
