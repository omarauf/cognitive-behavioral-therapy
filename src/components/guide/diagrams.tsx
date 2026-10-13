import { MessageSquare } from "lucide-react";
import { useId } from "react";
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

export function AvoidanceDiagram() {
  const { avoidanceSteps, avoidanceTitle } = useGuideContent();
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
              <strong>
                <span className={step.shortLabel ? "avoidance-full-label" : undefined}>
                  {step.label}
                </span>
                {step.shortLabel && (
                  <span className="avoidance-short-label">{step.shortLabel}</span>
                )}
              </strong>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <span className="avoidance-center">{avoidanceTitle}</span>
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

export function CognitiveDiagram() {
  const { cognitive } = useGuideContent();
  return (
    <figure className="cognitive-diagram">
      <div className="situation">
        <div>
          <span>{cognitive.situation}</span>
          <strong>{cognitive.event}</strong>
        </div>
      </div>
      <div className="cognitive-network">
        <div className="model-node">
          <span>{cognitive.thoughts}</span>
          <strong>{cognitive.thought}</strong>
          <p>{cognitive.thoughtDetail}</p>
        </div>
        <span className="connection">↔</span>
        <div className="model-node">
          <span>{cognitive.feelings}</span>
          <strong>{cognitive.emotion}</strong>
        </div>
        <span className="connection vertical">↕</span>
        <span className="mutual">{cognitive.mutual}</span>
        <span className="connection vertical">↕</span>
        <div className="model-node">
          <span>{cognitive.behavior}</span>
          <strong>{cognitive.action}</strong>
          <p>{cognitive.actionDetail}</p>
        </div>
        <span className="connection">↔</span>
        <div className="model-node">
          <span>{cognitive.body}</span>
          <strong>{cognitive.response}</strong>
          <p>{cognitive.responseDetail}</p>
        </div>
      </div>
    </figure>
  );
}

export function WavesDiagram() {
  const { waves } = useGuideContent();
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
