/**
 * Page 404 personnalisée — Design Carnet, retour accueil.
 */
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen relative z-10 flex flex-col items-center justify-center px-4"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <main className="max-w-md text-center">
        <h1
          className="text-2xl font-normal font-display mb-4"
          style={{
            letterSpacing: "var(--letter-spacing-tight)",
            color: "var(--foreground)",
          }}
        >
          Page introuvable
        </h1>
        <p
          className="text-sm mb-8"
          style={{
            color: "var(--muted)",
            lineHeight: "var(--line-height-read)",
          }}
        >
          Cette page n&apos;existe pas ou a été déplacée. Retournez à l&apos;accueil pour continuer.
        </p>
        <Link
          href="/"
          className="inline-block py-2.5 px-5 rounded-lg border text-sm font-normal focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          style={{
            borderColor: "var(--glass-border)",
            color: "var(--foreground)",
            backgroundColor: "var(--background)",
          }}
        >
          Retour à l&apos;accueil
        </Link>
      </main>
    </div>
  );
}
