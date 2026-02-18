/**
 * Dashboard Admin (W-3) — Gestion des projets (CRUD via Server Actions).
 */
import { prisma } from "@/lib/db";
import { createProject, updateProject, deleteProject } from "./actions";

export const metadata = {
  title: "Admin | florent-le-bot",
  description: "Espace administrateur — gestion des projets",
};

export default async function AdminPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div
      className="min-h-screen px-4 py-8"
      style={{ backgroundColor: "var(--background)" }}
    >
      <main className="max-w-3xl mx-auto">
        <h1 className="text-xl font-normal font-display mb-2" style={{ color: "var(--foreground)" }}>
          Admin
        </h1>
        <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
          Gestion des projets affichés sur la vitrine. Titre, description, URL, image (Unsplash ou autre), ordre.
        </p>

        {/* Ajouter un projet */}
        <section className="mb-10">
          <h2 className="text-base font-normal text-stone-700 mb-4">
            Ajouter un projet
          </h2>
          <form action={createProject} className="flex flex-col gap-3">
            <input
              type="text"
              name="title"
              required
              placeholder="Titre"
              className="border border-stone-300 bg-white px-3 py-2 text-stone-800 text-sm"
              aria-label="Titre du projet"
            />
            <textarea
              name="description"
              placeholder="Description (optionnel)"
              rows={2}
              className="border border-stone-300 bg-white px-3 py-2 text-stone-800 text-sm resize-y"
              aria-label="Description"
            />
            <input
              type="text"
              name="kpis"
              placeholder="KPIs (ex: Réduction 40% temps chargement)"
              className="border border-stone-300 bg-white px-3 py-2 text-stone-800 text-sm"
              aria-label="KPIs"
            />
            <input
              type="url"
              name="url"
              placeholder="URL (optionnel)"
              className="border border-stone-300 bg-white px-3 py-2 text-stone-800 text-sm"
              aria-label="Lien du projet"
            />
            <input
              type="url"
              name="imageUrl"
              placeholder="URL de l’image (optionnel)"
              className="border border-stone-300 bg-white px-3 py-2 text-stone-800 text-sm"
              aria-label="Image"
            />
            <input
              type="number"
              name="order"
              placeholder="Ordre (0, 1, 2…)"
              min={0}
              className="border border-stone-300 bg-white px-3 py-2 text-stone-800 text-sm w-24"
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
          <h2 className="text-base font-normal text-stone-700 mb-4">
            Projets ({projects.length})
          </h2>
          {projects.length === 0 ? (
            <p className="text-stone-500 text-sm">Aucun projet.</p>
          ) : (
            <ul className="space-y-6">
              {projects.map((p) => (
                <li
                  key={p.id}
                  className="border border-stone-200 bg-white p-4"
                >
                  <form action={updateProject} className="flex flex-col gap-2">
                    <input type="hidden" name="id" value={p.id} />
                    <input
                      type="text"
                      name="title"
                      defaultValue={p.title}
                      required
                      className="border border-stone-300 px-2 py-1 text-sm text-stone-800"
                      aria-label="Titre"
                    />
                    <textarea
                      name="description"
                      defaultValue={p.description ?? ""}
                      rows={2}
                      className="border border-stone-300 px-2 py-1 text-sm text-stone-800 resize-y"
                      aria-label="Description"
                    />
                    <input
                      type="text"
                      name="kpis"
                      defaultValue={p.kpis ?? ""}
                      placeholder="KPIs"
                      className="border border-stone-300 px-2 py-1 text-sm text-stone-800"
                      aria-label="KPIs"
                    />
                    <input
                      type="url"
                      name="url"
                      defaultValue={p.url ?? ""}
                      className="border border-stone-300 px-2 py-1 text-sm text-stone-800"
                      aria-label="URL"
                    />
                    <input
                      type="url"
                      name="imageUrl"
                      defaultValue={p.imageUrl ?? ""}
                      className="border border-stone-300 px-2 py-1 text-sm text-stone-800"
                      aria-label="Image URL"
                    />
                    <input
                      type="number"
                      name="order"
                      defaultValue={p.order}
                      min={0}
                      className="border border-stone-300 px-2 py-1 text-sm text-stone-800 w-20"
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
                          className="py-1.5 px-3 border border-stone-400 text-stone-700 text-sm hover:bg-stone-100"
                          aria-label={`Supprimer ${p.title}`}
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
