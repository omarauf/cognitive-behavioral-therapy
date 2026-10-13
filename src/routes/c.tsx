import { createFileRoute } from "@tanstack/react-router";
import { GuidePage } from "@/components/guide/guide-page";

export const Route = createFileRoute("/c")({
  head: () => ({ meta: [{ title: "القراءة المشروحة | العلاج المعرفي السلوكي" }] }),
  component: PageC,
});

function PageC() {
  return <GuidePage design="c" preview />;
}
