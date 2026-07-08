"use server";

import { prisma } from "@/lib/prisma";

export async function createContactRequest(formData: {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  await prisma.contactRequest.create({
    data: {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone || null,
      subject: formData.subject,
      message: formData.message,
      status: "PENDING"
    }
  });

  return { success: true };
}
