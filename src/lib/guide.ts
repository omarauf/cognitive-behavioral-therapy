import source from "../../docs/CBT.md?raw";
import { parseGuide } from "./guide-content";

const report = parseGuide(source);
let sectionNumber = 0;

// Apply the selected edition without altering the canonical report.
const parts = report.parts
  .filter((part) => part.number !== 5)
  .map((part) => ({
    ...part,
    sections: part.sections
      .filter((section) => ![5, 12, 13].includes(section.number))
      .map((section) => {
        const number = ++sectionNumber;
        let subsectionNumber = 0;
        const body = section.body
          .split(/(?=^### )/m)
          .filter((block) => !/^### (?:3\.2|4\.2|6\.1|6\.2|9\.2) /.test(block))
          .join("")
          .replace(/^\*\*تمييز مهم:\*\*.*\n?/m, "")
          .replace(/^ليس المطلوب حفظ أسماء التشوهات.*\n?/m, "")
          .replace(/^\*\*الفكرة:\*\* تفسير الحدث.*\n?/m, "")
          .replace(/^قد تشير \*\*E\*\*.*\n?/m, "")
          .replace(
            /^\*\*خطوات عملية:\*\*.*$/m,
            [
              "**خطوات مبسطة:**",
              "",
              "1. تحديد الموقف والفكرة التلقائية والمشاعر.",
              "2. سؤال: ما الأدلة المؤيدة للفكرة؟",
              "3. سؤال: ما الأدلة التي تخالفها أو تحدّ من التعميم؟",
              "4. البحث عن تفسير بديل واقعي.",
              "5. صياغة فكرة أكثر توازنًا وملاحظة أثرها.",
            ].join("\n"),
          )
          .replace(/^### \d+\.\d+ /gm, () => `### ${number}.${++subsectionNumber} `);
        return {
          ...section,
          id: `section-${number}`,
          number,
          body,
          subsections: Array.from(body.matchAll(/^### (\d+\.\d+) (.+)$/gm), (match) => ({
            id: `section-${match[1].replace(".", "-")}`,
            title: `${match[1]} ${match[2]}`,
          })),
        };
      }),
  }));

export const guide = { ...report, parts, sections: parts.flatMap((part) => part.sections) };

export const educationalNote =
  "هذا دليل تعليمي تمهيدي وليس دليلًا سريريًا أو بديلًا عن تقييم معالج نفسي مؤهل. الأمثلة افتراضية لتوضيح المفاهيم، وليست وصفات علاجية للجميع.";

export const avoidanceSteps = [
  { id: "prediction", label: "توقع الفشل", text: "سأخطئ وسيسخر مني الجميع." },
  { id: "anxiety", label: "القلق", text: "قلق وتسارع نبضات القلب." },
  { id: "avoidance", label: "التجنب", text: "يعتذر عن العرض." },
  { id: "relief", label: "راحة مؤقتة", text: "ينخفض القلق؛ فيتعزز التجنب." },
  {
    id: "fear",
    label: "استمرار الخوف",
    text: "يفقد فرصة اختبار توقعه والتدرب؛ وقد يصبح العرض التالي أصعب.",
  },
] as const;
