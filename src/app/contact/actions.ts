"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { submitLeadSchema } from "@/lib/schemas/lead";
import { sendLeadNotification } from "@/lib/email";

function formToObject(formData: FormData): Record<string, string> {
  const o: Record<string, string> = {};
  formData.forEach((v, k) => {
    o[k] = typeof v === "string" ? v : "";
  });
  return o;
}

export async function submitLead(formData: FormData) {
  const raw = formToObject(formData);
  const parsed = submitLeadSchema.safeParse(raw);
  if (!parsed.success) redirect("/contact?error=validation");
  const { email, name, message, category } = parsed.data;
  try {
    await prisma.lead.create({
      data: { email, name, message, category: category || null, status: "NEW" },
    });
    await sendLeadNotification({ email, name, message, category: category || null });
  } catch {
    redirect("/contact?error=server");
  }
  redirect("/contact/success");
}
