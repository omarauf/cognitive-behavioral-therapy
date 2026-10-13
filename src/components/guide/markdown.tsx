import {
  Activity,
  BookOpen,
  Compass,
  Footprints,
  Heart,
  History,
  Lightbulb,
  MessageCircle,
  Network,
  Scale,
  Sprout,
  Users,
  Waypoints,
} from "lucide-react";
import { Children, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Separator } from "@/components/ui/separator";
import { arabicNumber } from "@/lib/guide-content";

type TableKind = "approaches" | "distortions" | "model";

function tableRows(source: string) {
  return source
    .split("\n")
    .filter((line) => line.startsWith("| **"))
    .map((line) =>
      line
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.trim().replaceAll("**", "")),
    );
}

/** Isolate Latin terms without changing the Arabic source text. */
export function DirectionText({ children }: { children: ReactNode }) {
  return Children.map(children, (child) => {
    if (typeof child !== "string") return child;
    const fragments: ReactNode[] = [];
    let offset = 0;
    for (const match of child.matchAll(/[A-Za-z][A-Za-z0-9 &'’/:.\-–]*(?:[A-Za-z0-9])?/g)) {
      fragments.push(child.slice(offset, match.index));
      fragments.push(
        <bdi key={match.index} dir="ltr">
          {match[0]}
        </bdi>,
      );
      offset = match.index + match[0].length;
    }
    fragments.push(child.slice(offset));
    return fragments;
  });
}

function ApproachesInfographic({ source }: { source: string }) {
  const icons = [
    Footprints,
    MessageCircle,
    Network,
    History,
    Heart,
    Users,
    Users,
    Users,
    Waypoints,
    BookOpen,
    Compass,
    Scale,
    Sprout,
    Lightbulb,
  ];
  const rows = tableRows(source);
  return (
    <dl className="approaches-map">
      {rows.map(([label, definition], index) => {
        const Icon = icons[index] ?? Activity;
        return (
          <div key={label}>
            <dt>
              <span className="approach-icon">
                <Icon />
              </span>
              <strong>
                <DirectionText>{label}</DirectionText>
              </strong>
            </dt>
            <dd>
              <DirectionText>{definition}</DirectionText>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

function DistortionCards({ source }: { source: string }) {
  return (
    <dl className="distortion-grid">
      {tableRows(source).map(([label, example], index) => {
        const name = /^(.*) \((.*)\)$/.exec(label);
        return (
          <div className="distortion-card" key={label}>
            <dt>
              <h5>{name?.[1] ?? label}</h5>
              {name?.[2] && (
                <bdi className="card-term" dir="ltr">
                  {name[2]}
                </bdi>
              )}
            </dt>
            <dd>
              <DirectionText>{example}</DirectionText>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

function ModelChain({ source }: { source: string }) {
  const rows = tableRows(source);
  return (
    <ol className="model-chain" data-stages={rows.length}>
      {rows.map(([stage, meaning, example]) => {
        const [letter, term] = stage.split(" – ");
        return (
          <li className="model-stage" data-letter={letter} key={stage}>
            <bdi className="stage-letter" dir="ltr">
              {letter}
            </bdi>
            <h5>{meaning}</h5>
            <bdi className="card-term" dir="ltr">
              {term}
            </bdi>
            <p>
              <DirectionText>{example}</DirectionText>
            </p>
          </li>
        );
      })}
    </ol>
  );
}

export function Markdown({ text, tableKind }: { text: string; tableKind?: TableKind }) {
  return (
    <div className="reading-text">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h3: ({ children }) => {
            const heading = Children.toArray(children).join("");
            const number = /^(\d+\.\d+)/.exec(heading)?.[1];
            return (
              <h4 id={number ? `section-${number.replace(".", "-")}` : undefined}>
                <DirectionText>{children}</DirectionText>
              </h4>
            );
          },
          p: ({ children }) => (
            <p>
              <DirectionText>{children}</DirectionText>
            </p>
          ),
          li: ({ children }) => (
            <li>
              <DirectionText>{children}</DirectionText>
            </li>
          ),
          strong: ({ children }) => (
            <strong>
              <DirectionText>{children}</DirectionText>
            </strong>
          ),
          em: ({ children }) => (
            <em>
              <DirectionText>{children}</DirectionText>
            </em>
          ),
          table: ({ children }) => {
            if (tableKind === "approaches") return <ApproachesInfographic source={text} />;
            if (tableKind === "distortions") return <DistortionCards source={text} />;
            if (tableKind === "model") return <ModelChain source={text} />;
            return (
              // biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard users need to scroll wide source tables.
              <div className="table-scroll" tabIndex={0}>
                <table>{children}</table>
              </div>
            );
          },
          th: ({ children }) => (
            <th scope="col">
              <DirectionText>{children}</DirectionText>
            </th>
          ),
          td: ({ children }) => (
            <td>
              <DirectionText>{children}</DirectionText>
            </td>
          ),
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
              <DirectionText>{children}</DirectionText>
            </a>
          ),
          hr: () => <Separator />,
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
