import { useEffect, useRef, useState } from 'react';
import { Button } from '../../components/Button';
import { ChatBubble } from '../../components/ChatBubble';
import { Textarea } from '../../components/Textarea';
import { generateJiraMarkdown } from './generateJiraMarkdown';
import { questions } from './questions';
import styles from './BrainstormPage.module.css';

// Peasy mapping: this UI isn't harvested into the pack because the pack
// mirrors Peasy's admin, not KeyValue's internal tooling. If Peasy wants
// to embed the brainstorm flow into their admin, the pattern lands in
// pack/patterns/ at that point.
//
// REALITY CHECK: the chat below is a hardcoded sequence. In production
// the questions are chosen by Claude at runtime by reading the brief
// against the pack. See `questions.ts` for the sandbox stand-in.

type Phase =
  | { kind: 'start' }
  | { kind: 'chat'; brief: string; cursor: number; answers: Record<string, string>; draft: string }
  | { kind: 'done'; brief: string; answers: Record<string, string> };

type BrainstormPageProps = {
  onViewPrototype: () => void;
};

export function BrainstormPage({ onViewPrototype }: BrainstormPageProps) {
  const [phase, setPhase] = useState<Phase>({ kind: 'start' });
  const [startBrief, setStartBrief] = useState('');
  const [copied, setCopied] = useState(false);
  const transcriptRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll the transcript on new messages.
  useEffect(() => {
    if (phase.kind === 'chat' && transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [phase]);

  function handleStart() {
    if (!startBrief.trim()) return;
    setPhase({ kind: 'chat', brief: startBrief.trim(), cursor: 0, answers: {}, draft: '' });
  }

  function handleSubmitAnswer() {
    if (phase.kind !== 'chat' || !phase.draft.trim()) return;
    const currentQ = questions[phase.cursor];
    if (!currentQ) return;
    const nextAnswers = { ...phase.answers, [currentQ.id]: phase.draft.trim() };
    const nextCursor = phase.cursor + 1;
    if (nextCursor >= questions.length) {
      setPhase({ kind: 'done', brief: phase.brief, answers: nextAnswers });
    } else {
      setPhase({ ...phase, cursor: nextCursor, answers: nextAnswers, draft: '' });
    }
  }

  function restart() {
    setPhase({ kind: 'start' });
    setStartBrief('');
    setCopied(false);
  }

  if (phase.kind === 'start') {
    return (
      <div className={styles.page}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Peasy Brainstorm</h1>
          <p className={styles.lede}>
            Describe the feature idea in a few lines. A short back-and-forth will clear up what the brief doesn't say — then we'll draft a Jira-ready ticket.
          </p>
        </div>
        <div className={styles.startCard}>
          <Textarea
            label="Your brief"
            value={startBrief}
            onChange={setStartBrief}
            placeholder="Example: Clean up the Electricity Specifications screen in the admin. It's cluttered, no supplier scoping, no way to duplicate products…"
            rows={6}
            onEnter={handleStart}
          />
          <div className={styles.startActions}>
            <Button variant="primary" onClick={handleStart} disabled={!startBrief.trim()}>
              Start brainstorming
            </Button>
          </div>
        </div>
        <div className={styles.sideLinkRow}>
          <button type="button" className={styles.sideLink} onClick={onViewPrototype}>
            See the ANB-1293 prototype that came from a brief like this →
          </button>
        </div>
      </div>
    );
  }

  if (phase.kind === 'chat') {
    const currentQ = questions[phase.cursor];
    return (
      <div className={styles.page}>
        <div className={styles.chatHeader}>
          <h1 className={styles.chatTitle}>Peasy Brainstorm</h1>
          <span className={styles.progress}>Question {phase.cursor + 1} of {questions.length}</span>
        </div>

        <div className={styles.transcript} ref={transcriptRef}>
          <ChatBubble from="user">{phase.brief}</ChatBubble>
          {questions.slice(0, phase.cursor).map((q) => (
            <div key={q.id}>
              <ChatBubble from="ai">{q.prompt}</ChatBubble>
              <ChatBubble from="user">{phase.answers[q.id]}</ChatBubble>
            </div>
          ))}
          {currentQ && <ChatBubble from="ai">{currentQ.prompt}</ChatBubble>}
        </div>

        <div className={styles.composer}>
          <Textarea
            value={phase.draft}
            onChange={(next) => setPhase({ ...phase, draft: next })}
            placeholder="Type your answer… ⌘/Ctrl + Enter to send."
            rows={3}
            onEnter={handleSubmitAnswer}
          />
          <div className={styles.composerActions}>
            <Button variant="ghost" onClick={restart}>Start over</Button>
            <Button variant="primary" onClick={handleSubmitAnswer} disabled={!phase.draft.trim()}>
              {phase.cursor + 1 === questions.length ? 'Finish & draft ticket' : 'Send'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // phase.kind === 'done'
  const markdown = generateJiraMarkdown({
    brief: phase.brief,
    user: phase.answers.user ?? '',
    surfaces: phase.answers.surfaces ?? '',
    'change-shape': phase.answers['change-shape'] ?? '',
    'jira-epic': phase.answers['jira-epic'] ?? '',
    'success-signal': phase.answers['success-signal'] ?? '',
  });

  async function copyMarkdown() {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard refused — select the pre element so the user can copy manually.
      const pre = document.querySelector(`.${styles.markdownPre}`);
      if (pre) {
        const range = document.createRange();
        range.selectNodeContents(pre);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.doneHeader}>
        <div>
          <h1 className={styles.title}>Jira ticket drafted</h1>
          <p className={styles.lede}>
            Paste into Jira as the ticket body. Review `[open]` items before closing — the brainstorm never invents rules or copy.
          </p>
        </div>
        <div className={styles.doneActions}>
          <Button variant="ghost" onClick={restart}>New brief</Button>
          <Button variant="primary" onClick={copyMarkdown}>
            {copied ? 'Copied ✓' : 'Copy Jira markdown'}
          </Button>
        </div>
      </div>

      <pre className={styles.markdownPre}>{markdown}</pre>

      <div className={styles.sideLinkRow}>
        <button type="button" className={styles.sideLink} onClick={onViewPrototype}>
          See a Peasy-styled prototype that would come from a spec like this →
        </button>
      </div>
    </div>
  );
}
