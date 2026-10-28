# Validation copy

Every validation message the UI shows for ANB-1293, in all three target languages. Copied verbatim from the Jira stories; do not paraphrase in generated output.

## Empty mandatory field

Shown below any empty mandatory field on the Specifications page, in any flow (view / create / duplicate / save).

| Lang | Message |
| --- | --- |
| NL | Dit veld is verplicht. |
| FR | Ce champ est obligatoire. |
| EN | This field is required. |

Citations: `ANB-1303 Design & Details`, `ANB-1305 AC5`, `ANB-1347 Design & Details`.

## Duplicate product name within supplier

Shown under the `Productnaam NL` or `Productnaam FR` field when uniqueness fails (case-insensitive, scoped to the selected supplier).

| Lang | Message |
| --- | --- |
| NL | Er bestaat al een product met deze naam voor deze leverancier. |
| FR | Un produit avec ce nom existe déjà pour ce fournisseur. |
| EN | A product with this name already exists for this supplier. |

Citation: `ANB-1358 Design & Details`.

## Rules of use

- The requirements skill lifts these tables into the generated spec's **Validation copy** section verbatim.
- The design skill wires them into the prototype's form validation, keyed by the field + rule, never a hand-typed string in a component.
- When a flow needs a validation message that is not here, that is an `[open]` in the generated spec and a Phase 4 fix to this file — never an invention in the output.
