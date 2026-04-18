"use client";

import dynamic from "next/dynamic";

export const ManifestoSceneClient = dynamic(
  () => import("./ManifestoScene").then((m) => m.ManifestoScene),
  { ssr: false, loading: () => null },
);
