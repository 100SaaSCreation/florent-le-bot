/**
 * Page de succès après envoi du formulaire de contact
 */
import Link from "next/link";

export const metadata = {
  title: "Message envoyé",
  description: "Votre message a bien été envoyé.",
};

export default function ContactSuccessPage() {
  return (
    <div className="min-h-screen relative z-10 flex flex-col items-center justify-center px-4" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      <main className="max-w-md text-center">
        <h1 className="text-2xl font-black font-display mb-4" style={{ letterSpacing: "var(--letter-spacing-tight)" }}>
          Message envoyé
        </h1>
        <p className="text-sm mb-8" style={{ color: "var(--muted)", lineHeight: "var(--line-height-read)" }}>
          Merci pour votre message. Je vous recontacte sous 48 h ouvrées.
        </p>
        <Link href="/" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-black text-sm font-semibold hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--background)]">
          Retour à l&apos;accueil
        </Link>
      </main>
    </div>
  );
}
