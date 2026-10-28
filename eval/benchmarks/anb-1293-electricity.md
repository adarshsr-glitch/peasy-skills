# Benchmark — ANB-1293 Electricity Product Specifications

Frozen scope and reference material for the first benchmark run. The pipeline must reproduce this feature from a deliberately vague brief.

Source: `/Users/adarsh/Downloads/Peasy/ANB-1293 Energy - New Engine Admin- Electricity Product Specifications/`
Jira epic: ANB-1293 (status: Done)
Figma root: https://www.figma.com/design/yiopXhxgrGlkKPXyq3UDvk/Peasy---Design?node-id=5569-2569

## In scope

The **Specifications** tab inside the New Engine Admin's Electricity section. Admin flow only — no public-facing surface.

Stories carried in the benchmark:

| Ticket | Covers |
| --- | --- |
| ANB-1298 | View and select electricity products |
| ANB-1303 | Create a new electricity product |
| ANB-1304 | Manage product specifications |
| ANB-1305 | Save specifications |
| ANB-1306 | Manage product status |
| ANB-1307 | Empty state when no supplier selected |
| ANB-1308 | Prepare page for multilingual support (NL / FR / EN) |
| ANB-1347 | Duplicate electricity product |
| ANB-1358 | Validate product name uniqueness per supplier |

Design/task tickets informing the current Figma: ANB-1296, ANB-1314, ANB-1348.

## Out of scope

The three other Electricity tabs — Product tariffs (Energiekost), Distribution tariffs (Nettarieven), Taxes (Heffingen en toeslagen) — plus the Gas section entirely. Supplier management (ANB-1045) is a dependency, not an output.

## The three user flows

1. **Edit flow.** Admin picks supplier → picks product → specifications load → edits fields → saves.
2. **Create flow.** Admin picks supplier → clicks "Nieuw product" → creation view opens → fills all mandatory fields → clicks "Product aanmaken" → new product is auto-selected.
3. **Duplicate flow.** Admin has a product selected → clicks "Dupliceer product" → duplication view opens with fields prefilled (except NL/FR names and "Toon in vergelijking" which reset) → fills remaining fields → clicks "Product dupliceren" → duplicate is auto-selected.

Each creation path also offers Cancel ("Annuleren"), which returns to the previous state with no save.

## Page surfaces (progressive disclosure)

| State | Supplier dd | Product dd | Nieuw product | Dupliceer | Save | Metadata | Spec fields |
| --- | --- | --- | --- | --- | --- | --- | --- |
| No supplier | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Supplier selected | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Product selected | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

No placeholder message in the empty state.

## Specification fields (17, all mandatory)

Order matches ANB-1304 AC1.

1. Productnaam NL
2. Productnaam FR
3. Status
4. Toon in vergelijking
5. Tarieftype
6. Metertype
7. Commissie
8. Online contract
9. Klantendienst
10. Situatie
11. Klantsegment
12. Betaalmethoden
13. Groene energie
14. Regio
15. Contractduur — numeric only
16. Indexeringsperiode — numeric only
17. Verwerkingslink NL / FR

Option values, checkboxes, and radio sets are defined in Figma, not in the Jira text. The design skill must read Figma for these — the pack cannot infer them.

Metadata displayed read-only on the product edit view: Product ID, Supplier ID, Created on, Last updated.

## Load-bearing business rules

Each rule carries its citing ticket.

- `ANB-1298` Products listed in the product dropdown are restricted to the selected supplier.
- `ANB-1303` All 17 specification fields are mandatory for creation.
- `ANB-1303` Supplier is read-only during creation; it cannot be changed from the supplier the admin selected before clicking "Nieuw product".
- `ANB-1303` Refreshing during creation behaves exactly like Cancel.
- `ANB-1305` Save actions appear both at the top and bottom of the page and perform the same operation.
- `ANB-1305` Saving updates `Last updated` on the selected product only.
- `ANB-1306` Status values: `Actief` (green badge), `Niet actief` (light grey badge).
- `ANB-1306` When Status is `Niet actief`, `Toon in vergelijking` is forced to `Nee` and locked (cannot be edited).
- `ANB-1306` Product dropdown entries are colored by status.
- `ANB-1347` Duplication prefills every spec field from the source product except `Productnaam NL`, `Productnaam FR` (both reset to empty) and `Toon in vergelijking` (reset to `Nee`).
- `ANB-1347` Supplier is read-only during duplication; it cannot be changed.
- `ANB-1347` Refreshing during duplication behaves exactly like Cancel.
- `ANB-1358` Product names are unique per supplier, case-insensitive. The same name may be reused across different suppliers.
- `ANB-1358` Uniqueness is enforced on create, duplicate, and save.
- `ANB-1358` Uniqueness applies regardless of status.
- `ANB-1308` Every UI label on the page is translation-ready for NL / FR / EN. The first build is NL-only; FR and EN labels follow the same key structure.

## Validation copy

Mandatory field empty (any field, any flow):

| Lang | Message |
| --- | --- |
| NL | Dit veld is verplicht. |
| FR | Ce champ est obligatoire. |
| EN | This field is required. |

Duplicate product name within supplier:

| Lang | Message |
| --- | --- |
| NL | Er bestaat al een product met deze naam voor deze leverancier. |
| FR | Un produit avec ce nom existe déjà pour ce fournisseur. |
| EN | A product with this name already exists for this supplier. |

## Reference material on disk

| Figma / Doc | Purpose |
| --- | --- |
| `figma/ANB-1293-Electricity-Specificaties.png` | Edit view — selected product |
| `figma/ANB-1293-Electricity-Manage-Specifications.png` | Edit view variant — field detail |
| `figma/ANB-1293-Electricity-New-Product.png` | Create view |
| `ANB-1293-epic-and-stories.docx` | Full epic + 9 story ACs + 3 design tasks |

The Duplicate view has no dedicated Figma — ANB-1347 explicitly notes "no specific design exists yet; the duplication view will be similar to the New Product screen." The design skill will reuse that pattern.

## What the pipeline must produce

Starting from a two-line brief ("Build the admin screen that lets Peasy staff manage electricity products per supplier") plus the enriched brief that the Brainstorm skill fills, the box must emit:

- A Jira-ready markdown document covering all 9 stories' acceptance criteria, every rule above cited by ticket, every validation message in NL/FR/EN, and the surface-state matrix.
- A working prototype of the three flows that imports Peasy's real components, uses Peasy's tokens and typography, and matches the Figma reference within the rubric's visual-fidelity threshold.
- A deviations log naming anything the pack could not resolve.

This file is the acceptance target. If the pipeline's output omits something listed here, that is a Phase 4 fix at the pack or skill layer, not an output edit.
