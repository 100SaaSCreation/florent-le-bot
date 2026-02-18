/**
 * Mentions légales (W-1) — Conformité, style sobre.
 */
import Link from "next/link";

export const metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site florent-le-bot — éditeur, hébergeur, droits.",
};

export default function MentionsLegalesPage() {
  return (
    <div
      className="min-h-screen relative z-10"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
    >
      <main
        className="max-w-2xl mx-auto px-4 py-12 sm:py-16"
        style={{
          paddingTop: "var(--spacing-section)",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        <h1
          className="text-2xl font-normal font-display mb-6"
          style={{
            letterSpacing: "var(--letter-spacing-tight)",
            color: "var(--foreground)",
          }}
        >
          Mentions légales
        </h1>

        <div
          className="space-y-6"
          style={{ lineHeight: "var(--line-height-read)", color: "var(--muted)" }}
        >
          <section>
            <h2 className="text-lg font-normal font-display mb-2" style={{ color: "var(--foreground)" }}>
              Éditeur du site
            </h2>
            <p className="text-sm">
              Ce site est un portfolio à titre personnel ou professionnel.
              Siège social : France. Pour toute question relative aux mentions légales,
              utilisez le canal de contact indiqué sur la page d&apos;accueil.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-normal font-display mb-2" style={{ color: "var(--foreground)" }}>
              Hébergement
            </h2>
            <p className="text-sm">
              Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
              Site :{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground)]"
              >
                vercel.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-normal font-display mb-2" style={{ color: "var(--foreground)" }}>
              Données et stockage
            </h2>
            <p className="text-sm">
              Les données du portfolio (projets, contenu administré) sont stockées sur une base PostgreSQL
              hébergée par Neon (Neon Tech Inc.). Les traitements sont décrits dans la page{" "}
              <Link href="/confidentialite" className="underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground)]">
                Confidentialité
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-normal font-display mb-2" style={{ color: "var(--foreground)" }}>
              Propriété intellectuelle
            </h2>
            <p className="text-sm">
              L&apos;ensemble du contenu de ce site (textes, mise en page, choix graphiques) est protégé
              par le droit d&apos;auteur. Toute reproduction non autorisée peut constituer une contrefaçon.
            </p>
          </section>
        </div>

        <p className="mt-10 text-sm" style={{ color: "var(--muted)" }}>
          <Link
            href="/"
            className="underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground)]"
          >
            Retour à l&apos;accueil
          </Link>
        </p>
      </main>
    </div>
  );
}
