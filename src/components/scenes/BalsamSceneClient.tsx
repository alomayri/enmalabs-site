"use client";

import dynamic from "next/dynamic";

export const BalsamSceneClient = dynamic(
  () => import("./BalsamScene").then((m) => m.BalsamScene),
  { ssr: false, loading: () => null },
);
