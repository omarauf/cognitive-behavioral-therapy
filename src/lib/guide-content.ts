export type GuideSection = {
  id: string;
  number: number;
  title: string;
  body: string;
  subsections: { id: string; title: string }[];
};

export type GuidePart = {
  id: string;
  number: number;
  title: string;
  sections: GuideSection[];
};

/** Split the canonical report only at its part and section boundaries. */
export function parseGuide(source: string) {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const parts: GuidePart[] = [];
  let title = "";
  const introduction: string[] = [];
  const references: string[] = [];
  let section: GuideSection | undefined;
  let readingReferences = false;

  for (const line of lines) {
    if (line.startsWith("# ") && !line.startsWith("# الجزء")) {
      title = line.slice(2);
      continue;
    }
    if (line.startsWith("# الجزء")) {
      parts.push({
        id: `part-${parts.length + 1}`,
        number: parts.length + 1,
        title: line.replace(/^# الجزء [^:]+:\s*/, ""),
        sections: [],
      });
      section = undefined;
      continue;
    }
    const sectionHeading = /^## (\d+)\. (.+)$/.exec(line);
    if (sectionHeading) {
      const number = Number(sectionHeading[1]);
      section = {
        id: `section-${number}`,
        number,
        title: sectionHeading[2],
        body: "",
        subsections: [],
      };
      parts.at(-1)?.sections.push(section);
      continue;
    }
    if (line.startsWith("## مراجع")) {
      readingReferences = true;
      section = undefined;
      continue;
    }
    if (readingReferences) {
      references.push(line);
    } else if (section) {
      section.body += `${line}\n`;
      const subsection = /^### (\d+\.\d+) (.+)$/.exec(line);
      if (subsection) {
        section.subsections.push({
          id: `section-${subsection[1].replace(".", "-")}`,
          title: `${subsection[1]} ${subsection[2]}`,
        });
      }
    } else if (parts.length === 0) {
      introduction.push(line);
    }
  }
  return {
    title,
    introduction: introduction.join("\n").trim(),
    parts,
    sections: parts.flatMap((part) => part.sections),
    references: references.join("\n").trim(),
  };
}

export function shortTitle(title: string) {
  return title.replace(/\s*\([^)]*\)/g, "").trim();
}

export function arabicNumber(value: number) {
  return new Intl.NumberFormat("ar-u-nu-arab", { useGrouping: false }).format(value);
}
