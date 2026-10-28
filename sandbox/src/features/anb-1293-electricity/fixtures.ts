// Fixtures for the ANB-1293 Electricity sandbox prototype.
// Mirrors the ENGIE Basic Online product shown in the Figma mock.
// No backend; everything is static.

export type SupplierId = 'engie' | 'luminus' | 'eneco';
export type ProductId = 'engie-basic-online' | 'engie-pure-vast';

export type StatusValue = 'actief' | 'niet-actief';
export type ToonValue = 'ja' | 'nee';
export type TarieftypeValue = 'vast' | 'variabel' | 'dynamisch' | 'hybride';
export type MetertypeValue = 'enkel-analoog' | 'enkel-digitaal' | 'beide';
export type JaNee = 'ja' | 'nee';
export type KlantsegmentValue = 'residentieel' | 'professioneel';
export type KlantendienstValue = 'telefonisch' | 'email';
export type SituatieValue = 'leverancierswissel' | 'nieuwe-aansluiting' | 'overname' | 'dringende-heropening';
export type BetaalmethodeValue = 'overschrijving' | 'domicilering' | 'prepaid' | 'credit-card';
export type RegioValue = 'vlaanderen' | 'wallonie' | 'brussel';

export type Product = {
  id: ProductId;
  supplierId: SupplierId;
  name: string;
  productId: number;
  supplierPublicId: number;
  createdAt: string;
  updatedAt: string;
};

export const suppliers: ReadonlyArray<{ value: SupplierId; label: string }> = [
  { value: 'engie', label: 'ENGIE' },
  { value: 'luminus', label: 'Luminus' },
  { value: 'eneco', label: 'Eneco' },
];

export const products: ReadonlyArray<Product> = [
  {
    id: 'engie-basic-online',
    supplierId: 'engie',
    name: 'ENGIE Basic Online',
    productId: 683,
    supplierPublicId: 5,
    createdAt: '2016-03-31 09:48:12',
    updatedAt: '2025-12-12 10:20:37',
  },
  {
    id: 'engie-pure-vast',
    supplierId: 'engie',
    name: 'ENGIE Pure Vast',
    productId: 684,
    supplierPublicId: 5,
    createdAt: '2017-06-14 11:02:00',
    updatedAt: '2025-11-04 15:40:12',
  },
];

export type FormState = {
  productnaamNL: string;
  productnaamFR: string;
  status: StatusValue;
  toonInVergelijking: ToonValue;
  tarieftype: TarieftypeValue | null;
  metertype: MetertypeValue | null;
  commissie: JaNee | null;
  onlineContract: JaNee | null;
  klantendienst: KlantendienstValue[];
  situatie: SituatieValue[];
  klantsegment: KlantsegmentValue | null;
  betaalmethoden: BetaalmethodeValue[];
  groeneEnergie: JaNee | null;
  regio: RegioValue[];
  contractduur: number | '';
  indexeringsperiode: number | '';
  verwerkingslinkNL: string;
  verwerkingslinkFR: string;
};

export const initialFormState: FormState = {
  productnaamNL: 'Basic Online',
  productnaamFR: 'Basic Online',
  status: 'actief',
  toonInVergelijking: 'ja',
  tarieftype: null,
  metertype: null,
  commissie: null,
  onlineContract: null,
  klantendienst: [],
  situatie: [],
  klantsegment: null,
  betaalmethoden: [],
  groeneEnergie: null,
  regio: [],
  contractduur: '',
  indexeringsperiode: '',
  verwerkingslinkNL: 'https://www.engie.be/nl/contract/simulatie?scenario=6',
  verwerkingslinkFR: 'https://www.engie.be/fr/contrat/simulation?scenario=6',
};

// Empty state used when entering the create flow. Status defaults to "actief"
// so the Toon-locked rule doesn't fire on a fresh form; everything else is blank.
export const emptyFormState: FormState = {
  productnaamNL: '',
  productnaamFR: '',
  status: 'actief',
  toonInVergelijking: 'ja',
  tarieftype: null,
  metertype: null,
  commissie: null,
  onlineContract: null,
  klantendienst: [],
  situatie: [],
  klantsegment: null,
  betaalmethoden: [],
  groeneEnergie: null,
  regio: [],
  contractduur: '',
  indexeringsperiode: '',
  verwerkingslinkNL: '',
  verwerkingslinkFR: '',
};

// ANB-1347 AC3: duplication prefills everything from the source EXCEPT
// Productnaam NL / FR (empty) and Toon in vergelijking (Nee).
export function duplicateFromSource(source: FormState): FormState {
  return {
    ...source,
    productnaamNL: '',
    productnaamFR: '',
    toonInVergelijking: 'nee',
  };
}
