import { createFileRoute } from "@tanstack/react-router";
import { GuidePage } from "@/components/guide/guide-page";

export const Route = createFileRoute("/a")({
  head: () => ({ meta: [{ title: "الدليل التحريري | العلاج المعرفي السلوكي" }] }),
  component: PageA,
});

function PageA() {
  return <GuidePage design="a" preview />;
}
