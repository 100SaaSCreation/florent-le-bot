"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

type LeadStatus = "NEW" | "IN_PROGRESS" | "CLOSED";

export async function updateLeadStatus(formData: FormData) {
  const id = formData.get("id");
  const status = formData.get("status");
  if (typeof id !== "string" || !id.trim() || typeof status !== "string" || !["NEW", "IN_PROGRESS", "CLOSED"].includes(status)) return;
  try {
    await prisma.lead.update({
      where: { id: id.trim() },
      data: { status: status as LeadStatus },
    });
    revalidatePath("/admin");
    revalidatePath("/admin/dashboard");
  } catch {
    revalidatePath("/admin/dashboard");
  }
}
