"use client";

import {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import { useReducedMotion, type MotionValue } from "framer-motion";
import type { Application } from "@splinetool/runtime";

const Spline = dynamic(
  () => import("@splinetool/react-spline").then((m) => m.default),
  { ssr: false },
);

const SCENE_URL = "https://prod.spline.design/kEfjEqYBxG0GVoz3/scene.splinecode";

class SceneBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function LoadingSkeleton({ visible }: { visible: boolean }) {
  return (
    <div
      className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 bg-ink transition-opacity duration-700 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <div className="animate-pulse-soft relative h-24 w-24 border-2 border-paper/40" />
      <p className="font-mono text-[10px] font-bold tracking-[0.32em] text-paper/70">
        LOADING PLATE
      </p>
      <p className="font-mono text-[10px] tracking-[0.32em] text-paper/40">
        GOTHAM TYPE®
      </p>
    </div>
  );
}

function FallbackScene() {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 bg-ink" aria-hidden="true">
      <div className="bg-grid mask-fade-edges absolute inset-0" />
      <div className="relative flex items-center justify-center border border-paper/30 px-8 py-10">
        <span className="absolute -left-2 -top-2 size-3 border-l-2 border-t-2 border-paper/60" />
        <span className="absolute -right-2 -top-2 size-3 border-r-2 border-t-2 border-paper/60" />
        <span className="absolute -bottom-2 -left-2 size-3 border-b-2 border-l-2 border-paper/60" />
        <span className="absolute -bottom-2 -right-2 size-3 border-b-2 border-r-2 border-paper/60" />
        <p className="font-display text-3xl font-semibold italic text-paper">
          the type didn&apos;t show.
        </p>
      </div>
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-paper/60">
        plate failed — reload to retry
      </p>
    </div>
  );
}

export default function SplineScene({
  onReady,
  onFailed,
  progress,
}: {
  onReady?: () => void;
  onFailed?: () => void;
  /** Scroll progress (0 → 1) scrubbing the scene, from the pinned hero. */
  progress?: MotionValue<number>;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const appRef = useRef<Application | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() === true;

  const handleLoad = useCallback(
    (app: Application) => {
      appRef.current = app;
      setLoaded(true);
      onReady?.();
    },
    [onReady],
  );

  // Scroll drives the animation: let the page scroll even over the canvas
  // (the canvas otherwise swallows wheel + touch for its own orbit/zoom).
  // We set `pan-y` so vertical swipes scroll too. Drag-orbit stays.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const canvas = wrap.querySelector("canvas");
    if (canvas) canvas.style.touchAction = "pan-y";
  }, [loaded]);

  // Scrib the scene with scroll progress: camera pulls back as the words
  // roll in (guaranteed visible 3D motion) and we forward `scrollProgress`
  // in case the scene is set up to animate on it.
  useEffect(() => {
    const app = appRef.current;
    if (!app || !progress) return;

    const apply = (v: number) => {
      const p = Math.min(1, Math.max(0, v));
      if (!reduce) app.setZoom(1.32 - p * 0.42);
      app.emitEvent?.("scrollProgress" as never, p as never);
    };
    const unsubscribe = progress.on("change", apply);
    apply(progress.get());
    return unsubscribe;
  }, [loaded, progress, reduce]);

  // Stop the Spline render loop the moment the scene leaves the viewport
  // (and when the tab is hidden); resume when it's back on screen.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const isOnScreen = () => {
      const r = wrap.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) appRef.current?.play();
        else appRef.current?.stop();
      },
      { threshold: 0 },
    );
    io.observe(wrap);

    const onVisibility = () => {
      if (document.hidden) appRef.current?.stop();
      else if (isOnScreen()) appRef.current?.play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      appRef.current?.stop();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 overflow-hidden"
      aria-label="Interactive 3D scene"
    >
      <SceneBoundary
        onError={() => {
          setFailed(true);
          onFailed?.();
        }}
      >
        {!failed && (
          <Spline
            scene={SCENE_URL}
            className="h-full w-full"
            onLoad={handleLoad}
          />
        )}
      </SceneBoundary>
      {failed ? <FallbackScene /> : <LoadingSkeleton visible={!loaded} />}
    </div>
  );
}