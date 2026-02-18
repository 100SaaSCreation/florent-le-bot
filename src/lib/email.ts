"use server";

import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export type LeadPayload = { email: string; name: string | null; message: string; category: string | null };

export async function sendLeadNotification(lead: LeadPayload): Promise<{ ok: boolean }> {
  if (!resend) return { ok: false };
  const to = process.env.NOTIFY_EMAIL;
  if (!to) return { ok: false };
  const from = process.env.RESEND_FROM ?? "Portfolio <onboarding@resend.dev>";
  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject: `[Lead] Nouveau message de ${lead.name || lead.email}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; background: #0a0a0b; color: #fafafa; border-radius: 12px;">
          <h1 style="font-size: 18px; margin-bottom: 16px;">Nouveau lead</h1>
          <p style="margin: 8px 0;"><strong>Email :</strong> ${escapeHtml(lead.email)}</p>
          ${lead.name ? `<p style="margin: 8px 0;"><strong>Nom :</strong> ${escapeHtml(lead.name)}</p>` : ""}
          ${lead.category ? `<p style="margin: 8px 0;"><strong>Catégorie :</strong> ${escapeHtml(lead.category)}</p>` : ""}
          <p style="margin: 12px 0 0;"><strong>Message :</strong></p>
          <p style="margin: 8px 0; line-height: 1.6; color: #a1a1aa;">${escapeHtml(lead.message).replace(/\n/g, "<br>")}</p>
        </div>
      `,
    });
    return { ok: !error };
  } catch {
    return { ok: false };
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
