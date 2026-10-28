import { useState } from 'react';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { CheckboxGroup } from '../../components/CheckboxGroup';
import { Dropdown } from '../../components/Dropdown';
import { PageHeader } from '../../components/PageHeader';
import { RadioGroup } from '../../components/RadioGroup';
import { TextInput } from '../../components/TextInput';
import { TextInputNumeric } from '../../components/TextInputNumeric';
import { CalendarIcon, DuplicateIcon, PlusIcon, SaveIcon } from '../../components/icons';
import {
  initialFormState,
  products,
  suppliers,
  type FormState,
  type ProductId,
  type SupplierId,
} from './fixtures';
import styles from './EditView.module.css';

// Peasy mapping: this page lives inside Peasy's admin shell (left nav + top
// tabs for Electricity / Gas / etc. are handled by the surrounding layout).
// The sandbox renders the Specificaties tab for a selected product only.

export function EditView() {
  const [supplierId, setSupplierId] = useState<SupplierId>('engie');
  const [productId, setProductId] = useState<ProductId>('engie-basic-online');
  const [form, setForm] = useState<FormState>(initialFormState);

  const supplierProducts = products.filter((p) => p.supplierId === supplierId);
  const product = supplierProducts.find((p) => p.id === productId) ?? supplierProducts[0];

  // ANB-1306 AC5: Toon in vergelijking locked to "Nee" when Status = Niet actief.
  const toonLocked = form.status === 'niet-actief';
  const toonValue = toonLocked ? 'nee' : form.toonInVergelijking;

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        {/* Supplier + Product selectors + create/duplicate actions. ANB-1298, ANB-1303, ANB-1347. */}
        <div className={styles.selectorRow}>
          <div className={styles.selectors}>
            <Dropdown
              label="Leverancier"
              value={supplierId}
              onChange={(next) => setSupplierId(next)}
              options={suppliers}
            />
            <Dropdown
              label="Product"
              value={productId}
              onChange={(next) => setProductId(next)}
              options={supplierProducts.map((p) => ({ value: p.id, label: p.name }))}
            />
          </div>
          <div className={styles.selectorActions}>
            {/* ANB-1303 AC1: entry to the create flow. */}
            <Button variant="primary" leadingIcon={<PlusIcon />}>
              Nieuw product
            </Button>
            {/* ANB-1347 AC1: entry to the duplicate flow. */}
            <Button variant="ghost" leadingIcon={<DuplicateIcon />}>
              Dupliceer product
            </Button>
          </div>
        </div>

        {/* Edit card. ANB-1304 displays the 17 fields; ANB-1305 holds Save. */}
        <section className={styles.card}>
          <PageHeader
            title={product?.name ?? 'Product'}
            badge={
              <Badge tone={form.status === 'actief' ? 'success' : 'neutral'}>
                {form.status === 'actief' ? 'Actief' : 'Niet actief'}
              </Badge>
            }
            // ANB-1305 AC1: Save at the top of the page.
            actions={
              <Button variant="primary" leadingIcon={<SaveIcon />}>
                Bewaar de eigenschappen
              </Button>
            }
            // ANB-1298 AC4: metadata read-only.
            meta={
              product && (
                <>
                  <span className={styles.metaChip}>
                    Product ID: <strong>{product.productId}</strong>
                    <span className={styles.metaDivider}>|</span>
                    Supplier ID: <strong>{product.supplierPublicId}</strong>
                  </span>
                  <span className={styles.metaDate}>
                    <CalendarIcon /> Created: {product.createdAt}
                  </span>
                  <span className={styles.metaDate}>
                    <CalendarIcon /> Last Update: {product.updatedAt}
                  </span>
                </>
              )
            }
          />

          <div className={styles.divider} />

          <div className={styles.grid}>
            {/* Row 1: product names. ANB-1304 AC1, ANB-1358 (uniqueness). */}
            <TextInput
              label="Productnaam NL"
              value={form.productnaamNL}
              onChange={(v) => update('productnaamNL', v)}
              helperText={`Basic-online (51613)`}
              required
            />
            <TextInput
              label="Productnaam FR"
              value={form.productnaamFR}
              onChange={(v) => update('productnaamFR', v)}
              helperText={`Basic-online (51613)`}
              required
            />

            {/* Row 2: status + toon. ANB-1306. */}
            <RadioGroup
              name="status"
              label="Status"
              value={form.status}
              onChange={(v) => update('status', v)}
              options={[
                { value: 'actief', label: 'Actief' },
                { value: 'niet-actief', label: 'Niet actief' },
              ]}
            />
            <RadioGroup
              name="toon-in-vergelijking"
              label="Toon in vergelijking"
              value={toonValue}
              onChange={(v) => update('toonInVergelijking', v)}
              options={[
                { value: 'ja', label: 'Ja' },
                { value: 'nee', label: 'Nee' },
              ]}
              locked={toonLocked}
            />

            {/* Row 3: tarieftype + metertype. ANB-1304. */}
            <RadioGroup
              name="tarieftype"
              label="Tarieftype"
              value={form.tarieftype}
              onChange={(v) => update('tarieftype', v)}
              options={[
                { value: 'vast', label: 'Vast' },
                { value: 'variabel', label: 'Variabel' },
                { value: 'dynamisch', label: 'Dynamisch' },
                { value: 'hybride', label: 'Hybride' },
              ]}
            />
            <RadioGroup
              name="metertype"
              label="Metertype"
              value={form.metertype}
              onChange={(v) => update('metertype', v)}
              options={[
                { value: 'enkel-analoog', label: 'Enkel analoog' },
                { value: 'enkel-digitaal', label: 'Enkel digitaal' },
                { value: 'beide', label: 'Beide' },
              ]}
            />

            {/* Row 4: commissie + online contract. */}
            <RadioGroup
              name="commissie"
              label="Commissie"
              value={form.commissie}
              onChange={(v) => update('commissie', v)}
              options={[
                { value: 'ja', label: 'Ja' },
                { value: 'nee', label: 'Nee' },
              ]}
            />
            <RadioGroup
              name="online-contract"
              label="Online contract"
              value={form.onlineContract}
              onChange={(v) => update('onlineContract', v)}
              options={[
                { value: 'ja', label: 'Ja' },
                { value: 'nee', label: 'Nee' },
              ]}
            />

            {/* Row 5: klantendienst + situatie. */}
            <CheckboxGroup
              label="Klantendienst"
              value={form.klantendienst}
              onChange={(v) => update('klantendienst', v)}
              options={[
                { value: 'telefonisch', label: 'Telefonisch' },
                { value: 'email', label: 'E-mail' },
              ]}
            />
            <CheckboxGroup
              label="Situatie"
              value={form.situatie}
              onChange={(v) => update('situatie', v)}
              options={[
                { value: 'leverancierswissel', label: 'Leverancierswissel' },
                { value: 'nieuwe-aansluiting', label: 'Nieuwe aansluiting' },
                { value: 'overname', label: 'Overname' },
                { value: 'dringende-heropening', label: 'Dringende (her)opening' },
              ]}
            />

            {/* Row 6: klantsegment + betaalmethoden. */}
            <RadioGroup
              name="klantsegment"
              label="Klantsegment"
              value={form.klantsegment}
              onChange={(v) => update('klantsegment', v)}
              options={[
                { value: 'residentieel', label: 'Residentieel' },
                { value: 'professioneel', label: 'Professioneel' },
              ]}
            />
            <CheckboxGroup
              label="Betaalmethoden"
              value={form.betaalmethoden}
              onChange={(v) => update('betaalmethoden', v)}
              options={[
                { value: 'overschrijving', label: 'Overschrijving' },
                { value: 'domicilering', label: 'Domiciliëring' },
                { value: 'prepaid', label: 'Prepaid' },
                { value: 'credit-card', label: 'Credit card' },
              ]}
            />

            {/* Row 7: groene energie + regio. */}
            <RadioGroup
              name="groene-energie"
              label="Groene energie"
              value={form.groeneEnergie}
              onChange={(v) => update('groeneEnergie', v)}
              options={[
                { value: 'ja', label: 'Ja' },
                { value: 'nee', label: 'Nee' },
              ]}
            />
            <CheckboxGroup
              label="Regio"
              value={form.regio}
              onChange={(v) => update('regio', v)}
              options={[
                { value: 'vlaanderen', label: 'Vlaanderen' },
                { value: 'wallonie', label: 'Wallonië' },
                { value: 'brussel', label: 'Brussel' },
              ]}
            />

            {/* Row 8: contractduur + indexeringsperiode. ANB-1304 AC4: numeric only. */}
            <TextInputNumeric
              label="Contractduur (in maanden)"
              value={form.contractduur}
              onChange={(v) => update('contractduur', v)}
              placeholder="24"
              required
            />
            <TextInputNumeric
              label="Indexeringsperiode"
              value={form.indexeringsperiode}
              onChange={(v) => update('indexeringsperiode', v)}
              placeholder="0"
              required
            />

            {/* Row 9: verwerkingslinks. */}
            <TextInput
              label="Verwerkingslink NL"
              value={form.verwerkingslinkNL}
              onChange={(v) => update('verwerkingslinkNL', v)}
              required
            />
            <TextInput
              label="Verwerkingslink FR"
              value={form.verwerkingslinkFR}
              onChange={(v) => update('verwerkingslinkFR', v)}
              required
            />
          </div>

          {/* ANB-1305 AC1: Save at both top and bottom. */}
          <div className={styles.bottomActions}>
            <Button variant="primary" leadingIcon={<SaveIcon />}>
              Bewaar de eigenschappen
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
