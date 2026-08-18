"use client";

import { Component, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";

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
      className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 bg-ink transition-opacity duration-700 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <div className="bg-grid mask-fade-edges absolute inset-0" />
      <div className="animate-pulse-soft relative h-40 w-40 rounded-full bg-[radial-gradient(circle_at_35%_30%,#ff8a3d_0%,#ff2547_45%,rgba(8,5,7,0)_72%)] blur-[2px]" />
      <p className="relative font-mono text-[11px] tracking-[0.35em] text-fog">
        LOADING SCENE
      </p>
    </div>
  );
}

function FallbackScene() {
  return (
    <div className="absolute inset-0 z-10 overflow-hidden bg-ink" aria-hidden="true">
      <div className="bg-grid mask-fade-edges absolute inset-0" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="animate-pulse-soft h-72 w-72 rounded-full bg-[radial-gradient(circle_at_35%_30%,#ff8a3d_0%,#ff2547_50%,rgba(8,5,7,0)_74%)] blur-[6px]" />
        <div className="animate-spin-slow absolute inset-[-3rem] rounded-full border border-dashed border-blood/30" />
        <div className="absolute inset-[1.5rem] rounded-full border border-ember/20" />
      </div>
    </div>
  );
}

export default function SplineScene({
  onReady,
  onFailed,
}: {
  onReady?: () => void;
  onFailed?: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div
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
            onLoad={() => {
              setLoaded(true);
              onReady?.();
            }}
          />
        )}
      </SceneBoundary>
      {failed ? <FallbackScene /> : <LoadingSkeleton visible={!loaded} />}
    </div>
  );
}
