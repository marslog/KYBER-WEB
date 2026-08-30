import Image from "next/image";

interface DashboardScreenshotProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

export default function DashboardScreenshot({
  src,
  alt,
  priority = false,
  className = "",
}: DashboardScreenshotProps) {
  return (
    <div className={`dashboard-screenshot ${className}`}>
      <div className="dashboard-screenshot__dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="dashboard-screenshot__viewport">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          quality={92}
          className="dashboard-screenshot__image"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
        />
      </div>
    </div>
  );
}
