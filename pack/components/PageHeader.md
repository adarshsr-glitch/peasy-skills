---
name: PageHeader
source: figma-png
peasy_mapping: likely imports as `import { PageHeader } from '~/ui/PageHeader'` or lives at the layout level as `~/layouts/EditCardHeader`; verify via snippet. The Figma shows one treatment for a product-selected edit view and another for create/duplicate; one component with props or two components is open.
---

# PageHeader

The section-title row inside the product edit card. Shows the product's name plus its status badge in the edit flow; shows a different title (`Nieuw product aanmaken` or `Product dupliceren`) in the create and duplicate flows.

## Peasy mapping

| What the prototype imports | What Peasy's code likely calls it |
| --- | --- |
| `<PageHeader title="…" badge={…} actions={…} />` | `<PageHeader />` or `<EditCardHeader />` — depends on scope |

## Observable API (reconstruction)

```ts
type PageHeaderProps = {
  title: string;                       // "ENGIE Basic Online", "Nieuw product aanmaken", "Product dupliceren"
  badge?: ReactNode;                   // Status Badge, shown only in the edit flow
  meta?: ReactNode;                    // "Product ID: 683 | Supplier ID: 5" chip + "Created: …" row
  actions?: ReactNode;                 // Save button (edit flow); hidden in create/duplicate
  variant?: 'edit' | 'create' | 'duplicate';  // inference — differs by what's shown
};
```

Severity:

- `title`: high confidence.
- `badge` as a slot: high confidence for the edit flow; absent in create/duplicate.
- `meta`: medium confidence. The metadata row (Product ID, Supplier ID, Created on) could be part of the header or a separate region.
- `actions`: medium confidence. The Save button could be a header slot or a separate `StickyActionBar` placed near the header.
- `variant` prop: inference. One component with variants vs. three distinct components is unknown.

## Visual treatment

### Edit flow (observed in `ANB-1293-Electricity-Specificaties.png` and `ANB-1293-Electricity-Manage-Specifications.png`)

- Title: product name in large bold text (~`24-28px`, `--ink-strong`).
- Immediately right of title: Status `Badge`.
- Below title row: metadata chip (`Product ID: 683 | Supplier ID: 5`) in `--info-bg` / `--info-fg`.
- Also below title: date row (`Created: 2016-03-31 09:48:12`) with a calendar icon.
- Far right of title row: Save button.
- Divider line below the whole header before fields begin.

### Create flow (`ANB-1293-Electricity-New-Product.png`)

- Title only: `Nieuw product aanmaken` in the same large bold text.
- Supplier shown as a label-value pair above the card (`Leverancier : ENGIE`) — not inside the PageHeader.
- No badge, no metadata, no Save at the header. Save/Cancel sit at the bottom of the card.
- Divider line below the title before fields begin.

### Duplicate flow

Not observed in the current Figma PNGs; `ANB-1347 Design & Details` says "no specific design exists yet; based on New Product screen". Treat as structurally identical to Create with the title `Product dupliceren`.

## Tokens used

| Property | Token |
| --- | --- |
| Title text | `--ink-strong` |
| Title font family | `--font-display` (Grold) |
| Title font size | ~`24-28px` — **inference**; `pack/tokens/typography.md` scale not yet defined |
| Title-to-badge gap | `--space-3` |
| Metadata chip bg | `--info-bg` |
| Metadata chip text | `--info-fg` |
| Metadata chip radius | `--radius-sm` |
| Divider | `--border-subtle` |
| Divider margin | `--space-6` above/below |

## Behavior rules

- Edit flow shows the full header (title + badge + metadata + Save). `[ANB-1298 AC4, ANB-1306 AC1, ANB-1305 AC1]`
- Create flow shows title only; metadata and Save are hidden. `[ANB-1303 AC2]`
- Duplicate flow mirrors Create. `[ANB-1347 AC2]`
- Status badge updates immediately when Status changes and is saved. `[ANB-1306 AC4]`

## Usage rules

- One PageHeader per edit card.
- Title text is the entity's name in the edit flow; a stable section label in create/duplicate.
- Metadata and actions are flow-dependent — the component (or its wrapper) manages the visibility.

## Open questions

- One component with a `variant` prop, or three components (`EditHeader`, `CreateHeader`, `DuplicateHeader`)?
- Does the metadata belong to the header or to a separate `EntityMeta` region?
- Is the top-right Save button a slot on PageHeader or a separate instance of `StickyActionBar`?
- Icon in the date row — is it part of the metadata chip, or a separate `DateStamp` component?

## Evidence

| Observation | Source |
| --- | --- |
| Large bold title + Badge inline | `figma/ANB-1293-Electricity-Specificaties.png` (ENGIE Basic Online + Actief) |
| Metadata chip and date row | `figma/ANB-1293-Electricity-Specificaties.png`, `figma/ANB-1293-Electricity-Manage-Specifications.png` |
| Save button on same row as title | both edit-view PNGs |
| Create flow title only | `figma/ANB-1293-Electricity-New-Product.png` (Nieuw product aanmaken) |
| Duplicate flow follows Create | `pack/rules/anb-1293.md` → `ANB-1347 Design & Details` |
