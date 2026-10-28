// Hardcoded brainstorm sequence for the sandbox prototype.
//
// REALITY CHECK: in production, this file goes away. The real brainstorm
// skill lives in `.claude/skills/peasy-brainstorm/SKILL.md` and the question
// sequence is dynamic — Claude reads the brief + pack and picks what to ask.
// The sandbox stand-in is scripted so the UX flow can be demonstrated without
// a backend.

export type Question = {
  id: string;
  prompt: string;
};

export const questions: ReadonlyArray<Question> = [
  {
    id: 'user',
    prompt:
      "Thanks for the brief. Let me ask a few questions so the spec is sharp.\n\nFirst — who's the primary user? Admin, a consumer, a specific role on your team?",
  },
  {
    id: 'surfaces',
    prompt:
      "Got it. Which surface does this touch? The admin only, the public comparison flow, both, or something else like the \"in vergelijking\" display?",
  },
  {
    id: 'change-shape',
    prompt:
      "Is this a new flow entirely, a change to an existing screen, or just new business rules without a UI change?",
  },
  {
    id: 'jira-epic',
    prompt:
      "Any Jira epic this should be linked to? (For example `ANB-1293` for the Electricity Specifications work.) If you're not sure, type \"open\" and I'll flag it in the ticket.",
  },
  {
    id: 'success-signal',
    prompt:
      "Last one — what tells us this feature worked? A measurable change, a reduction in rework, something a PM would check at the end of the quarter?",
  },
];
