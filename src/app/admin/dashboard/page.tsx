/**
 * Dashboard Admin — Cartes statistiques + gestion des leads (V4.0)
 */
import { prisma } from "@/lib/db";
import { updateLeadStatus } from "../actions-lead";
import Link from "next/link";

export const metadata = {
  title: "Dashboard | Admin",
  description: "Vue analytics et gestion des leads",
};

export default async function AdminDashboardPage() {
  const [metrics, leads, projectCount] = await Promise.all([
    prisma.metric.findMany({ orderBy: { order: "asc" } }),
    prisma.lead.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.project.count(),
  ]);

  const leadCount = leads.length;
  const conversionRate = projectCount > 0 && leadCount > 0 ? Math.round((projectCount / leadCount) * 100) : 0;

  return (
    <div className="min-h-screen px-4 py-8" style={{ backgroundColor: "var(--background)" }}>
      <main className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-sm" style={{ color: "var(--muted)" }}>← Admin</Link>
          <h1 className="text-xl font-bold font-display" style={{ color: "var(--foreground)" }}>Dashboard</h1>
        </div>

        {/* Cartes statistiques */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="glass-card p-5">
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--muted)" }}>Conversion rate</p>
            <p className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>{conversionRate}%</p>
          </div>
          <div className="glass-card p-5">
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--muted)" }}>Total Leads</p>
            <p className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>{leadCount}</p>
          </div>
          <div className="glass-card p-5">
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--muted)" }}>Projets</p>
            <p className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>{projectCount}</p>
          </div>
        </section>

        {/* Métriques configurables */}
        {metrics.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-bold font-display mb-4" style={{ color: "var(--foreground)" }}>Métriques</h2>
            <div className="flex flex-wrap gap-4">
              {metrics.map((m) => (
                <div key={m.id} className="glass-card px-4 py-3">
                  <span className="text-sm" style={{ color: "var(--muted)" }}>{m.label}</span>
                  <span className="ml-2 font-semibold" style={{ color: "var(--foreground)" }}>{m.value}{m.unit}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Gestionnaire de leads */}
        <section>
          <h2 className="text-lg font-bold font-display mb-4" style={{ color: "var(--foreground)" }}>Leads ({leads.length})</h2>
          {leads.length === 0 ? (
            <p className="text-sm" style={{ color: "var(--muted)" }}>Aucun lead pour l&apos;instant.</p>
          ) : (
            <ul className="space-y-4">
              {leads.map((lead) => (
                <li key={lead.id} className="glass-card p-4">
                  <div className="flex flex-wrap justify-between gap-2 mb-2">
                    <span className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{lead.email}</span>
                    <span className="text-xs" style={{ color: "var(--muted)" }}>{new Date(lead.createdAt).toLocaleDateString("fr-FR")}</span>
                  </div>
                  {lead.name && <p className="text-sm mb-1" style={{ color: "var(--muted)" }}>{lead.name}</p>}
                  <p className="text-sm mb-3" style={{ color: "var(--foreground)", lineHeight: "var(--line-height-read)" }}>{lead.message}</p>
                  <div className="flex flex-wrap gap-2">
                    <form action={updateLeadStatus} className="inline">
                      <input type="hidden" name="id" value={lead.id} />
                      <input type="hidden" name="status" value="NEW" />
                      <button type="submit" className="text-xs px-2 py-1 rounded border border-[var(--glass-border)] hover:bg-white/5 disabled:opacity-50" style={{ color: "var(--foreground)" }}>NEW</button>
                    </form>
                    <form action={updateLeadStatus} className="inline">
                      <input type="hidden" name="id" value={lead.id} />
                      <input type="hidden" name="status" value="IN_PROGRESS" />
                      <button type="submit" className="text-xs px-2 py-1 rounded border border-[var(--glass-border)] hover:bg-white/5 disabled:opacity-50" style={{ color: "var(--foreground)" }}>En cours</button>
                    </form>
                    <form action={updateLeadStatus} className="inline">
                      <input type="hidden" name="id" value={lead.id} />
                      <input type="hidden" name="status" value="CLOSED" />
                      <button type="submit" className="text-xs px-2 py-1 rounded border border-[var(--glass-border)] hover:bg-white/5 disabled:opacity-50" style={{ color: "var(--foreground)" }}>Clôturé</button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
