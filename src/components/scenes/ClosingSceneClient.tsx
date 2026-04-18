"use client";

import dynamic from "next/dynamic";

export const ClosingSceneClient = dynamic(
  () => import("./ClosingScene").then((m) => m.ClosingScene),
  { ssr: false, loading: () => null },
);
