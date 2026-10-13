import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowLeft, ArrowUp, BookOpen, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { educationalNote, guide } from "@/lib/guide";
import { arabicNumber, type GuidePart, type GuideSection, shortTitle } from "@/lib/guide-content";
import { cn } from "@/lib/utils";
import { CognitiveDiagram } from "./diagrams";
import { SectionVisual } from "./interactions";
import { DirectionText, Markdown } from "./markdown";

export type Design = "a" | "b" | "c";

const annotations: Record<number, string> = {
  2: "العلاج الأسري والجماعي يصفان أيضًا طريقة تقديم العلاج؛ أما ACT وDBT فلهما صلة بعائلة العلاجات المعرفية السلوكية، لكنهما ليسا مجرد تقنيتين داخل CBT التقليدي.",
  3: "ليس تفكيرًا إيجابيًا إجباريًا، ولا إنكارًا للمشكلات الحقيقية، ولا لومًا للشخص على مشاعره أو ظروفه.",
  4: "قد يغير السلوك المزاج، وقد تجعل مشاعر الخوف بعض الأفكار أكثر إلحاحًا، كما تؤثر البيئة والصحة والضغوط الواقعية في الجميع.",
  5: "«سلبي» هنا لا يعني سيئًا أخلاقيًا؛ بل يعني إزالة شيء.",
  6: "لا ينبغي التخلص من احتياطات السلامة الواقعية.",
  7: "قد تشير E في الصياغات المختلفة لـREBT إلى المنظور الجديد الفعال أو أثره، وليس إلى مجرد «فكرة إيجابية».",
  8: "الهدف هو الدقة والمرونة، وليس إنكار الحقائق المزعجة.",
  9: "ليس المقصود مواجهة خطر حقيقي أو دفع الشخص إلى تجارب مؤذية. يُفضّل تنفيذ ERP بإشراف معالج مدرَّب.",
  10: "أداة كتابية مختصرة لتطبيق إعادة البناء المعرفي، وليست نموذجًا علاجيًا مستقلًا.",
  11: "ضعف الثقة بالنفس والشعور بالفشل ليسا بالضرورة تشخيصين نفسيين.",
  12: "إذا لم تُنفذ الخطة، تُراجع أسباب ذلك وتُعدّل بدل استخدامها دليلًا على الفشل.",
  13: "هذا المثال حالة افتراضية ولا يمثل تشخيصًا. لا يشترط أن يختفي القلق.",
  14: "هذه فرضية قابلة للمراجعة وليست حقيقة ثابتة عن الشخص.",
  15: "الانتكاسة المحتملة ليست إلغاءً لما تعلمه الشخص.",
  16: "لا يوجد بروتوكول واحد يعالج الجميع.",
  17: "الحدود مرنة. الأهم معرفة وظيفة المصطلح في السياق.",
  18: "الهدف ليس إزالة الحزن والخوف من الحياة، وإنما زيادة القدرة على فهم التجارب النفسية والتعامل معها بمرونة وتحسين التصرف رغم الصعوبات.",
};

function useReadingPosition() {
  const [active, setActive] = useState(1);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-guide-section]"));
      const current = sections
        .filter((section) => section.getBoundingClientRect().top <= 190)
        .at(-1);
      setActive(current ? Number(current.dataset.guideSection) : 1);
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);
  return active;
}

