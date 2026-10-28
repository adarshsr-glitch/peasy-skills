import { useEffect, useRef } from 'react';
import { useLang } from '../../i18n';
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
  const { lang, t } = useLang();
  const transcriptRef = useRef<HTMLDivElement | null>(null);
  const composerRef = useRef<HTMLDivElement | null>(null);
  const currentQ = state.briefSent ? scenario.questions[state.cursor] : null;
  const total = scenario.questions.length;
  const briefPrefilled = scenario.vagueBrief[lang].trim() !== '';

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
    composerRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
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
    ? t('chat.describe')
    : currentQ
      ? t('chat.question-of', { n: state.cursor + 1, total })
      : t('chat.all-answered');

  const buttonLabel = !state.briefSent
    ? t('chat.send')
    : state.cursor + 1 === total
      ? t('chat.finish')
      : t('chat.send');

  return (
    <div className={styles.chat}>
      <div className={styles.transcript} ref={transcriptRef}>
        <ChatBubble from="ai">
          {state.briefSent
            ? t('chat.greeting')
            : briefPrefilled
              ? t('chat.intro')
              : t('chat.intro-blank')}
        </ChatBubble>

        {state.briefSent && (
          <ChatBubble from="user">{scenario.vagueBrief[lang]}</ChatBubble>
        )}

        {state.briefSent &&
          scenario.questions.slice(0, state.cursor).map((q) => (
            <div key={q.id}>
              <ChatBubble from="ai">{q.prompt[lang]}</ChatBubble>
              <ChatBubble from="user">{state.answers[q.id]}</ChatBubble>
            </div>
          ))}

        {currentQ && (
          <ChatBubble
            from="ai"
            suggestions={currentQ.suggestions?.[lang]}
            onSuggestionClick={(text) => onUpdate({ draft: text })}
          >
            {currentQ.prompt[lang]}
          </ChatBubble>
        )}
      </div>

      <div className={styles.composer} ref={composerRef}>
        <Textarea
          value={state.draft}
          onChange={(v) => onUpdate({ draft: v })}
          placeholder={t('chat.placeholder')}
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
