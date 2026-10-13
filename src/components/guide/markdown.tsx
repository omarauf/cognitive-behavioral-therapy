import { Children, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Separator } from "@/components/ui/separator";

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

export function Markdown({ text }: { text: string }) {
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
          table: ({ children }) => (
            // biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard users need to scroll wide source tables.
            <div className="table-scroll" tabIndex={0}>
              <table>{children}</table>
            </div>
          ),
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
