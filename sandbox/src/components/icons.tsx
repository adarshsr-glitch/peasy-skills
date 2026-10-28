// Minimal inline SVG icons for the sandbox. Not from the pack —
// Peasy mapping: Peasy's own icon set replaces these on port.

export function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function DuplicateIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 10V3a1 1 0 0 1 1-1h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function SaveIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 2h8l2 2v10H3V2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M5 2v4h5V2M5 10h6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 6h10M5 2v2M9 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
