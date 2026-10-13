import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { useId, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  abcdeSteps,
  avoidanceSteps,
  caseTechniques,
  educationalNote,
  exposureSteps,
  guide,
  modelElements,
  thoughtFields,
} from "@/lib/guide";
import { arabicNumber } from "@/lib/guide-content";
import { cn } from "@/lib/utils";
import {
  ActivationDiagram,
  BeliefDiagram,
  CaseDiagram,
  CognitiveDiagram,
  ConceptDiagram,
  WavesDiagram,
} from "./diagrams";
import { DirectionText } from "./markdown";

function ChoiceSteps({
  items,
  value,
  onChange,
}: {
  items: readonly { id: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <ToggleGroup
      className="step-choices"
      value={[value]}
      onValueChange={(values) => {
        if (values[0]) onChange(values[0]);
      }}
    >
      {items.map((item) => (
        <ToggleGroupItem key={item.id} value={item.id}>
          {/^[A-E]$/.test(item.id) && <bdi dir="ltr">{item.id}</bdi>}
          {item.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

function CognitiveExplorer() {
  const [value, setValue] = useState<string>(modelElements[1].id);
  const selected = modelElements.find((element) => element.id === value) ?? modelElements[1];
  return (
    <section className="learning-demo">
      <h4>استكشف عناصر الموقف</h4>
      <CognitiveDiagram active={value} />
      <p className="demo-instruction">اختر عنصرًا لعرض مثاله.</p>
      <ChoiceSteps items={modelElements} value={value} onChange={setValue} />
      <div className="step-result">
        <h5>{selected.label}</h5>
        <p>{selected.text}</p>
      </div>
      <BeliefDiagram />
      <Distortions />
    </section>
  );
}

function Distortions() {
  const section = guide.sections.find((item) => item.number === 4);
  const table = section?.body.split("### 4.3")[1] ?? "";
  const rows = table.split("\n").filter((line) => line.startsWith("| **"));
  return (
    <section className="distortions">
      <h4>التشوهات المعرفية العشرة</h4>
      <p className="demo-instruction">اختر اسم النمط لقراءة المثال.</p>
      <Accordion multiple>
        {rows.map((row) => {
          const cells = row
            .split("|")
            .slice(1, -1)
            .map((cell) => cell.trim().replaceAll("**", ""));
          return (
            <AccordionItem key={cells[0]} value={cells[0]}>
              <AccordionTrigger>
                <DirectionText>{cells[0]}</DirectionText>
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  <DirectionText>{cells[1]}</DirectionText>
                </p>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
}

function ABCDEWalkthrough() {
  const [value, setValue] = useState<string>("A");
  const index = Math.max(
    0,
    abcdeSteps.findIndex((step) => step.id === value),
  );
  const selected = abcdeSteps[index];
  return (
    <section className="learning-demo">
      <h4>الرسالة غير المجاب عنها</h4>
      <p className="demo-instruction">
        انتقل بين مراحل <bdi dir="ltr">ABCDE</bdi>.
      </p>
      <ChoiceSteps items={abcdeSteps} value={value} onChange={setValue} />
      <div className="abcde-stage">
        <bdi dir="ltr">{selected.id}</bdi>
        <div>
          <h5>{selected.label}</h5>
          <p>«{selected.text}»</p>
        </div>
      </div>
      <div className="demo-actions">
        <Button
          variant="outline"
          disabled={index === 0}
          onClick={() => setValue(abcdeSteps[index - 1].id)}
        >
          <ArrowRight data-icon="inline-start" />
          السابق
        </Button>
        <span>
          {arabicNumber(index + 1)} / {arabicNumber(abcdeSteps.length)}
        </span>
        <Button
          variant="outline"
          disabled={index === abcdeSteps.length - 1}
          onClick={() => setValue(abcdeSteps[index + 1].id)}
        >
          التالي
          <ArrowLeft data-icon="inline-end" />
        </Button>
      </div>
      <p className="demo-note">
        تفسير الحدث يساهم في تشكيل الاستجابة، لكن الحدث والظروف الجسدية والبيئية يؤثران أيضًا.
        المنظور الجديد الفعال ليس مجرد «فكرة إيجابية».
      </p>
    </section>
  );
}

function AvoidanceExplorer() {
  const [value, setValue] = useState<string>(avoidanceSteps[0].id);
  const selected = avoidanceSteps.find((step) => step.id === value) ?? avoidanceSteps[0];
  return (
    <figure className="learning-demo">
      <h4>الحلقة المفرغة للتجنب</h4>
      <p className="demo-instruction">الموقف: يُطلب من شخص تقديم عرض.</p>
      <ChoiceSteps items={avoidanceSteps} value={value} onChange={setValue} />
      <div className="step-result">
        <h5>{selected.label}</h5>
        <p>{selected.text}</p>
      </div>
      <p className="cycle-return">
        توقع الفشل ← قلق ← تجنب ← راحة مؤقتة ← استمرار الاعتقاد بالخطر ← قلق جديد
      </p>
      <div className="interruption">
        <strong>اختبار التوقع والتدرب</strong>
        <p>تقديم جزء قصير في موقف مناسب ومراقبة ردود الفعل الفعلية ومقارنتها بالتوقع.</p>
      </div>
      <figcaption>
        التجنب يخفف القلق مؤقتًا لكنه قد يُبقي الخوف مستمرًا. لا ينبغي التخلص من احتياطات السلامة
        الواقعية.
      </figcaption>
    </figure>
  );
}

const activities = [
  { id: "walk", label: "المشي عشر دقائق" },
  { id: "friend", label: "التواصل مع صديق" },
  { id: "desk", label: "ترتيب المكتب خمس عشرة دقيقة" },
] as const;
const weekdays = ["الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"];
const initialPlan: Record<string, string> = { walk: "الاثنين", friend: "الأربعاء", desk: "الجمعة" };

function ActivationPlanner() {
  const id = useId();
  const [selected, setSelected] = useState<string[]>([]);
  const [plan, setPlan] = useState(initialPlan);
  return (
    <section className="learning-demo">
      <h4>مثال لجدولة الأنشطة</h4>
      <p className="demo-instruction">اختر نشاطًا أو أكثر، ثم حدد يومًا. هذا مثال تعليمي.</p>
      <FieldSet>
        <FieldLegend>أنشطة من الدليل</FieldLegend>
        <ToggleGroup multiple className="step-choices" value={selected} onValueChange={setSelected}>
          {activities.map((activity) => (
            <ToggleGroupItem value={activity.id} key={activity.id}>
              {activity.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <FieldGroup>
          {activities
            .filter((activity) => selected.includes(activity.id))
            .map((activity) => (
              <Field key={activity.id}>
                <FieldLabel htmlFor={`${id}-${activity.id}`}>موعد {activity.label}</FieldLabel>
                <select
                  id={`${id}-${activity.id}`}
                  value={plan[activity.id]}
                  onChange={(event) =>
                    setPlan((previous) => ({ ...previous, [activity.id]: event.target.value }))
                  }
                >
                  {weekdays.map((day) => (
                    <option key={day}>{day}</option>
                  ))}
                </select>
              </Field>
            ))}
        </FieldGroup>
      </FieldSet>
      <ol className="week-plan">
        {weekdays.map((day) => (
          <li key={day}>
            <strong>{day}</strong>
            {activities
              .filter((activity) => selected.includes(activity.id) && plan[activity.id] === day)
              .map((activity) => (
                <p key={activity.id}>{activity.label}</p>
              ))}
          </li>
        ))}
      </ol>
      {selected.length === 0 && <p className="demo-instruction">اختر نشاطًا ليظهر في الجدول.</p>}
      <Button
        variant="outline"
        onClick={() => {
          setSelected([]);
          setPlan(initialPlan);
        }}
      >
        <RotateCcw data-icon="inline-start" />
        إعادة ضبط الجدول
      </Button>
      <p className="demo-note">
        تُراجع النتائج والعوائق دون اشتراط تحسن المزاج فورًا. {educationalNote}
      </p>
    </section>
  );
}

function ExposureLadder() {
  const [value, setValue] = useState("0");
  const steps = exposureSteps.map((label, index) => ({ id: String(index), label }));
  return (
    <figure className="learning-demo">
      <h4>التعرض التدريجي في مثال التحدث أمام الجمهور</h4>
      <ChoiceSteps items={steps} value={value} onChange={setValue} />
      <ol className="exposure-ladder">
        {exposureSteps.map((step, index) => (
          <li key={step} className={cn({ selected: Number(value) === index })}>
            <span className="diagram-number">{arabicNumber(index + 1)}</span>
            <strong>{step}</strong>
          </li>
        ))}
      </ol>
      <figcaption>
        التدرج وفق تقييم الحالة. ليس المقصود مواجهة خطر حقيقي أو دفع الشخص إلى تجارب مؤذية. هذا
        المثال ليس خطة علاجية شخصية.
      </figcaption>
    </figure>
  );
}

function ThoughtRecord() {
  const id = useId();
  const [values, setValues] = useState(() => thoughtFields.map(() => ""));
  const [cleared, setCleared] = useState(false);
  return (
    <section className="learning-demo">
      <h4>سجل أفكار اختياري</h4>
      <p className="demo-instruction">
        يمكنك استخدام مثال افتراضي. الكتابة تبقى في ذاكرة الصفحة وتختفي عند إغلاقها أو إعادة
        تحميلها. لا تُرسل ولا تُحفظ.
      </p>
      <FieldGroup>
        {thoughtFields.map((field, index) => (
          <Field key={field.label}>
            <FieldLabel htmlFor={`${id}-thought-${index}`}>{field.label}</FieldLabel>
            <Textarea
              id={`${id}-thought-${index}`}
              value={values[index]}
              autoComplete="off"
              onChange={(event) => {
                const text = event.target.value;
                setValues((previous) =>
                  previous.map((value, fieldIndex) => (fieldIndex === index ? text : value)),
                );
                setCleared(false);
              }}
            />
            <FieldDescription>
              مثال: <DirectionText>{field.example}</DirectionText>
            </FieldDescription>
          </Field>
        ))}
      </FieldGroup>
      <div className="demo-actions">
        <Button
          variant="outline"
          onClick={() => {
            setValues(thoughtFields.map(() => ""));
            setCleared(true);
          }}
        >
          <RotateCcw data-icon="inline-start" />
          مسح السجل
        </Button>
        {cleared && <p>تم مسح السجل.</p>}
      </div>
      <p className="demo-note">{educationalNote}</p>
    </section>
  );
}

function CaseExplorer() {
  const [value, setValue] = useState<string>(caseTechniques[0].id);
  const selected = caseTechniques.find((technique) => technique.id === value) ?? caseTechniques[0];
  return (
    <section className="learning-demo">
      <h4>كيف يتدخل CBT في الحالة نفسها؟</h4>
      <CaseDiagram />
      <p className="demo-instruction">اختر أسلوبًا لقراءة دوره في المثال.</p>
      <ChoiceSteps items={caseTechniques} value={value} onChange={setValue} />
      <div className="step-result">
        <h5>{selected.label}</h5>
        <p>{selected.text}</p>
      </div>
      <p className="demo-note">
        لا يشترط أن يختفي القلق؛ قد يكتشف الشخص أنه يستطيع التحدث واتخاذ قرارات مناسبة رغم وجود بعض
        القلق، وأن توقعاته الكارثية ليست حقائق مؤكدة.
      </p>
    </section>
  );
}

export function SectionVisual({ number }: { number: number }) {
  switch (number) {
    case 3:
      return <WavesDiagram />;
    case 4:
      return <CognitiveExplorer />;
    case 6:
      return <AvoidanceExplorer />;
    case 7:
      return <ABCDEWalkthrough />;
    case 9:
      return (
        <>
          <ActivationDiagram />
          <ActivationPlanner />
          <ExposureLadder />
        </>
      );
    case 10:
      return <ThoughtRecord />;
    case 13:
      return <CaseExplorer />;
    case 14:
      return <CaseDiagram />;
    case 17:
      return <ConceptDiagram />;
    default:
      return null;
  }
}
