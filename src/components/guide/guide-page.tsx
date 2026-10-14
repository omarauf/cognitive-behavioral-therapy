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

/** Tracks the section whose heading has scrolled past the sticky header. */
function useReadingPosition() {
  const [active, setActive] = useState(1);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-guide-section]"));
      const headerHeight = document.querySelector<HTMLElement>(".site-header")?.clientHeight ?? 0;
      const current = sections
        .filter((section) => section.getBoundingClientRect().top <= headerHeight + 48)
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
              <span>
                {ui.part} {formatNumber(part.number)}
              </span>
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
                    <span>{formatNumber(section.number)}</span>
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
      <SheetTrigger render={<Button variant="outline" className="contents-trigger" />}>
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

function SiteHeader({ active }: { active: number }) {
  const { guide, ui, formatNumber } = useGuideContent();
  const section = guide.sections[active - 1];
  return (
    <header className="site-header">
      <div className="site-container site-header-inner">
        <a className="brand" href="#top">
          <BookOpen />
          <span>{ui.title}</span>
        </a>
        <a className="header-position" href={`#${section.id}`}>
          <span>
            {formatNumber(active)} / {formatNumber(guide.sections.length)}
          </span>
          {shortTitle(section.title)}
        </a>
        <ContentsMenu active={active} />
      </div>
      <span className="reading-progress" />
    </header>
  );
}

function Introduction() {
  const { ui } = useGuideContent();
  return (
    <section className="guide-intro">
      <div className="intro-copy">
        <p className="eyebrow">{ui.eyebrow}</p>
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
  const { ui, formatNumber } = useGuideContent();
  return (
    <section id={section.id} className="guide-section" data-guide-section={section.number}>
      <div className="section-heading reveal">
        <span className="section-number">{formatNumber(section.number)}</span>
        <h3>
          <DirectionText>{section.title}</DirectionText>
        </h3>
        <a className="section-permalink" href={`#${section.id}`} title={ui.permalink}>
          #
        </a>
      </div>
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
    </section>
  );
}

export function GuidePage() {
  const { guide, ui, educationalNote, formatNumber } = useGuideContent();
  const active = useReadingPosition();
  // Keep the active entry visible when the sticky sidebar list is taller than the screen.
  // biome-ignore lint/correctness/useExhaustiveDependencies: Re-run whenever the active section changes.
  useEffect(() => {
    const sidebar = document.querySelector<HTMLElement>(".contents-sidebar");
    const link = sidebar?.querySelector<HTMLElement>("[data-active=true]");
    if (!sidebar || !link) return;
    const { scrollTop, clientHeight } = sidebar;
    if (link.offsetTop < scrollTop || link.offsetTop > scrollTop + clientHeight - 80) {
      sidebar.scrollTo({ top: link.offsetTop - clientHeight / 3, behavior: "smooth" });
    }
  }, [active]);
  return (
    <div className="guide" id="top">
      <a href="#part-1" className="skip-link">
        {ui.skip}
      </a>
      <SiteHeader active={active} />
      <div className="site-container">
        <Introduction />
        <div className="reading-layout">
          <aside className="contents-sidebar">
            <Contents active={active} />
          </aside>
          <main className="guide-main">
            {guide.parts.map((part) => (
              <section id={part.id} className="guide-part" key={part.id}>
                <header className="part-opener reveal" data-number={formatNumber(part.number)}>
                  <p className="eyebrow">
                    {ui.part} {formatNumber(part.number)}
                  </p>
                  <h2>
                    <DirectionText>{part.title}</DirectionText>
                  </h2>
                </header>
                {part.sections.map((section) => (
                  <Section key={section.id} section={section} />
                ))}
              </section>
            ))}
            <footer className="site-footer" id="references">
              <p>{educationalNote}</p>
              <a href="#top">
                {ui.back}
                <ArrowUp />
              </a>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
