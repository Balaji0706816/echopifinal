"use client";

import { useEffect, useId, useRef, useState, useMemo } from "react";
import {
  Menu,
  X,
  ChevronDown,
  HeartPulse,
  Brain,
  Apple,
  Moon,
  Activity,
  LogIn, // Imported LogIn icon
} from "lucide-react";

// Helper hook for accessibility (Focus Trap)
function useFocusTrap(
  containerRef: React.RefObject<HTMLElement | null>,
  active: boolean,
  onEscape: () => void
) {
  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    const focusable = container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onEscape();
        return;
      }

      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    container.addEventListener("keydown", onKeyDown);
    return () => container.removeEventListener("keydown", onKeyDown);
  }, [containerRef, active, onEscape]);
}

type Item = {
  title: string;
  subtitle: string;
  href?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

type Group = {
  key: "guides" | "selfcare" | "symptoms";
  label: string;
  title: string;
  items: Item[];
};

export default function Navbar() {
  const navId = useId();
  const headerRef = useRef<HTMLElement | null>(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDesktop, setActiveDesktop] = useState<Group["key"] | null>(null);
  const [activeMobile, setActiveMobile] = useState<Group["key"] | null>(null);

  const groups: Group[] = useMemo(
    () => [
      {
        key: "guides",
        label: "Healthily Guides",
        title: "Guides",
        items: [
          { icon: HeartPulse, title: "Diabetes", subtitle: "Blood sugar & insulin" },
          { icon: Activity, title: "Heart Health", subtitle: "Blood pressure & pulse" },
          { icon: Brain, title: "Mental Wellbeing", subtitle: "Mood & resilience" },
          { icon: Apple, title: "Nutrition", subtitle: "Diet & hydration" },
          { icon: Moon, title: "Sleep", subtitle: "Rest & recovery" },
        ],
      },
      {
        key: "selfcare",
        label: "Self-care",
        title: "Self-Care",
        items: [
          { icon: Brain, title: "Daily Check-ins", subtitle: "How you’re feeling today" },
          { icon: Moon, title: "Sleep Routine", subtitle: "Consistency & rhythm" },
          { icon: Activity, title: "Recovery", subtitle: "Balance & rest days" },
        ],
      },
      {
        key: "symptoms",
        label: "Smart Symptom Checker",
        title: "Symptoms",
        items: [
          { icon: HeartPulse, title: "Check Symptoms", subtitle: "Guided assessment" },
          { icon: Brain, title: "Health Summary", subtitle: "Your current status" },
        ],
      },
    ],
    []
  );

  /* =========================================
     CLOSE ON OUTSIDE CLICK + ESC
     ========================================= */
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) {
        setActiveDesktop(null);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDesktop(null);
        setMobileOpen(false);
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 z-48 w-full pr-0 md:pr-10 bg-[var(--background)]/90 backdrop-blur-xl border-b border-gray-100"
    >
      <div className="section px-4 md:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="flex-shrink-0">
             {/* Make sure this path is correct in your project */}
            <img src="/images/image.png" alt="Logo" width={82} height={82} />
          </a>

          {/* ================= Desktop Navigation ================= */}
          <nav className="hidden md:flex items-center gap-8 relative">
            {groups.map((g) => (
              <DesktopTrigger
                key={g.key}
                group={g}
                open={activeDesktop === g.key}
                onToggle={() =>
                  setActiveDesktop((prev) => (prev === g.key ? null : g.key))
                }
                onClose={() => setActiveDesktop(null)}
              />
            ))}

            <a href="/app" className="text-[14px] font-medium text-slate-600 hover:text-[var(--primary)] transition-colors">
              Healthily App
            </a>

            {/* --- SIGN IN BUTTON (DESKTOP) --- */}
            <a 
              href="/login" 
              className="ml-2 flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[14px] font-medium rounded-full transition-all shadow-sm hover:shadow-md"
            >
              <LogIn size={16} />
              Sign In
            </a>
          </nav>

          {/* ================= Mobile Toggle ================= */}
          <button
            onClick={() => {
              setMobileOpen((v) => !v);
              setActiveDesktop(null);
            }}
            className="md:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ================= Mobile Menu ================= */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--background)] h-[calc(100vh-64px)] overflow-y-auto">
          <div className="px-6 py-6 flex flex-col gap-2">
            {groups.map((g) => (
              <MobileAccordion
                key={g.key}
                group={g}
                open={activeMobile === g.key}
                onToggle={() =>
                  setActiveMobile((prev) => (prev === g.key ? null : g.key))
                }
              />
            ))}
            
            <hr className="my-4 border-slate-100" />
            
            <a href="/app" className="block py-3 text-[15px] font-medium text-slate-600">
              Healthily App
            </a>

            {/* --- SIGN IN BUTTON (MOBILE) --- */}
            <a 
              href="/login"
              className="mt-2 flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white font-semibold rounded-xl active:scale-[0.98] transition-transform"
            >
              <LogIn size={18} />
              Sign In
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* =====================================================
   DESKTOP CLICK-TO-OPEN PANEL
   ===================================================== */
function DesktopTrigger({
  group,
  open,
  onToggle,
  onClose,
}: {
  group: Group;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useFocusTrap(panelRef, open, () => {
    onClose();
    buttonRef.current?.focus();
  });

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        className={`
           flex items-center cursor-pointer gap-1 text-[14px] font-medium transition-colors
           ${open ? "text-blue-600" : "text-slate-600 hover:text-blue-600"}
        `}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={onToggle}
      >
        {group.label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          ref={panelRef}
          role="menu"
          tabIndex={-1}
          className="
              absolute right-0 top-12 w-[520px]
              rounded-2xl bg-white
              shadow-xl ring-1 ring-black/5
              z-50 overflow-hidden
            "
        >
          <div className="px-6 pt-5 pb-6 bg-white">
            <p className="mb-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {group.title}
            </p>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {group.items.map((item) => (
                <HealthItem
                  key={item.title}
                  item={item}
                  onPick={() => {
                    onClose();
                    buttonRef.current?.focus();
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function HealthItem({ item, onPick }: { item: Item; onPick: () => void }) {
  const Icon = item.icon;
  return (
    <a
      href={item.href ?? "#"}
      role="menuitem"
      tabIndex={0}
      onClick={onPick}
      className="
          group flex gap-3 rounded-lg px-3 py-2
          hover:bg-slate-50 transition-colors
          focus:outline-none focus:ring-2
          focus:ring-blue-100
        "
    >
      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 group-hover:bg-white group-hover:shadow-sm transition-all">
        <Icon size={16} />
      </div>
      <div>
        <p className="text-[14px] font-semibold text-slate-900">{item.title}</p>
        <p className="text-[12px] text-slate-500 leading-snug">{item.subtitle}</p>
      </div>
    </a>
  );
}

/* =====================================================
   MOBILE ACCORDION
   ===================================================== */
function MobileAccordion({
  group,
  open,
  onToggle,
}: {
  group: Group;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-slate-50 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex cursor-pointer justify-between items-center py-4 text-[16px] font-medium text-slate-800"
      >
        {group.label}
        <ChevronDown
          size={18}
          className={`text-slate-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="pb-4 pl-2 space-y-1">
          {group.items.map((item) => (
            <a
              key={item.title}
              href={item.href || "#"}
              className="flex items-center gap-3 py-2 px-2 rounded-lg text-slate-600 hover:bg-slate-50"
            >
              <item.icon size={16} className="text-blue-500" />
              <span className="text-sm">{item.title}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}