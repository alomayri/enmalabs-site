"use client";

import dynamic from "next/dynamic";

// R3F needs window — load it client-side only.
export const HeroSceneClient = dynamic(
  () => import("./HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => null },
);
