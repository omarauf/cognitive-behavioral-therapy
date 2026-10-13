import { createFileRoute } from "@tanstack/react-router";
import { GuidePage } from "@/components/guide/guide-page";
import { GuideContentContext } from "@/lib/guide-locale";
import { turkishContent } from "@/lib/guide-tr";

export const Route = createFileRoute("/tr")({
  head: () => ({
    meta: [
      { title: "Psikoterapi ve bilişsel davranışçı terapiye giriş" },
      {
        name: "description",
        content:
          "Psikoterapi ve bilişsel davranışçı terapi hakkında Türkçe bir rehber. Açıklamalar, örnekler ve görsel modeller.",
      },
    ],
  }),
  component: TurkishPage,
});

function TurkishPage() {
  return (
    <GuideContentContext.Provider value={turkishContent}>
      <GuidePage />
    </GuideContentContext.Provider>
  );
}
