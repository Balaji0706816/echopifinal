"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChevronDown, Search } from "lucide-react";

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

type FAQProps = {
  allowMultiple?: boolean;
  persistState?: boolean;
  items?: FAQItem[];
};

const DEFAULT_FAQS: FAQItem[] = [
  {
    id: "what-is-olivier",
    question: "What is Olivier?",
    answer:
      "Olivier is a calm, private, and supportive health companion designed to help you understand symptoms, track wellbeing, and explore trusted health guidance.",
  },
  {
    id: "medical-diagnosis",
    question: "Does Olivier provide medical diagnosis?",
    answer:
      "No. Olivier does not provide medical diagnosis or treatment. Information is for educational purposes only and should not replace professional medical advice.",
  },
  {
    id: "data-privacy",
    question: "How is my health data handled?",
    answer:
      "Privacy is central to Olivier. The system is designed to minimize data collection and apply secure, privacy-focused practices wherever possible.",
  },
  {
    id: "replace-doctor",
    question: "Can Olivier replace a doctor?",
    answer:
      "No. Olivier is not a replacement for healthcare professionals. It is intended to support understanding and preparation, not to diagnose or treat conditions.",
  },
  {
    id: "accessibility",
    question: "Is Olivier accessible to everyone?",
    answer:
      "Yes. Olivier supports keyboard navigation, readable typography, and reduced-motion preferences to make the experience accessible.",
  },
];

export default function FAQ({
  allowMultiple = false,
  persistState = true,
  items = DEFAULT_FAQS,
}: FAQProps) {
  const baseId = useId();
  const listRef = useRef<HTMLDivElement | null>(null);

  const [query, setQuery] = useState("");
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const [lastOpenedId, setLastOpenedId] = useState<string | null>(null);

  /* ============================
     FILTER
     ============================ */
  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q)
    );
  }, [query, items]);

  /* ============================
     INITIAL LOAD (HASH / STORAGE)
     ============================ */
  useEffect(() => {
    const hash = window.location.hash.replace("#faq-", "");

    if (hash) {
      setOpenIds(new Set([hash]));
      setLastOpenedId(hash);
      return;
    }

    if (persistState) {
      const saved = localStorage.getItem("faq-open");
      if (saved) {
        setOpenIds(new Set([saved]));
        setLastOpenedId(saved);
      }
    }
  }, [persistState]);

  /* ============================
     URL + STORAGE SYNC
     ============================ */
  useEffect(() => {
    if (!lastOpenedId) return;

    history.replaceState(null, "", `#faq-${lastOpenedId}`);

    if (persistState) {
      localStorage.setItem("faq-open", lastOpenedId);
    }
  }, [lastOpenedId, persistState]);

  /* ============================
     SCROLL INTO VIEW
     ============================ */
  useEffect(() => {
    if (!lastOpenedId || !listRef.current) return;

    const el = document.getElementById(
      `${baseId}-panel-${lastOpenedId}`
    );

    if (!el) return;

    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    el.scrollIntoView({
      behavior: prefersReduced ? "auto" : "smooth",
      block: "start",
    });
  }, [lastOpenedId, baseId]);

  /* ============================
     TOGGLE (PURE)
     ============================ */
  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
        setLastOpenedId(null);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
        setLastOpenedId(id);
      }

      return next;
    });
  };

  /* ============================
     KEYBOARD NAV (↑ ↓)
     ============================ */
  const onKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    i: number
  ) => {
    if (!listRef.current) return;

    const buttons =
      listRef.current.querySelectorAll<HTMLButtonElement>(
        "[data-faq-button]"
      );

    if (e.key === "ArrowDown") {
      e.preventDefault();
      buttons[Math.min(i + 1, buttons.length - 1)]?.focus();
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      buttons[Math.max(i - 1, 0)]?.focus();
    }
  };

  /* ============================
     SEARCH HIGHLIGHT
     ============================ */
  const highlight = (text: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "ig");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <mark
          key={i}
          className="bg-teal-100 text-teal-900 rounded px-0.5"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <section
      aria-labelledby={`${baseId}-title`}
      className="section mt-24 max-w-3xl"
    >
      {/* Header */}
      <div className="mb-8">
        <h2
          id={`${baseId}-title`}
          className="text-2xl font-semibold tracking-tight"
        >
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Clear answers about Olivier, privacy, and how it works.
        </p>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="search"
          placeholder="Search questions"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="
            w-full rounded-lg border border-[var(--border)]
            bg-[var(--background)] pl-9 pr-3 py-2
            text-sm text-[var(--foreground)]
            focus:outline-none focus:ring-2
            focus:ring-[var(--primary)]/30
          "
        />
      </div>

      {/* FAQ List */}
      <div ref={listRef} className="divide-y divide-[var(--border)]">
        {filtered.length === 0 && (
          <p className="py-6 text-sm text-slate-500">
            No questions match your search.
          </p>
        )}

        {filtered.map((faq, i) => {
          const open = openIds.has(faq.id);
          const buttonId = `${baseId}-btn-${faq.id}`;
          const panelId = `${baseId}-panel-${faq.id}`;

          return (
            <div key={faq.id} className="py-4">
              <button
                id={buttonId}
                data-faq-button
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(faq.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="
                  w-full flex items-center justify-between
                  text-left text-base font-medium tracking-tight
                  focus:outline-none focus-visible:ring-2
                  focus-visible:ring-[var(--primary)]/30
                "
              >
                <span>{highlight(faq.question)}</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={[
                  "grid overflow-hidden transition-[grid-template-rows,opacity] duration-200 ease-out",
                  open
                    ? "grid-rows-[1fr] opacity-100 mt-3"
                    : "grid-rows-[0fr] opacity-0",
                ].join(" ")}
              >
                <div className="overflow-hidden">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {highlight(faq.answer)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
