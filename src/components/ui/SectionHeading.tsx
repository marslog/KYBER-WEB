interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
}

export default function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-3xl ${alignment} mb-16`}>
      {eyebrow && (
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-4">
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl md:text-5xl font-black tracking-tight text-ink mb-5">
        {title}
      </h2>
      {sub && <p className="text-ink2 text-lg leading-relaxed">{sub}</p>}
    </div>
  );
}
