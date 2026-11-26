import { DIFFICULTY_LABELS } from "@/shared/config";
import { Badge, Button, RichText } from "@/shared/ui";
import type { InterviewQuestion } from "../model/types";

export interface InterviewQuestionCardProps {
  question: InterviewQuestion;
  revealed: boolean;
  onToggleReveal: (id: string) => void;
}

export function InterviewQuestionCard({
  question,
  revealed,
  onToggleReveal
}: InterviewQuestionCardProps) {
  return (
    <div className="iq-card" id={question.id} data-difficulty={question.difficulty}>
      <div className="iq-header">
        <div className="iq-q-wrap">
          <Badge variant={question.difficulty}>{DIFFICULTY_LABELS[question.difficulty]}</Badge>
          <span className="iq-question">
            {question.number}. <RichText text={question.question} />
          </span>
        </div>
        <Button
          variant="small"
          className="iq-toggle-btn"
          aria-expanded={revealed}
          onClick={() => onToggleReveal(question.id)}
        >
          {revealed ? "Hide Answer" : "Reveal Answer"}
        </Button>
      </div>

      {revealed ? (
        <div className="iq-answer">
          {question.paragraphs?.map((para, idx) => (
            <p key={idx}>
              {para.label ? <strong>{para.label} </strong> : null}
              <RichText text={para.body} />
            </p>
          ))}

          {question.numberedSteps?.length ? (
            <ol>
              {question.numberedSteps.map((step, idx) => (
                <li key={idx}>
                  <strong>{step.title}</strong> <RichText text={step.body} />
                </li>
              ))}
            </ol>
          ) : null}

          {question.subboxes?.length ? (
            <div className="iq-meta-grid">
              {question.subboxes.map((box, idx) => (
                <div className="iq-subbox" key={idx}>
                  <h5>{box.title}</h5>
                  {box.isCode ? (
                    <code>
                      <RichText text={box.content} />
                    </code>
                  ) : (
                    <p>
                      <RichText text={box.content} />
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
