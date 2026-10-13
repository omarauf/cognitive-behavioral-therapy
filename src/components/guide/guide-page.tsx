import { ArrowDown, ArrowUp, BookOpen, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { type GuideSection, shortTitle } from "@/lib/guide-content";
import { useGuideContent } from "@/lib/guide-locale";
import { cn } from "@/lib/utils";
import { MessageExample } from "./diagrams";
import { SectionVisual } from "./interactions";
import { DirectionText, Markdown } from "./markdown";

function useReadingPosition() {
  const [active, setActive] = useState(1);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-guide-section]"));
      const chapters = document.querySelector<HTMLElement>(".chapter-strip");
      const navigationHeight =
        chapters && getComputedStyle(chapters).position === "sticky" ? chapters.clientHeight : 0;
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
  const { guide, ui, formatNumber } = useGuideContent();
  return (
    <nav className="contents">
      <h2>{ui.contents}</h2>
      <ol>
        {guide.parts.map((part) => (
          <li
            key={part.id}
            className={cn("toc-part", {
              "is-current-part": part.sections.some((section) => section.number === active),
            })}
          >
            <a className="toc-part-title" href={`#${part.id}`} onClick={onNavigate}>
              <span>{formatNumber(part.number)}</span>
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
                    <span>{formatNumber(section.number)}.</span>
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
        {ui.references}
      </a>
    </nav>
  );
}

function ContentsMenu({ active }: { active: number }) {
  const { ui, direction } = useGuideContent();
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="outline" />}>
        <Menu data-icon="inline-start" />
        {ui.chapters}
      </SheetTrigger>
      <SheetContent
        side={direction === "rtl" ? "right" : "left"}
        className="contents-sheet"
        dir={direction}
        closeLabel={ui.close}
      >
        <SheetHeader>
          <SheetTitle>{ui.guideChapters}</SheetTitle>
        </SheetHeader>
        <Contents active={active} onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}

function Introduction() {
  const { ui } = useGuideContent();
  return (
    <section className="guide-intro">
      <div className="intro-copy">
        <h1>
          {ui.title}
          <br />
          <span>{ui.titleAccent}</span>
        </h1>
        <p className="intro-lead">{ui.lead}</p>
        <div className="intro-actions">
          <a className={buttonVariants()} href="#part-1">
            <BookOpen data-icon="inline-start" />
            {ui.start}
          </a>
          <a className={buttonVariants({ variant: "ghost" })} href="#section-4">
            {ui.models}
            <ArrowDown data-icon="inline-end" />
          </a>
        </div>
      </div>
      <div className="intro-visual">
        <MessageExample />
      </div>
    </section>
  );
}

function Section({ section }: { section: GuideSection }) {
  const { ui, language, formatNumber } = useGuideContent();
  return (
    <section id={section.id} className="guide-section" data-guide-section={section.number}>
      <div className="section-heading">
        <span className="section-number">
          {formatNumber(section.number).padStart(2, language === "ar" ? "٠" : "0")}
        </span>
        <h3>
          <DirectionText>{section.title}</DirectionText>
        </h3>
        <a className="section-permalink" href={`#${section.id}`} title={ui.permalink}>
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
                    tableKind={
                      section.number === 2
                        ? "approaches"
                        : subsection === "4.2"
                          ? "distortions"
                          : subsection === "6.1" || subsection === "6.2"
                            ? "model"
                            : undefined
                    }
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

export function GuidePage() {
  const { guide, ui, educationalNote, chapterLabels, formatNumber } = useGuideContent();
  const active = useReadingPosition();
  const currentPart =
    guide.parts.find((part) => part.sections.some((section) => section.number === active)) ??
    guide.parts[0];
  const currentSection = guide.sections[active - 1];
  return (
    <div className="guide" id="top">
      <a href="#part-1" className="skip-link">
        {ui.skip}
      </a>
      <div className="site-container">
        <Introduction />
        <nav className="chapter-strip">
          <ContentsMenu active={active} />
          {guide.parts.map((part) => (
            <a key={part.id} href={`#${part.id}`} data-active={part.id === currentPart.id}>
              {formatNumber(part.number)}.{" "}
              <DirectionText>{chapterLabels[part.number - 1] ?? part.title}</DirectionText>
            </a>
          ))}
        </nav>
        <div className="reading-layout">
          <main className="guide-main">
            {guide.parts.map((part) => (
              <section id={part.id} className="guide-part" key={part.id}>
                {part.sections.map((section) => (
                  <Section key={section.id} section={section} />
                ))}
              </section>
            ))}
          </main>
        </div>
        <footer className="site-footer" id="references">
          <p>{educationalNote}</p>
          <a href="#top">
            {ui.back}
            <ArrowUp />
          </a>
        </footer>
      </div>
      <div className="mobile-reading-position">
        <span>
          {ui.section} {formatNumber(active)} / {formatNumber(guide.sections.length)}
        </span>
        <a href={`#${currentSection.id}`}>{shortTitle(currentSection.title)}</a>
      </div>
    </div>
  );
}
