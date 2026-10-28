import { useEffect, useRef } from 'react';
import { Button } from '../../components/Button';
import { ChatBubble } from '../../components/ChatBubble';
import { Textarea } from '../../components/Textarea';
import type { Scenario } from './scenarios/types';
import styles from './ScenarioChat.module.css';

type TabState = {
  briefSent: boolean;
  cursor: number;
  answers: Record<string, string>;
  draft: string;
  done: boolean;
};

type ScenarioChatProps = {
  scenario: Scenario;
  state: TabState;
  onUpdate: (next: Partial<TabState>) => void;
};

export function ScenarioChat({ scenario, state, onUpdate }: ScenarioChatProps) {
  const transcriptRef = useRef<HTMLDivElement | null>(null);
  const currentQ = state.briefSent ? scenario.questions[state.cursor] : null;
  const total = scenario.questions.length;

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [state.cursor, state.briefSent]);

  function submit() {
    const text = state.draft.trim();
    if (!text) return;

    if (!state.briefSent) {
      onUpdate({ briefSent: true, draft: '', cursor: 0 });
      return;
    }

    if (!currentQ) return;
    const nextAnswers = { ...state.answers, [currentQ.id]: text };
    const nextCursor = state.cursor + 1;
    const nextDone = nextCursor >= total;
    onUpdate({
      cursor: nextCursor,
      answers: nextAnswers,
      draft: '',
      done: nextDone,
    });
  }

  const progressLabel = !state.briefSent
    ? 'Describe the feature'
    : currentQ
      ? `Question ${state.cursor + 1} of ${total}`
      : 'All answered';

  const buttonLabel = !state.briefSent
    ? 'Send'
    : state.cursor + 1 === total
      ? 'Finish & draft ticket'
      : 'Send';

  return (
    <div className={styles.chat}>
      <div className={styles.transcript} ref={transcriptRef}>
        <ChatBubble from="ai">
          {state.briefSent
            ? "Thanks — a few follow-ups so the ticket and prototype come out the way you want."
            : "Describe the feature you'd like to build. For this demo the prompt is prefilled — press Enter to send, or edit it first."}
        </ChatBubble>

        {state.briefSent && (
          <ChatBubble from="user">{scenario.vagueBrief}</ChatBubble>
        )}

        {state.briefSent &&
          scenario.questions.slice(0, state.cursor).map((q) => (
            <div key={q.id}>
              <ChatBubble from="ai">{q.prompt}</ChatBubble>
              <ChatBubble from="user">{state.answers[q.id]}</ChatBubble>
            </div>
          ))}

        {currentQ && <ChatBubble from="ai">{currentQ.prompt}</ChatBubble>}
      </div>

      <div className={styles.composer}>
        <Textarea
          value={state.draft}
          onChange={(v) => onUpdate({ draft: v })}
          placeholder="Type your reply… Enter to send, Shift+Enter for a newline."
          rows={3}
          onEnter={submit}
        />
        <div className={styles.composerActions}>
          <span className={styles.progress}>{progressLabel}</span>
          <Button variant="primary" onClick={submit} disabled={!state.draft.trim()}>
            {buttonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
