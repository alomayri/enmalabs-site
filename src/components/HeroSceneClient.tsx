"use client";

import dynamic from "next/dynamic";

// Next 16 client-only boundary for the WebGL hero scene.
export const HeroSceneClient = dynamic(
  () => import("./HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => null },
);
