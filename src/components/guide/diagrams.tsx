import { ArrowDown, ArrowLeftRight, ArrowUpDown } from "lucide-react";
import { beliefs, modelElements } from "@/lib/guide";
import { arabicNumber } from "@/lib/guide-content";

export function CognitiveDiagram({
  compact = false,
  active,
}: {
  compact?: boolean;
  active?: string;
}) {
  return (
    <figure className={compact ? "cognitive-diagram compact" : "cognitive-diagram"}>
      <div className="situation" data-active={active === "situation"}>
        <span>الموقف</span>
        <strong>{modelElements[0].text}</strong>
      </div>
      <div className="cognitive-network">
        <div className="model-node" data-active={active === "thought"}>
          <span>الأفكار والتفسيرات</span>
          <strong>«سأخطئ»</strong>
          <p>وسيعتقد الجميع أنني غير كفء.</p>
        </div>
        <span className="connection">
          <ArrowLeftRight />
        </span>
        <div className="model-node" data-active={active === "emotion"}>
          <span>المشاعر</span>
          <strong>خوف وحرج</strong>
        </div>
        <span className="connection vertical">
          <ArrowUpDown />
        </span>
        <span className="mutual">تأثير متبادل</span>
        <span className="connection vertical">
          <ArrowUpDown />
        </span>
        <div className="model-node" data-active={active === "behavior"}>
          <span>السلوك</span>
          <strong>الاعتذار عن العرض</strong>
          <p>أو قراءته بسرعة دون تواصل بصري.</p>
        </div>
        <span className="connection">
          <ArrowLeftRight />
        </span>
        <div className="model-node" data-active={active === "body"}>
          <span>الجسم</span>
          <strong>تسارع النبض</strong>
          <p>وتعرق اليدين.</p>
        </div>
      </div>
      <figcaption>
        العلاقات متبادلة وليست سلسلة ثابتة في اتجاه واحد. تؤثر البيئة والصحة والضغوط الواقعية في
        الجميع.
      </figcaption>
    </figure>
  );
}

export function WavesDiagram() {
  const waves = [
    {
      title: "الموجة الأولى",
      period: "الخمسينيات والستينيات",
      text: "التعلم والتعزيز والتعرض وتغيير السلوك",
    },
    {
      title: "الموجة الثانية",
      period: "الستينيات والسبعينيات",
      text: "الأفكار والمعتقدات إلى جانب السلوك",
    },
    {
      title: "الموجة الثالثة",
      period: "العقود اللاحقة",
      text: "القبول واليقظة الذهنية والقيم والمرونة النفسية",
    },
  ];
  return (
    <figure className="diagram">
      <h4>الموجات الثلاث</h4>
      <ol className="waves">
        {waves.map((wave, index) => (
          <li key={wave.title}>
            <span className="diagram-number">{arabicNumber(index + 1)}</span>
            <h5>{wave.title}</h5>
            <p className="accent-text">{wave.period}</p>
            <p>{wave.text}</p>
          </li>
        ))}
      </ol>
      <figcaption>تتداخل الموجات، وليست حدودًا علمية صارمة أو استبدالًا كاملًا لما قبلها.</figcaption>
    </figure>
  );
}

export function BeliefDiagram() {
  return (
    <figure className="diagram">
      <h4>مستويات الأفكار والمعتقدات</h4>
      <ol className="belief-layers">
        {beliefs.map((belief, index) => (
          <li key={belief.label}>
            <details>
              <summary>
                <span className="diagram-number">{arabicNumber(index + 1)}</span>
                <strong>{belief.label}</strong>
                <span>«{belief.example}»</span>
              </summary>
              <p>{belief.definition}</p>
            </details>
          </li>
        ))}
      </ol>
      <figcaption>لا يعني ذلك أن كل شخص لديه المستويات نفسها أو أن تحديدها سهل دائمًا.</figcaption>
    </figure>
  );
}

export function ActivationDiagram() {
  return (
    <figure className="diagram">
      <h4>حلقة انخفاض المزاج</h4>
      <ol className="activation-loop">
        <li>انخفاض المزاج</li>
        <li>
          <ArrowDown />
          الانسحاب وقلة النشاط
        </li>
        <li>
          <ArrowDown />
          قلة التجارب المجزية
        </li>
        <li>
          <ArrowDown />
          استمرار انخفاض المزاج
        </li>
      </ol>
      <p className="interruption">نشاط صغير ومخطط · متعة أو إنجاز أو تواصل أو معنى</p>
      <figcaption>تُراجع النتائج والعوائق دون اشتراط تحسن المزاج فورًا.</figcaption>
    </figure>
  );
}

export function CaseDiagram() {
  const stages = [
    ["خبرة سابقة", "موقف محرج أثناء عرض قديم"],
    ["معتقد وقاعدة", "أنا غير كفء. إذا أخطأت، فسأفقد احترام الناس."],
    ["موقف حالي", "تقديم تقرير أمام الفريق"],
    ["فكرة ومشاعر وجسم", "سأفشل وسيضحكون عليّ. قلق وتوتر وتسارع النبض."],
    ["سلوك ونتيجة", "رفض العرض. راحة قصيرة المدى، وتقل الممارسة ويبقى الاعتقاد بأنه غير قادر."],
  ];
  return (
    <figure className="diagram">
      <h4>خريطة تفسيرية للحالة</h4>
      <ol className="case-flow">
        {stages.map(([label, text]) => (
          <li key={label}>
            <strong>{label}</strong>
            <p>{text}</p>
          </li>
        ))}
      </ol>
      <figcaption>
        هذه فرضية قابلة للمراجعة وليست حقيقة ثابتة عن الشخص. يتضمن تصور الحالة العوامل البيئية ونقاط
        القوة.
      </figcaption>
    </figure>
  );
}

export function ConceptDiagram() {
  const levels = [
    ["منهج علاجي", "إلى أي عائلة علاجية ينتمي العمل؟"],
    ["نظرية أو مبدأ", "لماذا تظهر أنماط معينة أو تستمر؟"],
    ["تصور للحالة", "ما الذي يحافظ على مشكلة هذا الشخص تحديدًا؟"],
    ["نموذج تنظيمي", "كيف نرتب عناصر موقف معين؟"],
    ["تدخل أو تقنية", "ما أسلوب التغيير المستخدم؟"],
    ["أداة أو تمرين", "ما الخطوة الملموسة التي نؤديها؟"],
  ];
  return (
    <figure className="diagram">
      <h4>خريطة المفاهيم</h4>
      <ol className="concept-hierarchy">
        {levels.map(([label, question], index) => (
          <li key={label}>
            <span className="diagram-number">{arabicNumber(index + 1)}</span>
            <strong>{label}</strong>
            <p>{question}</p>
          </li>
        ))}
      </ol>
      <figcaption>الحدود مرنة. الأهم معرفة وظيفة المصطلح في السياق.</figcaption>
    </figure>
  );
}
