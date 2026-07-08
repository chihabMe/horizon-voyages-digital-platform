"use server";

import { prisma } from "@/lib/prisma";

export async function createVisaRequest(formData: {
  fullName: string;
  phone: string;
  email: string;
  destination: string;
  notes?: string;
}) {
  await prisma.visaRequest.create({
    data: {
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      destination: formData.destination,
      nationality: "Algérienne",
      visaType: "Touristique",
      notes: formData.notes || null,
      status: "PENDING"
    }
  });

  return { success: true };
}
