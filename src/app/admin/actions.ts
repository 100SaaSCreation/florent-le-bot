"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

export async function createProject(formData: FormData) {
  const title = (formData.get("title") as string)?.trim();
  if (!title) return;
  const description = (formData.get("description") as string)?.trim() || null;
  const kpis = (formData.get("kpis") as string)?.trim() || null;
  const url = (formData.get("url") as string)?.trim() || null;
  const imageUrl = (formData.get("imageUrl") as string)?.trim() || null;
  const orderRaw = formData.get("order");
  const order = orderRaw !== null && orderRaw !== "" ? Number(orderRaw) : 0;

  await prisma.project.create({
    data: { title, description, kpis, url, imageUrl, order },
  });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateProject(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;
  const title = (formData.get("title") as string)?.trim();
  if (!title) return;
  const description = (formData.get("description") as string)?.trim() || null;
  const kpis = (formData.get("kpis") as string)?.trim() || null;
  const url = (formData.get("url") as string)?.trim() || null;
  const imageUrl = (formData.get("imageUrl") as string)?.trim() || null;
  const orderRaw = formData.get("order");
  const order = orderRaw !== null && orderRaw !== "" ? Number(orderRaw) : 0;

  await prisma.project.update({
    where: { id },
    data: { title, description, kpis, url, imageUrl, order },
  });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteProject(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
}
