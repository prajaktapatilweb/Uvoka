import { Suspense } from "react";
import { Studio } from "./Studio";

export const dynamic = "force-dynamic";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#101112] text-white/80 font-sans text-sm">
          Loading UVOKA Executive Studio...
        </div>
      }
    >
      <Studio />
    </Suspense>
  );
}
