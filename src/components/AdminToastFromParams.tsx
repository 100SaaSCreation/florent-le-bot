"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

const MESSAGES: Record<string, string> = {
  project_added: "Projet ajouté",
  project_updated: "Projet mis à jour",
  project_deleted: "Projet supprimé",
  lead_updated: "Statut du lead mis à jour",
};

export function AdminToastFromParams({ value }: { value?: string | null }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!value || !MESSAGES[value]) return;
    toast.success(MESSAGES[value]);
    router.replace(pathname ?? "/admin", { scroll: false });
  }, [value, pathname, router]);

  return null;
}
