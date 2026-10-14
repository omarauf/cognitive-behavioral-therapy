import { MessageSquare, Play } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { useGuideContent } from "@/lib/guide-locale";
import { DirectionText } from "./markdown";

export function MessageExample() {
  const { message } = useGuideContent();
  return (
    <figure className="message-example">
      <div className="message-event">
        <span className="example-icon">
          <MessageSquare />
        </span>
        <div>
          <span className="example-label">{message.label}</span>
          <h2>{message.event}</h2>
        </div>
      </div>
      <div className="message-branches">
        <div>
          <span className="branch-marker" />
          <span className="example-label">{message.interpretation}</span>
          <h3>{message.first}</h3>
          <p>{message.firstResult}</p>
        </div>
        <div>
          <span className="branch-marker" />
          <span className="example-label">{message.alternative}</span>
          <h3>{message.second}</h3>
          <p>{message.secondResult}</p>
        </div>
      </div>
      <figcaption>{message.caption}</figcaption>
    </figure>
  );
}

/**
 * The avoidance loop. Readers can tap a step, or trace the whole loop once:
 * each step lights up in turn and the arrow to the next step is drawn.
 */
export function AvoidanceDiagram() {
  const { avoidanceSteps, avoidanceTitle, avoidancePlay } = useGuideContent();
  const arrowId = useId();
  const [step, setStep] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);

  // Advance one step at a time while tracing; stop on the last step so the loop visibly closes.
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(
      () => {
        if (step === avoidanceSteps.length - 1) setPlaying(false);
        else setStep((step ?? -1) + 1);
      },
      step === null ? 0 : 1100,
    );
    return () => window.clearTimeout(timer);
  }, [playing, step, avoidanceSteps.length]);

  return (
    <div className="avoidance-diagram">
      <div className="avoidance-ring" data-has-step={step !== null}>
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
          {/* Faint dotted track that drifts in the loop's direction (top, then left, ...). */}
          <path
            className="avoidance-track"
            d="M300 90 A210 210 0 1 0 300 510 A210 210 0 1 0 300 90"
          />
          <g markerEnd={`url(#${arrowId})`}>
            {/* Arrow i leads from step i to the next one. */}
            {[0, 72, 144, 216, 288].map((angle, index) => (
              <path
                key={step === index ? `${angle}-lit` : angle}
                className={step === index ? "is-lit" : undefined}
                pathLength={1}
                d="M208 111 A210 210 0 0 0 149 154"
                transform={`rotate(-${angle} 300 300)`}
              />
            ))}
          </g>
        </svg>
        <ol className="avoidance-flow">
          {avoidanceSteps.map((item, index) => (
            <li key={item.id} data-active={step === index}>
              <button
                type="button"
                onClick={() => {
                  setPlaying(false);
                  setStep((current) => (current === index ? null : index));
                }}
              >
                <strong>
                  <span className={item.shortLabel ? "avoidance-full-label" : undefined}>
                    {item.label}
                  </span>
                  {item.shortLabel && (
                    <span className="avoidance-short-label">{item.shortLabel}</span>
                  )}
                </strong>
                <span className="step-text">{item.text}</span>
              </button>
            </li>
          ))}
        </ol>
        <span className="avoidance-center">{avoidanceTitle}</span>
      </div>
      <div className="diagram-actions">
        <Button
          variant="outline"
          disabled={playing}
          onClick={() => {
            setStep(null);
            setPlaying(true);
          }}
        >
          <Play data-icon="inline-start" />
          {avoidancePlay}
        </Button>
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

type CognitiveNode = "thought" | "emotion" | "behavior" | "body";

/**
 * The four-part cognitive model. Selecting a part highlights it and lights the
 * connectors that touch it; the centre ripples to show the influence is mutual.
 */
export function CognitiveDiagram() {
  const { cognitive } = useGuideContent();
  const [active, setActive] = useState<CognitiveNode | null>(null);

  const node = (id: CognitiveNode, label: string, title: string, detail?: string) => (
    <button
      type="button"
      className="model-node"
      data-active={active === id}
      data-muted={active !== null && active !== id}
      onClick={() => setActive((current) => (current === id ? null : id))}
    >
      <span>{label}</span>
      <strong>{title}</strong>
      {detail && <span className="node-detail">{detail}</span>}
    </button>
  );
  // Keyed on the selection so the nudge animation replays each time it lights up.
  const link = (from: CognitiveNode, to: CognitiveNode, symbol: string, order: number) => {
    const lit = active === from || active === to;
    return (
      <span
        key={lit ? `${from}-${to}-${active}` : `${from}-${to}`}
        className="connection"
        data-lit={lit}
        style={{ animationDelay: `${order * 0.6}s` }}
      >
        {symbol}
      </span>
    );
  };

  return (
    <figure className="cognitive-diagram reveal">
      <div className="situation">
        <div>
          <span>{cognitive.situation}</span>
          <strong>{cognitive.event}</strong>
        </div>
      </div>
      <div className="cognitive-network">
        {node("thought", cognitive.thoughts, cognitive.thought, cognitive.thoughtDetail)}
        {link("thought", "emotion", "↔", 0)}
        {node("emotion", cognitive.feelings, cognitive.emotion)}
        {link("thought", "behavior", "↕", 3)}
        <span key={active ?? "idle"} className="mutual" data-rippling={active !== null}>
          {cognitive.mutual}
        </span>
        {link("emotion", "body", "↕", 1)}
        {node("behavior", cognitive.behavior, cognitive.action, cognitive.actionDetail)}
        {link("behavior", "body", "↔", 2)}
        {node("body", cognitive.body, cognitive.response, cognitive.responseDetail)}
      </div>
      <figcaption>{cognitive.hint}</figcaption>
    </figure>
  );
}

export function WavesDiagram() {
  const { waves } = useGuideContent();
  return (
    <div className="waves-diagram reveal">
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
