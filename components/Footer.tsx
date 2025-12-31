"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Footer() {
  return (
    <>
      <footer className="mt-24 border-t border-[var(--border)] bg-[var(--background)]">
        <div className="section py-14">

          {/* ================= Main Footer Grid ================= */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            {/* Brand */}
            <div>
              <span className="brand text-[15px] font-medium">
                Olivier
              </span>
              <p className="mt-3 text-sm text-slate-500 leading-relaxed max-w-xs">
                A calm, private, and supportive way to understand your health,
                symptoms, and daily wellbeing.
              </p>
            </div>

            {/* Columns */}
            <FooterGroup
              title="Product"
              links={[
                "Healthily Guides",
                "Self-care",
                "Smart Symptom Checker",
                "Health Summary",
              ]}
            />

            <FooterGroup
              title="Support"
              links={[
                "Help Center",
                "Privacy & Data",
                "Accessibility",
                "Contact Support",
              ]}
            />

            <FooterGroup
              title="Legal"
              links={[
                "Privacy Policy",
                "Terms of Use",
                "Medical Disclaimer",
              ]}
            />
          </div>

          {/* ================= Bottom Bar ================= */}
          <div className="mt-12 border-t border-[var(--border)] pt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Olivier. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <LanguageSelector />
              <BackToTop />
            </div>
          </div>

          {/* ================= Disclaimer ================= */}
          <p className="mt-4 text-xs text-slate-500 max-w-3xl leading-relaxed">
            Olivier does not provide medical diagnosis. Information is for
            educational purposes only and should not replace professional
            medical advice.
          </p>
        </div>
      </footer>

      {/* ================= Privacy Notice ================= */}
      <PrivacyNotice />
    </>
  );
}

/* =====================================================
   FOOTER GROUP (DESKTOP + MOBILE)
   ===================================================== */

function FooterGroup({
  title,
  links,
}: {
  title: string;
  links: string[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Desktop Title */}
      <h4 className="hidden md:block mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h4>

      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="md:hidden w-full flex items-center justify-between py-2 text-sm font-medium text-slate-700"
        aria-expanded={open}
      >
        {title}
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Links */}
      <ul
        className={[
          "space-y-2",
          open ? "block" : "hidden md:block",
        ].join(" ")}
      >
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              aria-label={link}
              className="
                text-sm text-slate-700 hover:opacity-80 transition
                focus:outline-none focus-visible:ring-2
                focus-visible:ring-[var(--primary)]/30 rounded-sm
              "
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* =====================================================
   LANGUAGE SELECTOR (APPLE-STYLE)
   ===================================================== */

function LanguageSelector() {
  return (
    <button
      type="button"
      className="
        text-xs text-slate-500 hover:opacity-80 transition
        focus:outline-none focus-visible:ring-2
        focus-visible:ring-[var(--primary)]/30 rounded-sm
      "
      aria-haspopup="listbox"
    >
      United States · English
    </button>
  );
}

/* =====================================================
   BACK TO TOP (SUBTLE)
   ===================================================== */

function BackToTop() {
  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      className="
      text-xs text-slate-600 dark:text-slate-300
      bg-slate-100/70 dark:bg-slate-800/70
      hover:bg-slate-200/70 dark:hover:bg-slate-700/70
      transition
      px-2.5 py-1.5 rounded-md
      focus:outline-none focus-visible:ring-2
      focus-visible:ring-[var(--primary)]/30 cursor-pointer
    "
    
    >
      Back to top
    </button>
  );
}

/* =====================================================
   PRIVACY NOTICE (SYSTEM-STYLE)
   ===================================================== */

function PrivacyNotice() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      className="
        fixed bottom-4 left-1/2 z-50 w-[92%] max-w-xl
        -translate-x-1/2 rounded-xl
        bg-[var(--background)]/95 backdrop-blur-xl
        shadow-sm ring-1 ring-black/5
        px-4 py-3
      "
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-slate-600 leading-relaxed">
          Olivier uses cookies to improve experience and protect privacy.
        </p>

        <button
          onClick={() => setVisible(false)}
          className="
            text-xs font-medium text-[var(--primary)]
            hover:opacity-80 transition
            focus:outline-none focus-visible:ring-2
            focus-visible:ring-[var(--primary)]/30 rounded-sm
          "
        >
          OK
        </button>
      </div>
    </div>
  );
}
