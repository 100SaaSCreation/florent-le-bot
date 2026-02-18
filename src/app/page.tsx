/**
 * Vitrine Portfolio Pro — Lighthouse 100 (W-1) — V2.5
 * RSC, grille de cartes, bio, design crème + grain, WCAG AAA.
 */
import Link from "next/link";
import Image from "next/image";
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
        className="max-w-3xl mx-auto px-4 py-12 sm:py-16"
        style={{
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        {/* Bio — fade-in, typo suisse */}
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
            className="text-[var(--muted)] max-w-xl"
            style={{ lineHeight: "var(--line-height-read)" }}
          >
            Artisan du web, je transforme des idées complexes en interfaces
            fluides. Lucidité, performance et design sobre.
          </p>
        </section>

        {/* Projets — grille de cartes, fade-in delay */}
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
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--background)",
              }}
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
                style={{
                  color: "var(--muted)",
                  lineHeight: "var(--line-height-read)",
                }}
              >
                Les projets apparaîtront ici dès qu&apos;ils seront ajoutés.
              </p>
            </div>
          ) : (
            <ul className="projects-grid list-none p-0 m-0">
              {projects.map((p) => (
                <li key={p.id}>
                  <article className="project-card rounded-lg overflow-hidden h-full flex flex-col bg-[var(--background)]">
                    <Link
                      href={p.url || "#"}
                      target={p.url ? "_blank" : undefined}
                      rel={p.url ? "noopener noreferrer" : undefined}
                      className="flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                      aria-label={p.url ? `Voir le projet ${p.title}` : p.title}
                    >
                      {p.imageUrl && (
                        <span className="block relative w-full aspect-[16/10] bg-[var(--border)]">
                          <Image
                            src={p.imageUrl}
                            alt=""
                            fill
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="object-cover"
                          />
                        </span>
                      )}
                      <span className="block p-4 flex-1">
                        <h3
                          className="font-normal text-[var(--foreground)] mb-1"
                          style={{ letterSpacing: "var(--letter-spacing-tight)" }}
                        >
                          {p.title}
                        </h3>
                        {p.description && (
                          <p
                            className="text-sm mt-1"
                            style={{
                              color: "var(--muted)",
                              lineHeight: "var(--line-height-read)",
                            }}
                          >
                            {p.description}
                          </p>
                        )}
                      </span>
                    </Link>
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
            style={{
              color: "var(--foreground)",
              marginBottom: "var(--spacing-carnet)",
              letterSpacing: "var(--letter-spacing-tight)",
            }}
          >
            Contact
          </h2>
          <p
            className="text-sm"
            style={{
              color: "var(--muted)",
              lineHeight: "var(--line-height-read)",
            }}
          >
            Pour échanger : utilisez le canal de votre choix ou le formulaire
            à venir.
          </p>
        </section>
      </main>
    </div>
  );
}
