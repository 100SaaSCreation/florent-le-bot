/**
 * Dashboard Admin (W-3) — Gestion des projets (CRUD via Server Actions).
 */
import { prisma } from "@/lib/db";
import { createProject, updateProject, deleteProject } from "./actions";
import { AdminToastFromParams } from "@/components/AdminToastFromParams";

export const metadata = {
  title: "Admin | florent-le-bot",
  description: "Espace administrateur — gestion des projets",
};

type Props = { searchParams?: Promise<{ toast?: string }> };

export default async function AdminPage({ searchParams }: Props) {
  const params = await searchParams;
  const toastParam = params?.toast ?? null;
  const [projects, categories] = await Promise.all([
    prisma.project.findMany({ orderBy: { order: "asc" }, include: { category: true } }),
    prisma.category.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <div className="min-h-screen">
      <main className="max-w-3xl mx-auto px-4 py-8">
        <AdminToastFromParams value={toastParam} />
        <h1 className="text-xl font-normal font-display mb-2" style={{ color: "var(--foreground)" }}>
          Admin
        </h1>
        <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
          Gestion des projets. Titre, description, catégorie, URL, image, ordre.
        </p>

        {/* Ajouter un projet */}
        <section className="mb-10">
          <h2 className="text-base font-normal mb-4" style={{ color: "var(--foreground)" }}>
            Ajouter un projet
          </h2>
          <form action={createProject} className="flex flex-col gap-3">
            <input
              type="text"
              name="title"
              required
              placeholder="Titre"
              className="input-admin border px-3 py-2 text-sm rounded"
              aria-label="Titre du projet"
            />
            <textarea
              name="description"
              placeholder="Description (optionnel)"
              rows={2}
              className="input-admin border px-3 py-2 text-sm resize-y rounded"
              aria-label="Description"
            />
            <input
              type="text"
              name="kpis"
              placeholder="KPIs (ex: Réduction 40% temps chargement)"
              className="input-admin border px-3 py-2 text-sm rounded"
              aria-label="KPIs"
            />
            <input
              type="url"
              name="url"
              placeholder="URL (optionnel)"
              className="input-admin border px-3 py-2 text-sm rounded"
              aria-label="Lien du projet"
            />
            <input
              type="url"
              name="imageUrl"
              placeholder="URL de l’image (optionnel)"
              className="input-admin border px-3 py-2 text-sm rounded"
              aria-label="Image"
            />
            <select name="categoryId" className="input-admin border px-3 py-2 text-sm rounded" aria-label="Catégorie du projet">
              <option value="">— Aucune —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <input
              type="number"
              name="order"
              placeholder="Ordre (0, 1, 2…)"
              min={0}
              className="input-admin border px-3 py-2 text-sm w-24 rounded"
              aria-label="Ordre d’affichage"
            />
            <button
              type="submit"
              className="self-start py-2 px-4 bg-stone-800 text-white text-sm hover:bg-stone-700"
            >
              Ajouter
            </button>
          </form>
        </section>

        {/* Liste des projets */}
        <section>
          <h2 className="text-base font-normal mb-4" style={{ color: "var(--foreground)" }}>
            Projets ({projects.length})
          </h2>
          {projects.length === 0 ? (
            <p className="text-sm" style={{ color: "var(--muted)" }}>Aucun projet.</p>
          ) : (
            <ul className="space-y-6">
              {projects.map((p) => (
                <li
                  key={p.id}
                  className="border border-[var(--glass-border)] p-4 rounded-lg transition-colors duration-300"
                style={{ backgroundColor: "var(--glass)" }}
                >
                  <form action={updateProject} className="flex flex-col gap-2">
                    <input type="hidden" name="id" value={p.id} />
                    <input
                      type="text"
                      name="title"
                      defaultValue={p.title}
                      required
                      className="input-admin border px-2 py-1 text-sm rounded"
                      aria-label="Titre"
                    />
                    <textarea
                      name="description"
                      defaultValue={p.description ?? ""}
                      rows={2}
                      className="input-admin border px-2 py-1 text-sm resize-y rounded"
                      aria-label="Description"
                    />
                    <input
                      type="text"
                      name="kpis"
                      defaultValue={p.kpis ?? ""}
                      placeholder="KPIs"
                      className="input-admin border px-2 py-1 text-sm rounded"
                      aria-label="KPIs"
                    />
                    <input
                      type="url"
                      name="url"
                      defaultValue={p.url ?? ""}
                      className="input-admin border px-2 py-1 text-sm rounded"
                      aria-label="URL"
                    />
                    <input
                      type="url"
                      name="imageUrl"
                      defaultValue={p.imageUrl ?? ""}
                      className="input-admin border px-2 py-1 text-sm rounded"
                      aria-label="Image URL"
                    />
                    <select name="categoryId" defaultValue={p.categoryId ?? ""} className="input-admin border px-2 py-1 text-sm rounded" aria-label="Catégorie du projet">
                      <option value="">— Aucune —</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      name="order"
                      defaultValue={p.order}
                      min={0}
                      className="input-admin border px-2 py-1 text-sm w-20 rounded"
                      aria-label="Ordre"
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        type="submit"
                        className="py-1.5 px-3 bg-stone-700 text-white text-sm hover:bg-stone-600"
                      >
                        Enregistrer
                      </button>
                      <form action={deleteProject} className="inline">
                        <input type="hidden" name="id" value={p.id} />
                        <button
                          type="submit"
                          className="py-1.5 px-3 border text-sm rounded hover:opacity-90"
                          style={{ borderColor: "var(--glass-border)", color: "var(--foreground)" }}
                          aria-label={`Supprimer le projet ${p.title}`}
                        >
                          Supprimer
                        </button>
                      </form>
                    </div>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
