interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div
      className={`glass rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 ${className}`}
    >
      {children}
    </div>
  );
}
