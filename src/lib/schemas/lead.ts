/**
 * Schéma Zod — Soumission Lead (contact), avec honeypot.
 */
import * as z from "zod";

export const submitLeadSchema = z.object({
  email: z.string().trim().email("Email invalide"),
  name: z.string().trim().min(1, "Nom requis").max(200, "Nom trop long"),
  message: z.string().trim().min(10, "Message trop court").max(5000, "Message trop long"),
  category: z.string().trim().optional(),
  website: z.string().trim().refine((s) => s.length === 0, { message: "Invalid" }), // honeypot
});

export type SubmitLeadInput = z.infer<typeof submitLeadSchema>;
