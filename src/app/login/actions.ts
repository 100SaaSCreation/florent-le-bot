"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/db";

const SESSION_COOKIE = "admin_session";
const SESSION_DAYS = 7;

function redirectWithError(from: string, message: string) {
  const params = new URLSearchParams({ error: message });
  if (from && from !== "/admin") params.set("from", from);
  redirect(`/login?${params.toString()}`);
}

export async function login(formData: FormData) {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;
  const from = (formData.get("from") as string) || "/admin";

  if (!email || !password) {
    redirectWithError(from, "Email et mot de passe requis.");
  }

  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) redirectWithError(from, "Identifiants incorrects.");
  const adminUser = admin as { id: string; passwordHash: string };

  const ok = await bcrypt.compare(password, adminUser.passwordHash);
  if (!ok) redirectWithError(from, "Identifiants incorrects.");

  const token = crypto.randomUUID();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_DAYS);

  await prisma.session.create({
    data: {
      adminId: adminUser.id,
      token,
      expiresAt,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
    path: "/",
  });

  redirect(from);
}
