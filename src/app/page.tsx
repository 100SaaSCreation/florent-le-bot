/**
 * Vitrine V4.2 — Hero LCP, thème, accessibilité WCAG AAA
 */
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ThemeToggle } from "@/components/ThemeToggle";

async function getData() {
  try {
    const [projects, testimonials, experiences, stack, faq] = await Promise.all([
      prisma.project.findMany({ orderBy: { order: "asc" }, include: { category: true } }),
      prisma.testimonial.findMany({ orderBy: { order: "asc" } }),
      prisma.experience.findMany({ orderBy: { order: "asc" } }),
      prisma.stack.findMany({ orderBy: { order: "asc" } }),
      prisma.faq.findMany({ orderBy: { order: "asc" } }),
    ]);
    return { projects, testimonials, experiences, stack, faq };
  } catch {
    return { projects: [], testimonials: [], experiences: [], stack: [], faq: [] };
  }
}

const SERVICES = [
  { title: "Audit Performance", desc: "Identification des goulots, Core Web Vitals, recommandations priorisées.", icon: "⚡" },
  { title: "MVP en 4 semaines", desc: "Cadrage, build itératif, livraison d’une première version utilisable.", icon: "🚀" },
  { title: "Design System", desc: "Composants, tokens, documentation. Cohérence et vélocité front.", icon: "◇" },
  { title: "Développement SaaS", desc: "Architecture scalable, auth, billing. Stack moderne et maintenable.", icon: "▲" },
];

export const metadata = {
  title: "Portfolio",
  description: "Lead Developer & Architect — MVP, Audit Performance, Design System. Startup ready.",
  openGraph: {
    title: "florent-le-bot | Portfolio",
    description: "Lead Developer & Architect — MVP, Audit Performance, Design System.",
  },
};

