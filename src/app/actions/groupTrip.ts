"use server";

import { prisma } from "@/lib/prisma";

export async function createGroupTripRequest(formData: {
  fullName: string;
  email: string;
  phone: string;
  destination: string;
  departureDate: string;
  durationDays: number;
  numberOfPeople: number;
  budgetRange: string;
  notes?: string;
}) {
  await prisma.groupTripRequest.create({
    data: {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      destination: formData.destination,
      departureDate: new Date(formData.departureDate),
      durationDays: formData.durationDays,
      numberOfPeople: formData.numberOfPeople,
      budgetRange: formData.budgetRange,
      notes: formData.notes || null,
      status: "PENDING"
    }
  });

  return { success: true };
}
