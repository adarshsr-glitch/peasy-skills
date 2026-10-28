# Specifications page — surface state pattern

The ANB-1293 Specifications page uses **progressive disclosure**: controls appear as the admin narrows context from supplier → product. The design skill must reuse this pattern verbatim when another admin surface needs analogous staged reveal (gas products, insurance products, etc.).

## State matrix

| State | Supplier dd | Product dd | Nieuw product | Dupliceer | Save | Metadata | Spec fields |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `no-supplier` | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `supplier-selected` | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `product-selected` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

Citation: `ANB-1307 AC1–AC3`.

## Transition rules

- `no-supplier → supplier-selected` — admin picks a value in the Leverancier dropdown. Product dropdown and "Nieuw product" action render. No pre-selected product.
- `supplier-selected → product-selected` — admin picks a value in the Product dropdown. Metadata loads, 17 spec fields load, Save and Duplicate render, dropdowns remain enabled.
- Returning to a prior state — changing supplier clears the selected product. Changing product does not clear the supplier.

## Flow overlays

Two overlay states sit on top of `product-selected` without destroying it:

- **Create.** Entered via `Nieuw product`. Product dropdown hides; the title `Nieuw product aanmaken` appears below the supplier selector; the supplier reads as read-only text. Metadata, Save, and Duplicate hide. Cancel ("Annuleren") returns to the prior state verbatim. Refresh = Cancel. `[ANB-1303 AC1, AC2, AC3, AC7, Notes]`
- **Duplicate.** Entered via `Dupliceer product`. Same visibility shape as Create, but with title `Product dupliceren` and the spec fields prefilled from the source product (except names NL / FR → empty, `Toon in vergelijking` → `Nee`). Refresh = Cancel. `[ANB-1347 AC1, AC2, AC3, Notes]`

## Empty-state copy

No placeholder message. The empty state is signaled by the absence of downstream controls, not by text. `[ANB-1307 Notes]`

## Reuse pattern

Any new admin surface that follows the shape "pick an entity owner, then pick an entity, then reveal entity controls" uses this same state matrix. The design skill reads this file to decide the surface's state structure before touching the component layout.
