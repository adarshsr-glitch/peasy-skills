# Specification — Electricity Products Admin (ANB-1293)

> Produced by `peasy-requirements` from `enriched.md` + `pack/rules/anb-1293.md` + `pack/terminology/`. Every rule carries an ANB citation or is marked `[open]`. Paste into Jira; review `[open]` items before closing the epic.

## ⚠️ Open items (resolve before merge)

Four `[open]` items from the enriched brief are not resolved by any ANB ticket. They need a PM / designer call:

1. "Feel like Peasy" scope — motion, micro-copy, illustrated empty states, or purely visual-token conformance?
2. Legacy screen URL — reuse same route, or add a redirect on first ship?
3. Analytics / event tracking on create / duplicate / save.
4. Keyboard shortcuts / power-user affordances.

The spec below delivers everything Jira does resolve; the four opens are flagged inline in **Open questions** at the bottom.

## Summary

Redesign the Electricity Specifications tab inside the New Engine Admin so admins can select a supplier, view and edit that supplier's electricity products, create new products, duplicate existing ones, and save with per-supplier name uniqueness. Obsolete fields from the legacy screen are removed; status is managed through a single `Status` field with downstream visibility rules; the page structure is translation-ready for NL / FR / EN.

## Scope

### In scope

- Supplier selection on the Specifications tab (`ANB-1298`).
- Product selection scoped to the chosen supplier (`ANB-1298`).
- Display and edit of the 17 approved specification fields (`ANB-1304`).
- Save behavior at top and bottom of the page, per-product update (`ANB-1305`).
- Status badge and `Toon in vergelijking` locking rules (`ANB-1306`).
- Empty-state progressive disclosure before supplier selection (`ANB-1307`).
- Multilingual-ready label structure, NL first (`ANB-1308`).
- Create flow via "Nieuw product" (`ANB-1303`).
- Duplicate flow via "Dupliceer product" (`ANB-1347`).
- Per-supplier product name uniqueness, case-insensitive (`ANB-1358`).

### Out of scope (`ANB-1293 Scope & Impact`)

- Product tariffs tab (Energiekost).
- Distribution tariffs tab (Nettarieven).
- Taxes tab (Heffingen en toeslagen).
- Gas section (any tab).

## User stories

As an **admin**, I want to **select a supplier and one of its electricity products** so that **I only see products relevant to the supplier I'm managing**. `[ANB-1298]`

As an **admin**, I want to **create a new electricity product for a selected supplier** so that **the catalog can grow without leaving the Specifications tab**. `[ANB-1303]`

As an **admin**, I want to **edit the 17 specification fields on a selected product** so that **product configuration stays current with the business**. `[ANB-1304]`

As an **admin**, I want to **save my edits via a Save action at the top or bottom of the page** so that **I can save without scrolling**. `[ANB-1305]`

As an **admin**, I want **product status to drive its visibility in comparison** so that **inactive products are never offered to consumers**. `[ANB-1306]`

As an **admin landing on the Specifications tab**, I want **only the supplier selector visible until I choose one** so that **the screen is not noisy before I've narrowed context**. `[ANB-1307]`

As an **admin**, I want to **duplicate an existing product and tweak it** so that **I don't re-enter 15 identical fields when launching a sibling product**. `[ANB-1347]`

As an **admin**, I want **product names to be unique within a supplier** so that **two products with the same label cannot be confused in the catalog**. `[ANB-1358]`

As a **future translator**, I want **every label and UI text to be swappable without structural changes** so that **FR and EN roll out without re-engineering the page**. `[ANB-1308]`

## Acceptance criteria

### Supplier and product selection — `ANB-1298`

```gherkin
Given the admin accesses the Electricity Specifications page
When the page is displayed
Then a supplier selector dropdown labeled "Leverancier" must be visible
```

```gherkin
Given a supplier is selected
When the page is displayed
Then a product dropdown labeled "Product" must be visible
  And only the products belonging to the selected supplier must be available for selection
```

```gherkin
Given the product dropdown is displayed
When the admin selects a product
Then all stored product information must be loaded into the specification fields
```

```gherkin
Given a product is selected
When the product information is loaded
Then the following metadata must be visible read-only:
  | Product ID | Supplier ID | Created on | Last updated |
```

