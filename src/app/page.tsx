/**
 * Vitrine Portfolio — Lighthouse 100 (W-1)
 * RSC, zéro JS client inutile, style humain et minimaliste.
 * Projets chargés depuis Neon (Prisma).
 */
import Link from "next/link";
import { prisma } from "@/lib/db";

async function getProjects() {
  try {
    return await prisma.project.findMany({
      orderBy: { order: "asc" },
    });
  } catch {
    return [];
  }
}

export const metadata = {
  title: "Portfolio",
  description:
    "Portfolio minimaliste — projets et contact. Sobre, sincère, humain.",
  openGraph: {
    title: "florent-le-bot | Portfolio",
    description:
      "Portfolio minimaliste — projets et contact. Sobre, sincère, humain.",
  },
};

export default async function Home() {
  const projects = await getProjects();

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <main
        className="max-w-2xl mx-auto px-4 py-12 sm:py-16"
        style={{
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        {/* Présentation — espacement carnet */}
        <section
          className="mb-10 sm:mb-12"
          style={{ marginBottom: "var(--spacing-section)" }}
        >
          <h1
            className="text-2xl font-normal tracking-tight mb-4"
            style={{
              marginBottom: "var(--spacing-carnet)",
              lineHeight: 1.3,
              color: "var(--foreground)",
            }}
          >
            Bienvenue
          </h1>
          <p
            className="text-[var(--muted)]"
            style={{ lineHeight: "var(--line-height-read)" }}
          >
            Portfolio sobre et sincère. Travail en cours, idées en mouvement.
          </p>
        </section>

        {/* Projets (Neon) */}
        <section
          className="mb-10 sm:mb-12"
          style={{ marginBottom: "var(--spacing-section)" }}
        >
          <h2
            className="text-lg font-normal mb-6"
            style={{
              color: "var(--foreground)",
              marginBottom: "var(--spacing-carnet)",
            }}
          >
            Projets
          </h2>
          {projects.length === 0 ? (
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Aucun projet pour l&apos;instant. Ils apparaîtront ici après
              ajout en base.
            </p>
          ) : (
            <ul className="space-y-6">
              {projects.map((p) => (
                <li key={p.id} style={{ marginBottom: "var(--spacing-carnet)" }}>
                  <article>
                    <h3 className="font-normal" style={{ color: "var(--foreground)" }}>
                      {p.url ? (
                        <Link
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--foreground)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
                        >
                          {p.title}
                        </Link>
                      ) : (
                        p.title
                      )}
                    </h3>
                    {p.description && (
                      <p
                        className="text-sm mt-1"
                        style={{ color: "var(--muted)", lineHeight: "var(--line-height-read)" }}
                      >
                        {p.description}
                      </p>
                    )}
                  </article>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Contact */}
        <section>
          <h2
            className="text-lg font-normal mb-4"
            style={{ color: "var(--foreground)", marginBottom: "var(--spacing-carnet)" }}
          >
            Contact
          </h2>
          <p
            className="text-sm"
            style={{ color: "var(--muted)", lineHeight: "var(--line-height-read)" }}
          >
            Pour échanger : utilisez le canal de votre choix ou le formulaire
            à venir.
          </p>
        </section>
      </main>
    </div>
  );
}
