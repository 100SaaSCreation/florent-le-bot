/**
 * Politique de confidentialité (W-1) — Conformité, style sobre.
 */
import Link from "next/link";

export const metadata = {
  title: "Confidentialité",
  description: "Politique de confidentialité — données, cookies, RGPD.",
};

export default function ConfidentialitePage() {
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
          Confidentialité
        </h1>

        <div
          className="space-y-6"
          style={{ lineHeight: "var(--line-height-read)", color: "var(--muted)" }}
        >
          <section>
            <h2 className="text-lg font-normal font-display mb-2" style={{ color: "var(--foreground)" }}>
              Données collectées
            </h2>
            <p className="text-sm">
              Ce site portfolio ne collecte pas de données personnelles via des formulaires publics.
              L&apos;espace d&apos;administration utilise une session (cookie strictement nécessaire)
              pour l&apos;authentification ; aucune donnée de navigation n&apos;est revendue ni partagée avec des tiers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-normal font-display mb-2" style={{ color: "var(--foreground)" }}>
              Hébergement des données
            </h2>
            <p className="text-sm">
              Les données de contenu (projets affichés sur la vitrine) et les données d&apos;administration
              sont stockées sur des serveurs PostgreSQL gérés par Neon, dans une région choisie (ex. UE).
              Vercel assure l&apos;hébergement du site et le traitement des requêtes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-normal font-display mb-2" style={{ color: "var(--foreground)" }}>
              Cookies
            </h2>
            <p className="text-sm">
              Aucun cookie de suivi ou publicitaire n&apos;est déposé sur la partie publique du site.
              Un cookie de session (httpOnly, sécurisé) est utilisé uniquement pour l&apos;accès à l&apos;interface d&apos;administration.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-normal font-display mb-2" style={{ color: "var(--foreground)" }}>
              Vos droits
            </h2>
            <p className="text-sm">
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et, le cas échéant,
              d&apos;effacement des données vous concernant. Pour toute demande, utilisez le canal de contact indiqué sur la page d&apos;accueil.
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