```gherkin
Given the supplier or product dropdown is displayed
When the admin interacts with it
Then it must follow the Dropdown Guidelines referenced in ANB-1298 AC5
```

### Create flow — `ANB-1303`

```gherkin
Given a supplier is selected
When the admin clicks "Nieuw product"
Then the page must switch to the product creation view
```

```gherkin
Given the product creation view is displayed
Then the following elements must be visible:
  - Title "Nieuw product aanmaken"
  - Selected supplier as read-only text
  - All 17 product specification fields
  - "Annuleren" button
  - "Product aanmaken" button
And the following must be hidden:
  - Product dropdown
  - Product status, Product ID, Supplier ID
  - Created on and Last updated
  - Duplicate action
  - Save actions
```

```gherkin
Given the product creation view is displayed
When all 17 fields are completed
And the admin clicks "Product aanmaken"
Then the product must be created
  And the product must be linked to the selected supplier
  And a Product ID must be generated
  And a Created on date must be generated
  And the product must become available in the product dropdown
```

```gherkin
Given the admin attempts to create a product
When one or more fields are empty
Then the product must not be created
  And the empty mandatory fields must be highlighted
  And the message "Dit veld is verplicht." must appear below each empty field
```

```gherkin
Given a product has been created successfully
When the creation process completes
Then the new product must be automatically selected
  And product metadata must display
  And Save actions must become available
  And "Dupliceer product" must become available
```

```gherkin
Given the product creation view is displayed
When the admin clicks "Annuleren"
Then no product must be created
  And no data must be saved
  And the page must return to the state active before "Nieuw product" was clicked
```

```gherkin
Given the product creation view is displayed
When the admin refreshes the page
Then the result must be identical to clicking "Annuleren"
```

### Manage and save specifications — `ANB-1304`, `ANB-1305`

```gherkin
Given an electricity product is selected
When the Specifications page is displayed
Then the 17 specification fields must be visible in the display order below:
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
  15. Contractduur
  16. Indexeringsperiode
  17. Verwerkingslink NL / FR
```

```gherkin
Given an existing product is selected
When the Specifications page is displayed
Then all stored values must be loaded into the corresponding fields
```

```gherkin
Given a product is selected
When the admin edits any specification field
Then the field value must be modifiable
```

```gherkin
Given the Specifications page is displayed
When the admin interacts with "Contractduur" or "Indexeringsperiode"
Then only numeric input must be accepted
```

```gherkin
Given a product is selected
When the Specifications page is displayed
Then a Save action must be available at both the top and bottom of the page
  And both save actions must perform identical operations
```

```gherkin
Given a product is selected
When the admin modifies specification fields and clicks Save
Then the changes must be saved
  And the Last updated field must reflect the save time
```

```gherkin
Given the admin saves changes
When one or more mandatory fields are empty
Then the save must not proceed
  And the empty fields must be highlighted
  And the message "Dit veld is verplicht." must appear below each empty field
```

```gherkin
Given a product is saved
When the product is reloaded or selected again
Then the saved values must be displayed
```

```gherkin
Given multiple products exist in the system
When the admin saves changes to the selected product
Then only the selected product must be updated
```

### Status and visibility — `ANB-1306`

```gherkin
Given a product is selected
When the Specifications page is displayed
Then the product status badge must appear next to the product name
  And the badge color must be green when Status is "Actief"
  And the badge color must be light grey when Status is "Niet actief"
```

```gherkin
Given the product dropdown is displayed
When it is opened
Then products with Status "Actief" must be shown in green
  And products with Status "Niet actief" must be shown in light grey
```

```gherkin
Given the admin updates the Status field
When the changes are saved
Then the displayed status badge must update to reflect the new value
```

```gherkin
Given a product has Status "Niet actief"
When the Specifications page is displayed
Then "Toon in vergelijking" must be automatically set to "Nee"
  And the radio must be locked and cannot be changed by the admin
```

### Empty state and progressive disclosure — `ANB-1307`

```gherkin
Given the user lands on the Electricity Specifications page
When no supplier has been selected
Then only the supplier selector must be visible
  And no placeholder message must be shown
```

