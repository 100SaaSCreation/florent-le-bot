"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { createProjectSchema, updateProjectSchema } from "@/lib/schemas/project";

function formDataToObject(formData: FormData): Record<string, string> {
  const o: Record<string, string> = {};
  formData.forEach((v, k) => {
    o[k] = typeof v === "string" ? v : "";
  });
  return o;
}

export async function createProject(formData: FormData): Promise<void> {
  const parsed = createProjectSchema.safeParse(formDataToObject(formData));
  if (!parsed.success) return;
  try {
    const { title, description, kpis, url, imageUrl, categoryId, order } = parsed.data;
    await prisma.project.create({
      data: { title, description: description ?? undefined, kpis: kpis ?? undefined, url: url ?? undefined, imageUrl: imageUrl ?? undefined, categoryId: categoryId ?? undefined, order },
    });
    revalidatePath("/");
    redirect("/admin?toast=project_added");
  } catch {
    revalidatePath("/admin");
  }
}

export async function updateProject(formData: FormData): Promise<void> {
  const parsed = updateProjectSchema.safeParse(formDataToObject(formData));
  if (!parsed.success) return;
  try {
    const { id, title, description, kpis, url, imageUrl, categoryId, order } = parsed.data;
    await prisma.project.update({
      where: { id },
      data: { title, description: description ?? undefined, kpis: kpis ?? undefined, url: url ?? undefined, imageUrl: imageUrl ?? undefined, categoryId: categoryId ?? undefined, order },
    });
    revalidatePath("/");
    redirect("/admin?toast=project_updated");
  } catch {
    revalidatePath("/admin");
  }
}

export async function deleteProject(formData: FormData): Promise<void> {
  const id = formData.get("id");
  if (typeof id !== "string" || !id.trim()) return;
  try {
    await prisma.project.delete({ where: { id: id.trim() } });
    revalidatePath("/");
    redirect("/admin?toast=project_deleted");
  } catch {
    revalidatePath("/admin");
  }
}
