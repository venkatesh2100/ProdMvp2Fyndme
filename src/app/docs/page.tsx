'use client';

import dynamic from "next/dynamic";

const RedocStandalone = dynamic(
  () => import("redoc").then((m) => m.RedocStandalone),
  { ssr: false }
);

export default function ApiDocs() {
  return (
    <RedocStandalone
      specUrl="/openapi.yaml"
      options={{ scrollYOffset: 50 }}
    />
  );
}