```gherkin
Given the page is in the empty state
When the admin selects a supplier
Then the product selector must appear
  And the "Nieuw product" action must appear
```

```gherkin
Given a supplier is selected
When the admin selects a product
Then product metadata, specification fields, "Dupliceer product", and Save actions must all appear
```

### Duplicate flow — `ANB-1347`

```gherkin
Given an electricity product is selected
When the admin clicks "Dupliceer product"
Then the product duplication view must be displayed
```

```gherkin
Given the product duplication view is displayed
Then the following elements must be visible:
  - Title "Product dupliceren"
  - Selected supplier as read-only text
  - All 17 specification fields
  - "Annuleren" button
  - "Product dupliceren" button
And the following must be hidden:
  - Product dropdown
  - Product status, Product ID, Supplier ID
  - Created on and Last updated
  - Duplicate action
  - Save actions
```

```gherkin
Given the product duplication view is displayed
When the page is shown
Then all specification fields from the source product must be prefilled
  Except:
    | Productnaam NL         | empty         |
    | Productnaam FR         | empty         |
    | Toon in vergelijking   | "Nee"         |
```

```gherkin
Given the product duplication view is displayed
When all mandatory fields are completed
And the admin clicks "Product dupliceren"
Then a new product must be created linked to the selected supplier
  And a Product ID must be generated
  And a Created on date must be generated
  And the duplicated product must become available in the product dropdown
```

```gherkin
Given the admin attempts to duplicate a product
When one or more mandatory fields are empty
Then the duplicate must not be created
  And the invalid fields must be highlighted
  And the message "Dit veld is verplicht." must appear below each empty field
```

```gherkin
Given a product has been duplicated successfully
When the duplication process completes
Then the duplicated product must be automatically selected
  And metadata must display
  And Save actions must become available
  And "Dupliceer product" must become available
```

```gherkin
Given the product duplication view is displayed
When the admin clicks "Annuleren" or refreshes the page
Then no duplicate must be created
  And the page must return to the state before "Dupliceer product" was clicked
```

### Product name uniqueness — `ANB-1358`

```gherkin
Given a product is being created, duplicated, or saved
When the Productnaam NL or Productnaam FR is evaluated against existing products of the same supplier
Then duplicate names must not be allowed
  And the comparison must be case-insensitive
  And the uniqueness rule must apply regardless of status
  And product names may be reused across different suppliers
```

```gherkin
Given a duplicate product name exists for the selected supplier
When the admin attempts to create, duplicate, or save
Then the action must not complete
  And the Product Name field must be highlighted
  And the message "Er bestaat al een product met deze naam voor deze leverancier." must appear
```

### Multilingual readiness — `ANB-1308`

```gherkin
Given the Specifications page is implemented
When any label or UI text is rendered
Then it must come from a translation key that supports NL / FR / EN
  And future translations must be added without structural page changes
```

## Business rules

Every rule below is lifted from `pack/rules/anb-1293.md` with its citation preserved. The requirements skill never invents a rule; if a behavior is wanted that is not here, it is `[open]`.

### Entity model
- An electricity product belongs to exactly one supplier. `[ANB-1293]`
- Each product has 17 specification fields plus metadata (Product ID, Supplier ID, Created on, Last updated). `[ANB-1298 AC4, ANB-1304 AC1]`

### Field discipline
- All 17 specification fields are mandatory. `[ANB-1304 AC1, ANB-1304 AC4]`
- `Contractduur` and `Indexeringsperiode` accept numeric values only. `[ANB-1304 AC4]`
- Fields removed from the legacy screen stay removed; no obsolete fields reappear. `[ANB-1304 Notes]`

### Status and visibility
- Status values are `Actief` (badge green) and `Niet actief` (badge light grey). `[ANB-1306 AC2]`
- When Status is `Niet actief`, `Toon in vergelijking` is auto-set to `Nee` and the radio is locked. `[ANB-1306 AC5]`
- Product dropdown items are colored by Status. `[ANB-1306 AC3]`

### Uniqueness
- Product names are unique per supplier, case-insensitive. `[ANB-1358 AC1]`
- The same product name may exist across different suppliers. `[ANB-1358 Notes]`
- Uniqueness is enforced on create, duplicate, and save. `[ANB-1358 AC2]`
- Uniqueness applies regardless of status. `[ANB-1358 Notes]`

