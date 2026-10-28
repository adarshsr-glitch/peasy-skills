import { useEffect, useRef } from 'react';
import { Button } from '../../components/Button';
import { ChatBubble } from '../../components/ChatBubble';
import { Textarea } from '../../components/Textarea';
import type { Scenario } from './scenarios/types';
import styles from './ScenarioChat.module.css';

type TabState = {
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
  const currentQ = scenario.questions[state.cursor];

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [state.cursor]);

  function submit() {
    if (!state.draft.trim() || !currentQ) return;
    const nextAnswers = { ...state.answers, [currentQ.id]: state.draft.trim() };
    const nextCursor = state.cursor + 1;
    const nextDone = nextCursor >= scenario.questions.length;
    onUpdate({
      cursor: nextCursor,
      answers: nextAnswers,
      draft: '',
      done: nextDone,
    });
  }

  return (
    <div className={styles.chat}>
      <div className={styles.transcript} ref={transcriptRef}>
        <ChatBubble from="user">{scenario.vagueBrief}</ChatBubble>
        {scenario.questions.slice(0, state.cursor).map((q) => (
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
          placeholder="Type your answer… ⌘/Ctrl + Enter to send."
          rows={3}
          onEnter={submit}
        />
        <div className={styles.composerActions}>
          <span className={styles.progress}>
            {currentQ ? `Question ${state.cursor + 1} of ${scenario.questions.length}` : 'All answered'}
          </span>
          <Button variant="primary" onClick={submit} disabled={!state.draft.trim()}>
            {state.cursor + 1 === scenario.questions.length ? 'Finish & draft ticket' : 'Send'}
          </Button>
        </div>
      </div>
    </div>
  );
}
