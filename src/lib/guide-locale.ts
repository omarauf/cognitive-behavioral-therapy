import { createContext, useContext } from "react";
import { avoidanceSteps, educationalNote, guide } from "./guide";
import { arabicNumber } from "./guide-content";

export const arabicContent = {
  language: "ar" as const,
  direction: "rtl" as const,
  guide,
  formatNumber: arabicNumber,
  chapterLabels: [
    "مدخل إلى العلاج النفسي",
    "الأسس النظرية",
    "النماذج والتقنيات",
    "الأدوات والتمارين",
  ],
  ui: {
    contents: "محتويات الدليل",
    chapters: "الفصول",
    guideChapters: "فصول الدليل",
    references: "المراجع وحدود الاستخدام",
    close: "إغلاق",
    skip: "انتقل إلى محتوى الدليل",
    title: "مدخل إلى العلاج النفسي",
    titleAccent: "والعلاج المعرفي السلوكي",
    lead: "يشرح الأسس النظرية للعلاج المعرفي السلوكي، ونماذجه وتقنياته وتطبيقاته العملية، بلغة واضحة وأمثلة مترابطة.",
    start: "ابدأ القراءة",
    models: "استكشف النماذج",
    permalink: "رابط هذا القسم",
    back: "العودة إلى البداية",
    section: "القسم",
    part: "الجزء",
    eyebrow: "دليل تعليمي مبسّط",
  },
  educationalNote,
  message: {
    label: "مثال من الدليل",
    event: "لم يرد صديق على رسالة.",
    interpretation: "تفسير",
    alternative: "تفسير آخر",
    first: "«هو لا يهتم بي»",
    firstResult: "حزن وانسحاب.",
    second: "«قد يكون مشغولًا»",
    secondResult: "انتظار.",
    caption:
      "ليس معنى ذلك أن كل ألم نفسي سببه التفكير، بل أن طريقة تفسير الحدث قد تؤثر في الاستجابة إلى جانب الحدث نفسه والظروف الواقعية.",
  },
  cognitive: {
    situation: "الموقف",
    event: "طُلب مني تقديم عرض أمام الزملاء.",
    thoughts: "الأفكار والتفسيرات",
    thought: "«سأخطئ»",
    thoughtDetail: "وسيعتقد الجميع أنني غير كفء.",
    feelings: "المشاعر",
    emotion: "خوف وحرج",
    mutual: "تأثير متبادل",
    behavior: "السلوك",
    action: "الاعتذار عن العرض",
    actionDetail: "أو قراءته بسرعة دون تواصل بصري.",
    body: "الجسم",
    response: "تسارع النبض",
    responseDetail: "وتعرق اليدين.",
    hint: "اختر عنصرًا لترى كيف يرتبط بالعناصر الأخرى.",
  },
  waves: [
    {
      title: "الموجة الأولى: السلوكية",
      period: "الخمسينيات والستينيات",
      text: "انطلقت من نظريات التعلم، وركزت على التعزيز والتعرض وتغيير السلوك.",
    },
    {
      title: "الموجة الثانية: المعرفية السلوكية",
      period: "الستينيات والسبعينيات",
      text: "أضافت دور الأفكار والمعتقدات إلى جانب السلوك. طوّر آرون بيك (Aaron Beck) العلاج المعرفي، وألبرت إليس (Albert Ellis) العلاج العقلاني الانفعالي السلوكي (REBT).",
    },
    {
      title: "الموجة الثالثة: المقاربات السياقية والقبول",
      period: "العقود اللاحقة",
      text: "اهتمت بالقبول واليقظة الذهنية والقيم والمرونة النفسية، ومن أمثلتها ACT وDBT. تتداخل الموجات؛ ليست حدودًا علمية صارمة ولا تستبدل ما قبلها بالكامل.",
    },
  ],
  avoidanceSteps,
  avoidanceTitle: "الحلقة المفرغة للتجنب",
  avoidancePlay: "تتبّع الحلقة",
};

export type GuideContent = Omit<
  typeof arabicContent,
  "language" | "direction" | "avoidanceSteps"
> & {
  language: "ar" | "tr";
  direction: "rtl" | "ltr";
  avoidanceSteps: readonly { id: string; label: string; text: string; shortLabel?: string }[];
};

export const GuideContentContext = createContext<GuideContent>(arabicContent);

export function useGuideContent() {
  return useContext(GuideContentContext);
}
