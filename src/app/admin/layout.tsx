import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: "var(--background)" }}>
      <nav className="admin-nav sticky top-0 z-10 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-sm font-medium" style={{ color: "var(--foreground)" }} aria-label="Retour à l’administration des projets">
              Admin
            </Link>
            <Link href="/admin/dashboard" className="text-sm" style={{ color: "var(--muted)" }} aria-label="Ouvrir le tableau de bord analytics">
              Dashboard →
            </Link>
          </div>
          <ThemeToggle />
        </div>
      </nav>
      {children}
    </div>
  );
}