export default async function Home() {
  const { projects, testimonials, experiences, stack, faq } = await getData();

  return (
    <div className="min-h-screen relative z-10 transition-colors duration-300" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>
      <div className="fixed top-4 right-4 z-20" aria-label="Changer le thème">
        <ThemeToggle />
      </div>
      <main id="main-content" className="max-w-4xl mx-auto px-4 py-12 sm:py-20" style={{ paddingTop: "var(--spacing-section)", paddingBottom: "var(--spacing-section)" }}>
        {/* Hero V4.2 — Image LCP + priority */}
        <section className="mb-16 sm:mb-20 animate-fade-in text-center">
          <div className="relative w-full max-w-3xl mx-auto aspect-[21/9] rounded-xl overflow-hidden mb-8 bg-zinc-800/50">
            <Image
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
              alt=""
              width={1200}
              height={514}
              priority
              className="object-cover w-full h-full"
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 font-display"
            style={{ letterSpacing: "var(--letter-spacing-tight)", lineHeight: 1.1, color: "var(--foreground)" }}
          >
            Idées complexes, interfaces fluides
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10" style={{ color: "var(--muted)", lineHeight: 1.5 }}>
            Je conçois et livre des produits web performants : MVP, audit technique, design systems. Lucidité et livraison.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold bg-white text-black hover:bg-zinc-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              aria-label="Aller au formulaire de contact pour démarrer un projet"
            >
              Démarrer un projet
            </Link>
            <Link
              href="#realisations"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold border border-[var(--glass-border)] hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              style={{ color: "var(--foreground)" }}
              aria-label="Voir la section Réalisations"
            >
              Voir les réalisations
            </Link>
          </div>
        </section>

        {/* Logos — Ils me font confiance */}
        {stack.length > 0 && (
          <section className="mb-16 animate-fade-in animate-fade-in-delay-1">
            <p className="text-center text-xs uppercase tracking-widest mb-6" style={{ color: "var(--muted)" }}>
              Ils me font confiance
            </p>
            <div className="flex flex-wrap justify-center gap-8 sm:gap-10">
              {stack.slice(0, 8).map((s) => (
                <span
                  key={s.id}
                  className="text-sm font-medium"
                  style={{ color: "var(--muted)" }}
                >
                  {s.icone ? `${s.icone} ` : ""}{s.nom}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Grille Services */}
        <section className="mb-16 sm:mb-20 animate-fade-in animate-fade-in-delay-1">
          <h2 className="text-xl font-bold font-display mb-8" style={{ letterSpacing: "var(--letter-spacing-tight)", color: "var(--foreground)" }}>
            Offres
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {SERVICES.map((svc, i) => (
              <div key={i} className="glass-card p-5">
                <span className="text-2xl mb-3 block" aria-hidden>{svc.icon}</span>
                <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--foreground)" }}>{svc.title}</h3>
                <p className="text-sm" style={{ color: "var(--muted)", lineHeight: "var(--line-height-read)" }}>{svc.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Témoignages */}
        {testimonials.length > 0 && (
          <section className="mb-16 sm:mb-20 animate-fade-in animate-fade-in-delay-2">
            <h2 className="text-xl font-bold font-display mb-8" style={{ letterSpacing: "var(--letter-spacing-tight)", color: "var(--foreground)" }}>
              Témoignages
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {testimonials.map((t) => (
                <div key={t.id} className="glass-card p-5">
                  {t.avatarUrl && (
                    <img src={t.avatarUrl} alt="" width={48} height={48} className="rounded-full mb-3 object-cover" style={{ width: 48, height: 48 }} />
                  )}
                  <p className="text-sm mb-4" style={{ color: "var(--muted)", lineHeight: "var(--line-height-read)" }}>&ldquo;{t.texte}&rdquo;</p>
                  {t.note != null && <p className="text-xs mb-1" style={{ color: "var(--muted)" }}>{"★".repeat(t.note)}{"☆".repeat(5 - t.note)}</p>}
                  <p className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{t.nom}</p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>{t.role}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Parcours pro */}
        {experiences.length > 0 && (
          <section className="mb-16 sm:mb-20 animate-fade-in animate-fade-in-delay-2">
            <h2 className="text-xl font-bold font-display mb-8" style={{ letterSpacing: "var(--letter-spacing-tight)", color: "var(--foreground)" }}>
              Parcours
            </h2>
            <ul className="space-y-4">
              {experiences.map((e) => (
                <li key={e.id} className="flex flex-wrap justify-between gap-2 py-3 border-b border-[var(--glass-border)]">
                  <div>
                    <span className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{e.boite}</span>
                    <span className="text-sm mx-2" style={{ color: "var(--muted)" }}>—</span>
                    <span className="text-sm" style={{ color: "var(--muted)" }}>{e.poste}</span>
                  </div>
                  <span className="text-sm" style={{ color: "var(--muted)" }}>{e.duree}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Projets / Réalisations */}
        <section id="realisations" className="mb-16 sm:mb-20 animate-fade-in animate-fade-in-delay-2 scroll-mt-8">
          <h2 className="text-xl font-bold font-display mb-8" style={{ letterSpacing: "var(--letter-spacing-tight)", color: "var(--foreground)" }}>
            Réalisations
          </h2>
          {projects.length === 0 ? (
            <div className="glass-card rounded-xl px-6 py-12 text-center">
              <p className="font-medium mb-2" style={{ color: "var(--foreground)" }}>La page blanche attend l&apos;encre.</p>
              <p className="text-sm" style={{ color: "var(--muted)" }}>Les projets apparaîtront ici dès qu&apos;ils seront ajoutés.</p>
            </div>
          ) : (
            <ul className="projects-grid list-none p-0 m-0">
              {projects.map((p) => (
                <li key={p.id}>
                  <article className="glass-card rounded-xl overflow-hidden h-full flex flex-col">
                    <Link
                      href={p.url || "#"}
                      target={p.url ? "_blank" : undefined}
                      rel={p.url ? "noopener noreferrer" : undefined}
                      className="flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                      aria-label={p.url ? `Ouvrir le projet ${p.title} dans un nouvel onglet` : `Projet ${p.title}`}
                    >
                      {p.imageUrl && (
                        <span className="block relative w-full aspect-[16/10] bg-zinc-800">
                          <Image src={p.imageUrl} alt="" fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
                        </span>
                      )}
                      <div className="p-4 flex-1">
                        <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--foreground)" }}>{p.title}</h3>
                        {p.description && (
                          <p className="text-sm mb-2" style={{ color: "var(--muted)", lineHeight: "var(--line-height-read)" }}>{p.description}</p>
                        )}
                        {p.kpis && (
                          <p className="text-xs font-medium" style={{ color: "var(--foreground)" }}>{p.kpis}</p>
                        )}
                      </div>
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* FAQ */}
        <section className="mb-16 sm:mb-20">
          <h2 className="text-xl font-bold font-display mb-8" style={{ letterSpacing: "var(--letter-spacing-tight)", color: "var(--foreground)" }}>
            FAQ
          </h2>
          <FaqAccordion items={faq} />
        </section>

        {/* Contact */}
        <section id="contact" className="mb-16 scroll-mt-8">
          <h2 className="text-xl font-bold font-display mb-4" style={{ letterSpacing: "var(--letter-spacing-tight)", color: "var(--foreground)" }}>
            Contact
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--muted)", lineHeight: "var(--line-height-read)" }}>
            Pour démarrer un projet ou échanger : envoyez un message via le formulaire.
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-[var(--glass-border)] text-sm font-semibold hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/50" style={{ color: "var(--foreground)" }} aria-label="Ouvrir le formulaire de contact">
            Ouvrir le formulaire de contact
          </Link>
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t text-sm" style={{ borderColor: "var(--glass-border)", color: "var(--muted)" }}>
          <nav aria-label="Pied de page légal">
            <Link href="/mentions-legales" className="underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50" aria-label="Lire les mentions légales">Mentions légales</Link>
            {" · "}
            <Link href="/confidentialite" className="underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50" aria-label="Lire la politique de confidentialité">Confidentialité</Link>
          </nav>
        </footer>
      </main>
    </div>
  );
}
