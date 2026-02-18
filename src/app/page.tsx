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
      className="min-h-screen relative z-10"
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
        {/* Présentation — fade-in, typo suisse */}
        <section
          className="mb-10 sm:mb-12 animate-fade-in"
          style={{ marginBottom: "var(--spacing-section)" }}
        >
          <h1
            className="text-2xl font-normal font-display mb-4"
            style={{
              marginBottom: "var(--spacing-carnet)",
              lineHeight: 1.3,
              color: "var(--foreground)",
              letterSpacing: "var(--letter-spacing-tight)",
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

        {/* Projets (Neon) — fade-in delay, cartes hover */}
        <section
          className="mb-10 sm:mb-12 animate-fade-in animate-fade-in-delay-1"
          style={{ marginBottom: "var(--spacing-section)" }}
        >
          <h2
            className="text-lg font-normal font-display mb-6"
            style={{
              color: "var(--foreground)",
              marginBottom: "var(--spacing-carnet)",
              letterSpacing: "var(--letter-spacing-tight)",
            }}
          >
            Projets
          </h2>
          {projects.length === 0 ? (
            <div
              className="rounded-lg border px-6 py-10 text-center"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--background)" }}
              role="status"
              aria-label="Aucun projet pour l'instant"
            >
              <p
                className="text-base font-normal mb-2"
                style={{ color: "var(--foreground)" }}
              >
                La page blanche attend l&apos;encre.
              </p>
              <p
                className="text-sm"
                style={{ color: "var(--muted)", lineHeight: "var(--line-height-read)" }}
              >
                Les projets apparaîtront ici dès qu&apos;ils seront ajoutés.
              </p>
            </div>
          ) : (
            <ul className="space-y-6">
              {projects.map((p) => (
                <li key={p.id} style={{ marginBottom: "var(--spacing-carnet)" }}>
                  <article className="project-card rounded-lg px-4 py-3">
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

        {/* Contact — fade-in delay */}
        <section className="animate-fade-in animate-fade-in-delay-2">
          <h2
            className="text-lg font-normal font-display mb-4"
            style={{ color: "var(--foreground)", marginBottom: "var(--spacing-carnet)", letterSpacing: "var(--letter-spacing-tight)" }}
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
