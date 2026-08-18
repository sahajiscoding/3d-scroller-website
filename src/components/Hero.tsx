"use client";

import { useRef } from "react";
import SplineScene from "./SplineScene";

export default function Hero({
  onSceneReady,
  onSceneFailed,
}: {
  onSceneReady: () => void;
  onSceneFailed: () => void;
}) {
  return (
    <section
      className="relative min-h-screen overflow-hidden bg-ink"
      aria-label="Hero — Interactive 3D Scene"
    >
      {/* 3D scene — plays unobstructed, fills the full viewport */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <SplineScene onReady={onSceneReady} onFailed={onSceneFailed} />
      </div>

      {/* legibility washes */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_90%_70%_at_50%_45%,rgba(5,5,8,0.35)_0%,rgba(5,5,8,0.62)_72%,rgba(5,5,8,0.88)_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-40 bg-gradient-to-b from-ink to-transparent"
        aria-hidden="true"
      />

      {/* bat-signal beam */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] flex justify-center"
        aria-hidden="true"
      >
        <div
          className="h-[72vh] w-[46vw] min-w-[420px] max-w-[760px] opacity-[0.16]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,37,71,0.35) 0%, rgba(255,138,61,0.15) 45%, rgba(8,5,7,0) 75%)",
            filter: "blur(120px)",
          }}
        />
      </div>

      {/* subtle vignette for depth */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(5,5,8,0.45)_100%)]"
        aria-hidden="true"
      />
    </section>
  );
}