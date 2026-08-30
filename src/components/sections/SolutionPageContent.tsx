import Link from "next/link";
import { ChevronLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import type { SolutionPageData } from "@/lib/solutionsCatalog";
import { getIcon } from "@/lib/icons";

export default function SolutionPageContent({ solution }: { solution: SolutionPageData }) {
  const Icon = solution.iconName ? getIcon(solution.iconName) : null;

  return (
    <>
      <section className="pt-28 pb-14 md:pt-36 md:pb-20 bg-[var(--bg)] border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/#product-highlights"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text)] mb-8 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to platform
          </Link>

          <p className="section-eyebrow mb-3">Solution</p>
          <div className="flex items-start gap-4">
            {Icon && (
              <div className="shrink-0 mt-1 flex items-center justify-center rounded-xl bg-[var(--brand-soft)] p-3">
                <Icon className="w-6 h-6" style={{ color: "var(--brand)" }} strokeWidth={1.5} />
              </div>
            )}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                {solution.title}
              </h1>
              <p className="text-lg text-[var(--text-secondary)] mt-3 leading-relaxed">
                {solution.tagline}
              </p>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mt-6 max-w-2xl">
            {solution.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="kyber-btn-primary gap-2">
              Talk to an architect <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/#product-highlights" className="kyber-btn-secondary">
              Explore products
            </Link>
          </div>
        </div>
      </section>

      {solution.journeySteps && solution.journeySteps.length > 0 && (
        <section className="section-shell bg-[var(--bg-subtle)] border-b border-[var(--border)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-eyebrow mb-3">How it works</p>
            <h2 className="section-title mb-10">A guided path to production</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {solution.journeySteps.map((step) => (
                <div
                  key={step.step}
                  className="relative rounded-xl border border-[var(--border)] bg-white p-5 hover:border-[var(--brand)] transition-colors"
                >
                  <span
                    className="text-2xl font-semibold tracking-tight"
                    style={{ color: "var(--brand)" }}
                  >
                    {step.step}
                  </span>
                  <h3 className="text-sm font-semibold mt-2 mb-1.5">{step.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {solution.outcomes && solution.outcomes.length > 0 && (
        <section className="section-shell bg-white border-b border-[var(--border)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-eyebrow mb-3">Outcomes</p>
            <h2 className="section-title mb-8">What you can expect</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {solution.outcomes.map((outcome) => (
                <div
                  key={outcome}
                  className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4"
                >
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--brand)" }} />
                  <span className="text-sm text-[var(--text)] leading-snug">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="get-a-quote" className="section-shell bg-[var(--bg-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold mb-3">Ready to get started?</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
            Request a quotation or schedule a callback for a tailored assessment.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact#contact-form" className="kyber-btn-primary inline-flex items-center gap-2">
              Contact us <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact#request-callback"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-5 py-2.5 text-sm font-medium hover:border-[var(--brand)] transition-colors"
            >
              Request callback
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
