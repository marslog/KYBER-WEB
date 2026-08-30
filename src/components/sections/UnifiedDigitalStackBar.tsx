"use client";

import type { CSSProperties } from "react";
import { Layers, Monitor, Play } from "lucide-react";
import {
  PLATFORM_SHOWCASE_VIEWS,
  type ShowcaseViewId,
} from "@/data/presentationContent";

const VIEW_ICONS = {
  architecture: Layers,
  ui: Monitor,
  video: Play,
} as const;

interface UnifiedDigitalStackBarProps {
  activeView: ShowcaseViewId;
  onViewChange: (view: ShowcaseViewId) => void;
}

export default function UnifiedDigitalStackBar({
  activeView,
  onViewChange,
}: UnifiedDigitalStackBarProps) {
  const tabGridStyle = {
    "--showcase-tab-count": PLATFORM_SHOWCASE_VIEWS.length,
  } as CSSProperties;

  return (
    <div className="platform-showcase__unified-stack" aria-label="Unified digital stack">
      <div className="platform-showcase__row-divider-line" aria-hidden />
      <div className="platform-showcase__unified-stack-inner">
        <p className="platform-showcase__row-divider-label">Unified digital stack</p>
        <div
          className="platform-showcase__unified-views"
          role="tablist"
          aria-label="Platform showcase views"
          style={tabGridStyle}
        >
          {PLATFORM_SHOWCASE_VIEWS.map((view) => {
            const Icon = VIEW_ICONS[view.id];
            const selected = activeView === view.id;

            return (
              <button
                key={view.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => onViewChange(view.id)}
                className={`platform-showcase__unified-view ${selected ? "is-active" : ""}`}
              >
                <Icon className="platform-showcase__unified-view-icon" strokeWidth={1.75} aria-hidden />
                {view.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="platform-showcase__row-divider-line" aria-hidden />
    </div>
  );
}
