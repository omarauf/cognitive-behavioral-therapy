import { createFileRoute } from "@tanstack/react-router";
import { GuidePage } from "@/components/guide/guide-page";

export const Route = createFileRoute("/b")({
  head: () => ({ meta: [{ title: "الأطلس البصري | العلاج المعرفي السلوكي" }] }),
  component: PageB,
});

function PageB() {
  return <GuidePage design="b" preview />;
}