### Supplier binding
- Product dropdown lists only products belonging to the selected supplier. `[ANB-1298 AC2]`
- Supplier is read-only during create and duplicate flows. `[ANB-1303 AC3, ANB-1347 AC4]`
- The feature depends on the Supplier screen epic `ANB-1045`. `[ANB-1293 Dependencies]`

### Save
- Save actions appear at both the top and bottom of the page and perform the same operation. `[ANB-1305 AC1]`
- Save updates only the currently selected product. `[ANB-1305 AC4]`
- Save updates `Last updated` on the selected product. `[ANB-1305 AC6]`

### Create and duplicate shared behavior
- Refreshing during create or duplicate behaves exactly like `Annuleren`. `[ANB-1303 Notes, ANB-1347 Notes]`
- After successful create / duplicate, the new product is auto-selected and all product-level controls re-enable. `[ANB-1303 AC6, ANB-1347 AC7]`

### Multilingual readiness
- Every label and UI text is translation-ready for NL / FR / EN. `[ANB-1308 AC1]`
- First build is NL only. `[ANB-1308 AC2]`

## Validation copy

Lifted verbatim from `pack/terminology/validation.md`. Do not paraphrase in generated code.

### Empty mandatory field

| Lang | Message |
| --- | --- |
| NL | Dit veld is verplicht. |
| FR | Ce champ est obligatoire. |
| EN | This field is required. |

Citations: `ANB-1303 Design & Details`, `ANB-1305 AC5`, `ANB-1347 Design & Details`.

### Duplicate product name within supplier

| Lang | Message |
| --- | --- |
| NL | Er bestaat al een product met deze naam voor deze leverancier. |
| FR | Un produit avec ce nom existe déjà pour ce fournisseur. |
| EN | A product with this name already exists for this supplier. |

Citation: `ANB-1358 Design & Details`.

## Edge cases

- **Refresh during create.** Behaves as `Annuleren`. `[ANB-1303 Notes]`
- **Refresh during duplicate.** Behaves as `Annuleren`. `[ANB-1347 Notes]`
- **Changing supplier while a product is selected.** Clears the selected product; page returns to `supplier-selected` state. `[Derived from ANB-1307 state matrix in pack/patterns/anb-1293-states.md]`
- **Concurrent edits by two admins.** Not addressed in any ANB ticket. `[open]`
- **Deleted supplier referenced by existing products.** Not addressed in any ANB ticket; depends on `ANB-1045` behavior. `[open]`
- **Product saved with Status `Niet actief` where `Toon in vergelijking` was `Ja` before.** Handled: on save, `Toon in vergelijking` is reset to `Nee` and locked. `[ANB-1306 AC5]`

## Open questions

Carried from `enriched.md`. These require PM / designer call before development begins:

1. **"Feel like Peasy" scope.** Visual-token conformance alone, or does it include motion, illustrated empty states, warm micro-copy for admin surfaces? `[open]`
2. **Legacy screen URL.** Reuse the same route, or redirect from the old URL on first ship? `[open]`
3. **Analytics / event tracking** on create, duplicate, and save. Not in any ticket. `[open]`
4. **Keyboard shortcuts** / power-user affordances. Not in any ticket. `[open]`
5. **Concurrent edits** — optimistic locking, last-write-wins, or a warning banner? `[open]`
6. **Deleted-supplier handling** for products with that supplier ID. `[open]`

## Dependencies

- `ANB-1045` — Supplier screen epic. Products require a supplier to exist in the system. `[ANB-1293 Dependencies]`
- Frontend dropdown behavior per the Peasy Dropdown Guidelines. `[ANB-1298 AC5]` — https://verzekeringen.atlassian.net/wiki/x/AQCjHw

## Technical references

- Frontend Technical Documents are linked per child ticket in `pack/rules/anb-1293.md`.
- Figma root: https://www.figma.com/design/yiopXhxgrGlkKPXyq3UDvk/Peasy---Design (nodes `5569-2569`, `5589-15528`, `7221-3976`).
- Backend Technical Document for the epic: https://verzekeringen.atlassian.net/wiki/spaces/SD/pages/564559881/
