"use client";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  children: React.ReactNode;
}

export default function Button({
  href,
  onClick,
  variant = "primary",
  children,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-7 py-3.5 rounded-md text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]";
  const styles =
    variant === "primary"
      ? "bg-accent text-[#041018] hover:brightness-110 shadow-[0_0_28px_rgba(76,195,255,0.25)]"
      : "glass text-ink hover:text-accent";

  if (href) {
    return (
      <a href={href} onClick={onClick} className={`${base} ${styles}`}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}
