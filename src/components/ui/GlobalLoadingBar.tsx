"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

interface LoadingBarContextValue {
  start: () => void;
  done: () => void;
  isLoading: boolean;
}

const LoadingBarContext = createContext<LoadingBarContextValue | null>(null);

export function LoadingBarProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeRef = useRef(0);

  const start = useCallback(() => {
    activeRef.current += 1;
    if (activeRef.current === 1) {
      setProgress(10);
      setVisible(true);
      timerRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 90) return 90;
          return p + Math.random() * 10;
        });
      }, 400);
    }
  }, []);

  const done = useCallback(() => {
    activeRef.current = Math.max(0, activeRef.current - 1);
    if (activeRef.current === 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setProgress(100);
      setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
    }
  }, []);

  return (
    <LoadingBarContext.Provider value={{ start, done, isLoading: visible }}>
      {visible && (
        <div className="fixed top-0 left-0 right-0 z-[200] h-[3px]">
          <div
            className="h-full bg-gradient-to-r from-[var(--brand)] via-blue-400 to-[var(--brand)] rounded-r-full transition-all duration-300 ease-out shadow-sm shadow-[var(--brand)]/30"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      {children}
    </LoadingBarContext.Provider>
  );
}

export function useLoadingBar() {
  const ctx = useContext(LoadingBarContext);
  if (!ctx) {
    throw new Error("useLoadingBar must be used within a <LoadingBarProvider>");
  }
  return ctx;
}
