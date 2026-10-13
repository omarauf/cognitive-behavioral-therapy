import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowLeft, ArrowUp, BookOpen, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { educationalNote, guide } from "@/lib/guide";
import { arabicNumber, type GuideSection, shortTitle } from "@/lib/guide-content";
import { cn } from "@/lib/utils";
import { CognitiveDiagram, MessageExample } from "./diagrams";
import { SectionVisual } from "./interactions";
import { DirectionText, Markdown } from "./markdown";

export type Design = "a" | "b" | "c";

const chapterLabels = [
  "مدخل إلى العلاج النفسي",
  "الأسس النظرية",
  "النماذج والتقنيات",
  "الأدوات والتمارين",
];

function useReadingPosition() {
  const [active, setActive] = useState(1);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-guide-section]"));
      const chapters = document.querySelector<HTMLElement>(".chapter-strip");
      const navigationHeight =
        (document.querySelector(".site-header")?.clientHeight ?? 0) +
        (chapters && getComputedStyle(chapters).position === "sticky" ? chapters.clientHeight : 0);
      const current = sections
        .filter((section) => section.getBoundingClientRect().top <= navigationHeight + 32)
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

function ContentsMenu({ active }: { active: number }) {
  const [open, setOpen] = useState(false);
  return (
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
  );
}

function Header({ design, active, preview }: { design: Design; active: number; preview: boolean }) {
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
          <ContentsMenu active={active} />
        </div>
      </div>
    </header>
  );
}

function Introduction({ design }: { design: Design }) {
  return (
    <section className="guide-intro">
      <div className="intro-copy">
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
              مدخل إلى العلاج النفسي
              <br />
              <span>والعلاج المعرفي السلوكي</span>
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
      </div>
      <div className="intro-visual">
        {design === "c" ? (
          <MessageExample />
        ) : (
          <>
            <p className="part-label">النموذج المعرفي · مثال من الدليل</p>
            <CognitiveDiagram compact />
          </>
        )}
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

function Section({ section }: { section: GuideSection }) {
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
          {section.body.split(/(?=^### )/m).map((block) => {
            const subsection =
              /^### (\d+\.\d+)/.exec(block)?.[1] ??
              (block.startsWith("### ") ? "unnumbered" : undefined);
            return (
              <div className="content-block" key={block}>
                {(subsection !== undefined || (section.number !== 4 && section.number !== 5)) && (
                  <Markdown
                    text={subsection === "3.1" ? block.split("\n")[0] : block}
                    illustratedApproaches={section.number === 2}
                  />
                )}
                <SectionVisual number={section.number} subsection={subsection} />
              </div>
            );
          })}
        </div>
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
      {design !== "c" && <Header design={design} active={active} preview={preview} />}
      <div className="site-container">
        <Introduction design={design} />
        {design === "b" && <PartIndex />}
        {design === "c" && (
          <nav className="chapter-strip">
            <ContentsMenu active={active} />
            {guide.parts.map((part) => (
              <a key={part.id} href={`#${part.id}`} data-active={part.id === currentPart.id}>
                {arabicNumber(part.number)}.{" "}
                <DirectionText>{chapterLabels[part.number - 1] ?? part.title}</DirectionText>
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
            {guide.parts.map((part) => (
              <section id={part.id} className="guide-part" key={part.id}>
                <header className="part-heading">
                  <div className="part-title-row">
                    <span className="part-number">
                      {arabicNumber(part.number).padStart(2, "٠")}
                    </span>
                    <div>
                      <h2>
                        <DirectionText>{part.title}</DirectionText>
                      </h2>
                    </div>
                  </div>
                </header>
                {part.sections.map((section) => (
                  <Section key={section.id} section={section} />
                ))}
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
