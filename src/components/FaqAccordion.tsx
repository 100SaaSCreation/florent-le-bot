"use client";

import { useState } from "react";

export type FaqItem = { id: string; question: string; reponse: string; theme?: string | null };

const FALLBACK_FAQ: FaqItem[] = [
  { id: "1", question: "Combien de temps pour un MVP ?", reponse: "Un MVP livrable en 4 à 6 semaines pour un périmètre bien cadré.", theme: null },
  { id: "2", question: "Vous travaillez en remote ?", reponse: "Oui. Collaboration asynchrone, points sync courts si besoin.", theme: null },
  { id: "3", question: "Audit performance : livrables ?", reponse: "Rapport détaillé, recommandations priorisées, mise en œuvre possible.", theme: null },
];

interface FaqAccordionProps {
  items?: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const list = items?.length ? items : FALLBACK_FAQ;
  const [openId, setOpenId] = useState<string | null>(list[0]?.id ?? null);

  return (
    <div className="space-y-2">
      {list.map((item) => (
        <div key={item.id} className="glass-card overflow-hidden" style={{ borderColor: "var(--glass-border)" }}>
          <button
            type="button"
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
            className="w-full flex items-center justify-between gap-4 py-4 px-5 text-left text-sm font-medium transition-colors hover:bg-white/5 rounded-t-xl"
            style={{ color: "var(--foreground)" }}
            aria-expanded={openId === item.id}
            aria-controls={`faq-answer-${item.id}`}
            id={`faq-question-${item.id}`}
            aria-label={openId === item.id ? `Fermer : ${item.question}` : `Ouvrir : ${item.question}`}
          >
            <span>{item.question}</span>
            <span className="text-lg leading-none transition-transform shrink-0" style={{ transform: openId === item.id ? "rotate(45deg)" : "rotate(0)", color: "var(--muted)" }} aria-hidden>+</span>
          </button>
          <div id={`faq-answer-${item.id}`} role="region" aria-labelledby={`faq-question-${item.id}`} className="grid transition-[grid-template-rows] duration-200" style={{ gridTemplateRows: openId === item.id ? "1fr" : "0fr" }}>
            <div className="overflow-hidden">
              <p className="pb-4 px-5 text-sm" style={{ color: "var(--muted)", lineHeight: "var(--line-height-read)" }}>{item.reponse}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
