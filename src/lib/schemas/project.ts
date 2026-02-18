/**
 * Schémas Zod (W-2) — Validation des entrées Project pour Server Actions.
 */
import * as z from "zod";

function optionalTrimmedString() {
  return z.string().trim().optional().transform((v) => (v === "" || v == null ? null : v));
}

function optionalOrder() {
  return z.coerce.number().int().min(0).catch(0);
}

export const createProjectSchema = z.object({
  title: z.string().trim().min(1, "Titre requis"),
  description: optionalTrimmedString(),
  kpis: optionalTrimmedString(),
  url: optionalTrimmedString(),
  imageUrl: optionalTrimmedString(),
  categoryId: optionalTrimmedString(),
  order: optionalOrder(),
});

export const updateProjectSchema = createProjectSchema.extend({
  id: z.string().min(1, "Id requis"),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