function Contents({ active, onNavigate }: { active: number; onNavigate?: () => void }) {
  return (
    <nav className="contents">
      <h2>محتويات الدليل</h2>
      <ol>
        {guide.parts.map((part) => (
          <li
            key={part.id}
            className={cn("toc-part", {
              "is-current-part": part.sections.some((section) => section.number === active),
            })}
          >
            <a className="toc-part-title" href={`#${part.id}`} onClick={onNavigate}>
              <span>{arabicNumber(part.number)}</span>
              <DirectionText>{part.title}</DirectionText>
            </a>
            <ol>
              {part.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    data-active={active === section.number}
                    onClick={onNavigate}
                  >
                    <span>{arabicNumber(section.number)}.</span>
                    {shortTitle(section.title)}
                  </a>
                  {active === section.number && section.subsections.length > 0 && (
                    <ol className="toc-subsections">
                      {section.subsections.map((subsection) => (
                        <li key={subsection.id}>
                          <a href={`#${subsection.id}`} onClick={onNavigate}>
                            {shortTitle(subsection.title)}
                          </a>
                        </li>
                      ))}
                    </ol>
                  )}
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
      {/* biome-ignore lint/a11y/useValidAnchor: This navigates to the references and also closes the mobile drawer. */}
      <a className="toc-references" href="#references" onClick={() => onNavigate?.()}>
        المراجع وحدود الاستخدام
      </a>
    </nav>
  );
}

function Header({ design, active, preview }: { design: Design; active: number; preview: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="#top" className="brand">
          <span className="brand-mark">
            <bdi dir="ltr">CBT</bdi>
          </span>
          <span>العلاج المعرفي السلوكي</span>
        </a>
        {preview && (
          <nav className="design-switch">
            <span>التصميم</span>
            {(["a", "b", "c"] as const).map((option) => (
              <Link
                key={option}
                to={`/${option}`}
                className={cn({ selected: option === design })}
                title={`التصميم ${option.toUpperCase()}`}
              >
                <bdi dir="ltr">{option.toUpperCase()}</bdi>
              </Link>
            ))}
          </nav>
        )}
        <div className="header-reading-links">
          <a href="#part-1">الدليل</a>
          <a href="#section-4">النماذج</a>
          <a href="#references">المراجع</a>
        </div>
        <div className="mobile-contents">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={<Button variant="outline" />}>
              <Menu data-icon="inline-start" />
              الفصول
            </SheetTrigger>
            <SheetContent side="right" className="contents-sheet" dir="rtl">
              <SheetHeader>
                <SheetTitle>فصول الدليل</SheetTitle>
              </SheetHeader>
              <Contents active={active} onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function Introduction({ design }: { design: Design }) {
  return (
    <section className="guide-intro">
      <div className="intro-copy">
        <p className="part-label">دليل تعليمي لغير المتخصصين</p>
        <h1>
          {design === "b" ? (
            <>
              فهم الأفكار
              <br />
              والمشاعر
              <br />
              <span>والسلوكيات.</span>
            </>
          ) : (
            <>
              مدخل مبسّط إلى
              <br />
              <span>العلاج المعرفي السلوكي</span>
            </>
          )}
        </h1>
        <p className="intro-lead">
          يشرح الأسس النظرية للعلاج المعرفي السلوكي، ونماذجه وتقنياته وتطبيقاته العملية، بلغة واضحة
          وأمثلة مترابطة.
        </p>
        <div className="intro-actions">
          <a className={buttonVariants()} href="#part-1">
            <BookOpen data-icon="inline-start" />
            ابدأ القراءة
          </a>
          <a className={buttonVariants({ variant: "ghost" })} href="#section-4">
            استكشف النماذج
            <ArrowDown data-icon="inline-end" />
          </a>
        </div>
        <p className="intro-meta">
          {arabicNumber(guide.parts.length)} أجزاء · {arabicNumber(guide.sections.length)} قسمًا
        </p>
      </div>
      <div className="intro-visual">
        <p className="part-label">النموذج المعرفي · مثال من الدليل</p>
        <CognitiveDiagram compact />
      </div>
    </section>
  );
}

function PartIndex() {
  return (
    <nav className="atlas-index">
      {guide.parts.map((part) => (
        <a key={part.id} href={`#${part.id}`}>
          <span className="index-number">{arabicNumber(part.number)}</span>
          <div>
            <h2>
              <DirectionText>{part.title}</DirectionText>
            </h2>
            <p>{part.sections.map((section) => arabicNumber(section.number)).join(" · ")}</p>
          </div>
          <ArrowLeft />
        </a>
      ))}
    </nav>
  );
}

function ChapterLinks({ part }: { part: GuidePart }) {
  const previous = guide.parts[part.number - 2];
  const next = guide.parts[part.number];
  return (
    <nav className="chapter-links">
      {previous ? (
        <a href={`#${previous.id}`}>
          <span>→</span>
          {previous.title}
        </a>
      ) : (
        <a href="#top">العودة إلى البداية</a>
      )}
      {next ? (
        <a href={`#${next.id}`}>
          {next.title}
          <ArrowLeft />
        </a>
      ) : (
        <a href="#references">
          المراجع
          <ArrowLeft />
        </a>
      )}
    </nav>
  );
}

function Section({ section, design }: { section: GuideSection; design: Design }) {
  return (
    <section id={section.id} className="guide-section" data-guide-section={section.number}>
      <div className="section-heading">
        <span className="section-number">{arabicNumber(section.number).padStart(2, "٠")}</span>
        <h3>
          <DirectionText>{section.title}</DirectionText>
        </h3>
        <a className="section-permalink" href={`#${section.id}`} title="رابط هذا القسم">
          #
        </a>
      </div>
      <div className="section-layout">
        <div className="section-body">
          <Markdown text={section.body} />
          <SectionVisual number={section.number} />
        </div>
        {design === "c" && annotations[section.number] && (
          <aside className="section-annotation">
            <h4>للتذكر</h4>
            <p>
              <DirectionText>{annotations[section.number]}</DirectionText>
            </p>
          </aside>
        )}
      </div>
    </section>
  );
}

export function GuidePage({ design, preview = false }: { design: Design; preview?: boolean }) {
  const active = useReadingPosition();
  const currentPart =
    guide.parts.find((part) => part.sections.some((section) => section.number === active)) ??
    guide.parts[0];
  const currentSection = guide.sections[active - 1];
  return (
    <div className={cn("guide", `design-${design}`)} id="top">
      <a href="#part-1" className="skip-link">
        انتقل إلى محتوى الدليل
      </a>
      <Header design={design} active={active} preview={preview} />
      <div className="site-container">
        <Introduction design={design} />
        {design === "b" && <PartIndex />}
        {design === "c" && (
          <nav className="chapter-strip">
            {guide.parts.map((part) => (
              <a key={part.id} href={`#${part.id}`} data-active={part.id === currentPart.id}>
                {arabicNumber(part.number)}. <DirectionText>{part.title}</DirectionText>
              </a>
            ))}
          </nav>
        )}
        <div className="reading-layout">
          {design !== "c" && (
            <aside className="desktop-toc">
              <Contents active={active} />
              <div className="reading-position">
                <span>
                  القسم {arabicNumber(active)} من {arabicNumber(guide.sections.length)}
                </span>
                <meter min={0} max={guide.sections.length} value={active}>
                  القسم {arabicNumber(active)}
                </meter>
              </div>
            </aside>
          )}
          <main className="guide-main">
            <div className="source-intro">
              <Markdown text={guide.introduction} />
              <p className="educational-note">{educationalNote}</p>
            </div>
            {guide.parts.map((part) => (
              <section id={part.id} className="guide-part" key={part.id}>
                <header className="part-heading">
                  <p className="part-label">الجزء {arabicNumber(part.number)}</p>
                  <h2>
                    <DirectionText>{part.title}</DirectionText>
                  </h2>
                  <nav className="part-sections">
                    {part.sections.map((section) => (
                      <a href={`#${section.id}`} key={section.id}>
                        {arabicNumber(section.number)}. {shortTitle(section.title)}
                      </a>
                    ))}
                  </nav>
                </header>
                {part.sections.map((section) => (
                  <Section key={section.id} section={section} design={design} />
                ))}
                <ChapterLinks part={part} />
              </section>
            ))}
            <section id="references" className="references">
              <h2>مراجع موثوقة للقراءة والتوسع</h2>
              <Markdown text={guide.references} />
            </section>
          </main>
        </div>
        <footer className="site-footer">
          <p>{educationalNote}</p>
          <a href="#top">
            العودة إلى البداية
            <ArrowUp />
          </a>
        </footer>
      </div>
      <div className="mobile-reading-position">
        <span>
          القسم {arabicNumber(active)} / {arabicNumber(guide.sections.length)}
        </span>
        <a href={`#${currentSection.id}`}>{shortTitle(currentSection.title)}</a>
      </div>
    </div>
  );
}
