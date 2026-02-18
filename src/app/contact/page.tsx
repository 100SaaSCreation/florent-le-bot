/**
 * Page Contact — Formulaire avec honeypot + Zod, redirection vers /contact/success
 */
import { submitLead } from "./actions";

export const metadata = {
  title: "Contact",
  description: "Démarrer un projet ou poser une question.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen relative z-10" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      <main className="max-w-xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-black font-display mb-2" style={{ letterSpacing: "var(--letter-spacing-tight)" }}>
          Contact
        </h1>
        <p className="text-sm mb-8" style={{ color: "var(--muted)", lineHeight: "var(--line-height-read)" }}>
          Décrivez votre projet ou votre demande. Je vous recontacte sous 48 h.
        </p>
        <form action={submitLead} className="space-y-4">
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="absolute opacity-0 pointer-events-none h-0 w-0" aria-hidden />
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>Nom</label>
            <input id="name" name="name" type="text" required maxLength={200} className="w-full px-3 py-2 rounded-lg border bg-white/5 border-[var(--glass-border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-white/50" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>Email</label>
            <input id="email" name="email" type="email" required className="w-full px-3 py-2 rounded-lg border bg-white/5 border-[var(--glass-border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-white/50" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1" style={{ color: "var(--foreground)" }}>Message</label>
            <textarea id="message" name="message" required rows={5} maxLength={5000} className="w-full px-3 py-2 rounded-lg border bg-white/5 border-[var(--glass-border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-white/50 resize-y" />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1" style={{ color: "var(--muted)" }}>Sujet (optionnel)</label>
            <select id="category" name="category" className="w-full px-3 py-2 rounded-lg border bg-white/5 border-[var(--glass-border)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-white/50">
              <option value="">— Choisir —</option>
              <option value="projet">Nouveau projet / MVP</option>
              <option value="audit">Audit performance</option>
              <option value="autre">Autre</option>
            </select>
          </div>
          <button type="submit" className="px-6 py-3 rounded-lg bg-white text-black text-sm font-semibold hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--background)]">
            Envoyer
          </button>
        </form>
      </main>
    </div>
  );
}
