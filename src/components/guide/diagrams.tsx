import { MessageSquare } from "lucide-react";
import { useId } from "react";
import { avoidanceSteps, modelElements } from "@/lib/guide";
import { DirectionText } from "./markdown";

export function MessageExample() {
  return (
    <figure className="message-example">
      <div className="message-event">
        <span className="example-icon">
          <MessageSquare />
        </span>
        <div>
          <span className="example-label">مثال من الدليل</span>
          <h2>لم يرد صديق على رسالة.</h2>
        </div>
      </div>
      <div className="message-branches">
        <div>
          <span className="branch-marker" />
          <span className="example-label">تفسير</span>
          <h3>«هو لا يهتم بي»</h3>
          <p>حزن وانسحاب.</p>
        </div>
        <div>
          <span className="branch-marker" />
          <span className="example-label">تفسير آخر</span>
          <h3>«قد يكون مشغولًا»</h3>
          <p>انتظار.</p>
        </div>
      </div>
      <figcaption>
        ليس معنى ذلك أن كل ألم نفسي سببه التفكير، بل أن طريقة تفسير الحدث قد تؤثر في الاستجابة إلى
        جانب الحدث نفسه والظروف الواقعية.
      </figcaption>
    </figure>
  );
}

export function AvoidanceDiagram() {
  const arrowId = useId();
  return (
    <div className="avoidance-diagram">
      <div className="avoidance-ring">
        <svg viewBox="0 0 600 600" role="presentation">
          <defs>
            <marker
              id={arrowId}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M1 1 L8 5 L1 9" />
            </marker>
          </defs>
          <g markerEnd={`url(#${arrowId})`}>
            {[0, 72, 144, 216, 288].map((angle) => (
              <path
                key={angle}
                d="M208 111 A210 210 0 0 0 149 154"
                transform={`rotate(-${angle} 300 300)`}
              />
            ))}
          </g>
        </svg>
        <ol className="avoidance-flow">
          {avoidanceSteps.map((step) => (
            <li key={step.id}>
              <strong>{step.label}</strong>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <span className="avoidance-center">الحلقة المفرغة للتجنب</span>
      </div>
      <dl className="avoidance-details">
        {avoidanceSteps.map((step) => (
          <div key={step.id}>
            <dt>{step.label}</dt>
            <dd>{step.text}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function CognitiveDiagram({ compact = false }: { compact?: boolean }) {
  return (
    <figure className={compact ? "cognitive-diagram compact" : "cognitive-diagram"}>
      <div className="situation">
        <div>
          <span>الموقف</span>
          <strong>{modelElements[0].text}</strong>
        </div>
      </div>
      <div className="cognitive-network">
        <div className="model-node">
          <span>الأفكار والتفسيرات</span>
          <strong>«سأخطئ»</strong>
          <p>وسيعتقد الجميع أنني غير كفء.</p>
        </div>
        <span className="connection">↔</span>
        <div className="model-node">
          <span>المشاعر</span>
          <strong>خوف وحرج</strong>
        </div>
        <span className="connection vertical">↕</span>
        <span className="mutual">تأثير متبادل</span>
        <span className="connection vertical">↕</span>
        <div className="model-node">
          <span>السلوك</span>
          <strong>الاعتذار عن العرض</strong>
          <p>أو قراءته بسرعة دون تواصل بصري.</p>
        </div>
        <span className="connection">↔</span>
        <div className="model-node">
          <span>الجسم</span>
          <strong>تسارع النبض</strong>
          <p>وتعرق اليدين.</p>
        </div>
      </div>
    </figure>
  );
}

export function WavesDiagram() {
  const waves = [
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
  ];
  return (
    <div className="waves-diagram">
      <ol className="waves">
        {waves.map((wave) => (
          <li key={wave.title}>
            <h5>
              <DirectionText>{wave.title}</DirectionText>
            </h5>
            <p className="accent-text">{wave.period}</p>
            <p>
              <DirectionText>{wave.text}</DirectionText>
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
