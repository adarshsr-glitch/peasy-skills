# Dutch field, action, and state labels — ANB-1293

Source: `../../eval/benchmarks/anb-1293-electricity.md` and the Jira stories cited inline.

## Specification fields (17)

| Key | NL label | FR label | EN label | Citation |
| --- | --- | --- | --- | --- |
| `productnaam_nl` | Productnaam NL | Productnaam NL | Product name NL | `ANB-1304 AC1` |
| `productnaam_fr` | Productnaam FR | Productnaam FR | Product name FR | `ANB-1304 AC1` |
| `status` | Status | Statut | Status | `ANB-1304 AC1, ANB-1348` |
| `toon_in_vergelijking` | Toon in vergelijking | — | Show in comparison | `ANB-1304 AC1` |
| `tarieftype` | Tarieftype | — | Rate type | `ANB-1304 AC1` |
| `metertype` | Metertype | — | Meter type | `ANB-1304 AC1` |
| `commissie` | Commissie | — | Commission | `ANB-1304 AC1` |
| `online_contract` | Online contract | — | Online contract | `ANB-1304 AC1` |
| `klantendienst` | Klantendienst | — | Customer service | `ANB-1304 AC1` |
| `situatie` | Situatie | — | Situation | `ANB-1304 AC1` |
| `klantsegment` | Klantsegment | — | Customer segment | `ANB-1304 AC1` |
| `betaalmethoden` | Betaalmethoden | — | Payment methods | `ANB-1304 AC1` |
| `groene_energie` | Groene energie | — | Green energy | `ANB-1304 AC1` |
| `regio` | Regio | — | Region | `ANB-1304 AC1` |
| `contractduur` | Contractduur | — | Contract duration | `ANB-1304 AC1, AC4` |
| `indexeringsperiode` | Indexeringsperiode | — | Indexation period | `ANB-1304 AC1, AC4` |
| `verwerkingslink_nl` | Verwerkingslink NL | — | Processing link NL | `ANB-1304 AC1` |
| `verwerkingslink_fr` | Verwerkingslink FR | — | Processing link FR | `ANB-1304 AC1` |

The `—` cells need the FR translation when it lands. Per `ANB-1308 AC2` the page structure is translation-ready without changes.

## Dropdowns

| Key | NL label | Citation |
| --- | --- | --- |
| `supplier_dropdown_label` | Leverancier | `ANB-1298 AC1` |
| `product_dropdown_label` | Product | `ANB-1298 AC2` |

## Section titles

| Key | NL label | Citation |
| --- | --- | --- |
| `new_product_title` | Nieuw product aanmaken | `ANB-1303 AC2` |
| `duplicate_product_title` | Product dupliceren | `ANB-1347 AC2` |

## Actions

| Key | NL label | Citation |
| --- | --- | --- |
| `action_new_product` | Nieuw product | `ANB-1303 AC1` |
| `action_create_product` | Product aanmaken | `ANB-1303 AC4` |
| `action_duplicate_product` | Dupliceer product | `ANB-1347 AC1` |
| `action_duplicate_product_confirm` | Product dupliceren | `ANB-1347 AC5` |
| `action_cancel` | Annuleren | `ANB-1303 AC7, ANB-1347 AC8` |
| `action_save` | — (Figma defines the exact label) | `ANB-1305 AC1` |

## Status values

| Key | NL label | Badge color | Citation |
| --- | --- | --- | --- |
| `status_active` | Actief | Green | `ANB-1306 AC2` |
| `status_inactive` | Niet actief | Light grey | `ANB-1306 AC2` |

## Toon in vergelijking values

| Key | NL label | Citation |
| --- | --- | --- |
| `comparison_yes` | Ja | `ANB-1306 Additional status rule` |
| `comparison_no` | Nee | `ANB-1306 Additional status rule` |

## Metadata labels

Displayed read-only on the product edit view:

| Key | NL label | Citation |
| --- | --- | --- |
| `meta_product_id` | Product ID | `ANB-1298 AC4` |
| `meta_supplier_id` | Supplier ID | `ANB-1298 AC4` |
| `meta_created_on` | Created on | `ANB-1298 AC4` |
| `meta_last_updated` | Last updated | `ANB-1298 AC4` |

(The Jira ticket uses English labels for metadata; whether the UI shows them in NL or EN is a Figma detail to confirm.)
