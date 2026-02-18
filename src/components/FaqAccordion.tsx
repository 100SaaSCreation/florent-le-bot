"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "Combien de temps pour un MVP ?",
    a: "Un MVP livrable en 4 à 6 semaines est courant pour un périmètre bien cadré. On fixe ensemble les priorités pour une première version utilisable en production.",
  },
  {
    q: "Vous travaillez en remote ?",
    a: "Oui. Collaboration asynchrone, points sync courts si besoin. Idéal pour les équipes distribuées ou les startups qui veulent avancer sans surcharge de réunions.",
  },
  {
    q: "Audit performance : livrables ?",
    a: "Rapport détaillé (goulots, métriques avant/après), recommandations priorisées et, si vous le souhaitez, mise en œuvre des correctifs. Résultats mesurables sous 2 à 3 semaines.",
  },
  {
    q: "Stack imposée ou sur-mesure ?",
    a: "Sur-mesure. Next.js, React, Node, Prisma, Postgres sont des choix fréquents pour la robustesse et la vélocité, mais on s’adapte à votre existant ou à vos contraintes.",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-2">
      {FAQ_ITEMS.map((item, i) => (
        <div
          key={i}
          className="glass-card overflow-hidden"
          style={{ borderColor: "var(--glass-border)" }}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 py-4 px-5 text-left text-sm font-medium transition-colors hover:bg-white/5"
            style={{ color: "var(--foreground)" }}
            aria-expanded={openIndex === i}
            aria-controls={`faq-answer-${i}`}
            id={`faq-question-${i}`}
          >
            <span>{item.q}</span>
            <span
              className="text-lg leading-none transition-transform"
              style={{
                transform: openIndex === i ? "rotate(45deg)" : "rotate(0)",
                color: "var(--muted)",
              }}
              aria-hidden
            >
              +
            </span>
          </button>
          <div
            id={`faq-answer-${i}`}
            role="region"
            aria-labelledby={`faq-question-${i}`}
            className="grid transition-[grid-template-rows] duration-200"
            style={{
              gridTemplateRows: openIndex === i ? "1fr" : "0fr",
            }}
          >
            <div className="overflow-hidden">
              <p
                className="pb-4 px-5 text-sm"
                style={{ color: "var(--muted)", lineHeight: "var(--line-height-read)" }}
              >
                {item.a}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
