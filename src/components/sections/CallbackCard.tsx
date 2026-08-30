import { Phone, Clock } from "lucide-react";
import { COMPANY_INFO } from "@/data/platformData";

interface CallbackCardProps {
  variant?: "light" | "dark";
}

export default function CallbackCard({ variant = "light" }: CallbackCardProps) {
  const isDark = variant === "dark";

  return (
    <div
      id="request-callback"
      className={
        isDark
          ? "rounded-xl border border-white/15 bg-white/5 p-6"
          : "rounded-xl border border-[var(--border)] bg-white p-6"
      }
    >
      <h2
        className={`text-lg font-semibold mb-2 ${isDark ? "text-[var(--text-on-dark)]" : ""}`}
      >
        Request a callback
      </h2>
      <p
        className={`text-sm leading-relaxed mb-5 ${
          isDark ? "text-[var(--text-muted-on-dark)]" : "text-[var(--text-secondary)]"
        }`}
      >
        Prefer to speak with a KYBER architect? Call us during business hours and we&apos;ll
        schedule a callback.
      </p>
      <div className="space-y-3">
        <a
          href={`tel:${COMPANY_INFO.phoneTel}`}
          className="kyber-btn-primary w-full justify-center gap-2"
        >
          <Phone className="w-4 h-4" />
          Call {COMPANY_INFO.phone}
        </a>
        <a
          href={`tel:${COMPANY_INFO.phoneSecondaryTel}`}
          className={
            isDark
              ? "flex items-center justify-center gap-2 w-full rounded-lg border border-white/20 px-4 py-3 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              : "flex items-center justify-center gap-2 w-full rounded-lg border border-[var(--border)] px-4 py-3 text-sm font-medium hover:border-[var(--brand)] transition-colors"
          }
        >
          <Phone className="w-4 h-4" />
          {COMPANY_INFO.phoneSecondary}
        </a>
      </div>
      <p
        className={`flex items-center gap-2 mt-4 text-xs ${
          isDark ? "text-[var(--text-muted-on-dark)]" : "text-[var(--text-muted)]"
        }`}
      >
        <Clock className="w-3.5 h-3.5 shrink-0" />
        {COMPANY_INFO.hours}
      </p>
    </div>
  );
}
