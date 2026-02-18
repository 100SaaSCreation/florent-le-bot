/**
 * Page de connexion Admin — Design "Note de carnet" (W-3)
 * Fond crème #fdfcf0, typo sobre, sans fioritures.
 */
import { login } from "./actions";

export const metadata = {
  title: "Connexion Admin | florent-le-bot",
  description: "Accès administrateur",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; error?: string }>;
}) {
  const { from, error } = await searchParams;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: "#fdfcf0" }}
    >
      <main className="w-full max-w-sm">
        <h1 className="text-xl font-normal text-stone-800 mb-6 text-center">
          Connexion admin
        </h1>
        {error && (
          <p className="text-sm text-red-700 mb-4 text-center" role="alert">
            {error}
          </p>
        )}
        <form action={login} className="flex flex-col gap-4">
          <input type="hidden" name="from" value={from ?? "/admin"} />
          <label className="flex flex-col gap-1">
            <span className="text-sm text-stone-600">Email</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="border border-stone-300 bg-white px-3 py-2 text-stone-800 rounded-none focus:outline-none focus:ring-1 focus:ring-stone-400"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-stone-600">Mot de passe</span>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="border border-stone-300 bg-white px-3 py-2 text-stone-800 rounded-none focus:outline-none focus:ring-1 focus:ring-stone-400"
            />
          </label>
          <button
            type="submit"
            className="mt-2 py-2 px-4 bg-stone-800 text-white text-sm font-normal hover:bg-stone-700 focus:outline-none focus:ring-1 focus:ring-stone-600"
          >
            Se connecter
          </button>
        </form>
      </main>
    </div>
  );
}
