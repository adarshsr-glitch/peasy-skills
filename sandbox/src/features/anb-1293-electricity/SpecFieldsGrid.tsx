import { CheckboxGroup } from '../../components/CheckboxGroup';
import { RadioGroup } from '../../components/RadioGroup';
import { TextInput } from '../../components/TextInput';
import { TextInputNumeric } from '../../components/TextInputNumeric';
import type { FormState } from './fixtures';
import styles from './SpecFieldsGrid.module.css';

// The shared 17-field two-column grid. Used identically by edit, create,
// and duplicate flows per ANB-1304 AC1. Any view-specific chrome
// (page header, action bar, metadata) lives in the parent.

type SpecFieldsGridProps = {
  form: FormState;
  onChange: (next: FormState) => void;
  disabled?: boolean;
};

export function SpecFieldsGrid({ form, onChange, disabled }: SpecFieldsGridProps) {
  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    onChange({ ...form, [key]: value });
  };

  // ANB-1306 AC5: Toon in vergelijking locked to "Nee" when Status = Niet actief.
  const toonLocked = form.status === 'niet-actief';
  const toonValue = toonLocked ? 'nee' : form.toonInVergelijking;

  return (
    <div className={styles.grid}>
      {/* Row 1: product names. ANB-1304 AC1, ANB-1358 (uniqueness). */}
      <TextInput
        label="Productnaam NL"
        value={form.productnaamNL}
        onChange={(v) => update('productnaamNL', v)}
        helperText={form.productnaamNL ? 'Basic-online (51613)' : undefined}
        required
        disabled={disabled}
      />
      <TextInput
        label="Productnaam FR"
        value={form.productnaamFR}
        onChange={(v) => update('productnaamFR', v)}
        helperText={form.productnaamFR ? 'Basic-online (51613)' : undefined}
        required
        disabled={disabled}
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
        disabled={disabled}
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
        disabled={disabled}
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
        disabled={disabled}
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
        disabled={disabled}
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
        disabled={disabled}
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
        disabled={disabled}
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
        disabled={disabled}
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
        disabled={disabled}
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
        disabled={disabled}
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
        disabled={disabled}
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
        disabled={disabled}
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
        disabled={disabled}
      />

      {/* Row 8: contractduur + indexeringsperiode. ANB-1304 AC4: numeric only. */}
      <TextInputNumeric
        label="Contractduur (in maanden)"
        value={form.contractduur}
        onChange={(v) => update('contractduur', v)}
        placeholder="24"
        required
        disabled={disabled}
      />
      <TextInputNumeric
        label="Indexeringsperiode"
        value={form.indexeringsperiode}
        onChange={(v) => update('indexeringsperiode', v)}
        placeholder="0"
        required
        disabled={disabled}
      />

      {/* Row 9: verwerkingslinks. */}
      <TextInput
        label="Verwerkingslink NL"
        value={form.verwerkingslinkNL}
        onChange={(v) => update('verwerkingslinkNL', v)}
        required
        disabled={disabled}
      />
      <TextInput
        label="Verwerkingslink FR"
        value={form.verwerkingslinkFR}
        onChange={(v) => update('verwerkingslinkFR', v)}
        required
        disabled={disabled}
      />
    </div>
  );
}
