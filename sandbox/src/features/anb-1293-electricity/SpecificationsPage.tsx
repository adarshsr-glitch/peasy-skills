import { useState } from 'react';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Dropdown } from '../../components/Dropdown';
import { PageHeader } from '../../components/PageHeader';
import { CalendarIcon, DuplicateIcon, PlusIcon, SaveIcon } from '../../components/icons';
import { SpecFieldsGrid } from './SpecFieldsGrid';
import {
  duplicateFromSource,
  emptyFormState,
  initialFormState,
  products,
  suppliers,
  type FormState,
  type ProductId,
  type SupplierId,
} from './fixtures';
import styles from './SpecificationsPage.module.css';

// Peasy mapping: this page lives inside Peasy's admin shell. The surrounding
// chrome (left nav, Electricity/Gas/DualFuel/Promotions/Suppliers tabs) is
// provided by the layout above; the sandbox renders only the Specificaties tab.

type View = 'edit' | 'create' | 'duplicate';

export function SpecificationsPage() {
  const [supplierId, setSupplierId] = useState<SupplierId>('engie');
  const [productId, setProductId] = useState<ProductId>('engie-basic-online');
  const [view, setView] = useState<View>('edit');
  const [form, setForm] = useState<FormState>(initialFormState);
  // Snapshot of the form before entering create/duplicate — restored on Cancel.
  // ANB-1303 AC7, ANB-1347 AC8.
  const [savedForm, setSavedForm] = useState<FormState>(initialFormState);

  const supplierProducts = products.filter((p) => p.supplierId === supplierId);
  const product = supplierProducts.find((p) => p.id === productId) ?? supplierProducts[0];
  const supplier = suppliers.find((s) => s.value === supplierId);

  // ANB-1303: enter create flow. Supplier stays fixed; form resets to empty.
  const startCreate = () => {
    setSavedForm(form);
    setForm(emptyFormState);
    setView('create');
  };

  // ANB-1347: enter duplicate flow. Supplier stays fixed; form copies from
  // the current product with names cleared and Toon reset to Nee.
  const startDuplicate = () => {
    setSavedForm(form);
    setForm(duplicateFromSource(form));
    setView('duplicate');
  };

  // ANB-1303 AC7, ANB-1347 AC8: Cancel restores the previous state verbatim.
  const cancel = () => {
    setForm(savedForm);
    setView('edit');
  };

  // No backend. The create/duplicate submits just return to edit for the demo.
  const submitCreate = () => {
    alert('Create flow submitted. In the real app this would persist the product (ANB-1303 AC4) and auto-select it (ANB-1303 AC6).');
    setView('edit');
  };
  const submitDuplicate = () => {
    alert('Duplicate flow submitted. In the real app this would persist the duplicate (ANB-1347 AC5) and auto-select it (ANB-1347 AC7).');
    setView('edit');
  };

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        {view === 'edit' ? (
          <EditTopBar
            supplierId={supplierId}
            productId={productId}
            supplierProducts={supplierProducts}
            onSupplierChange={setSupplierId}
            onProductChange={setProductId}
            onNewProduct={startCreate}
            onDuplicate={startDuplicate}
          />
        ) : (
          // ANB-1303 AC3, ANB-1347 AC4: supplier is read-only during create/duplicate.
          <div className={styles.lockedSupplier}>
            Leverancier : <strong>{supplier?.label}</strong>
          </div>
        )}

        <section className={styles.card}>
          {view === 'edit' && (
            <EditHeader
              product={product}
              status={form.status}
            />
          )}
          {view === 'create' && <h2 className={styles.flowTitle}>Nieuw product aanmaken</h2>}
          {view === 'duplicate' && <h2 className={styles.flowTitle}>Product dupliceren</h2>}

          <div className={styles.divider} />

          <SpecFieldsGrid form={form} onChange={setForm} />

          <div className={styles.bottomActions}>
            {view === 'edit' && (
              // ANB-1305 AC1: Save at both top and bottom.
              <Button variant="primary" leadingIcon={<SaveIcon />}>
                Bewaar de eigenschappen
              </Button>
            )}
            {view === 'create' && (
              <>
                {/* ANB-1303 AC7: Cancel returns to prior state with no save. */}
                <Button variant="ghost" onClick={cancel}>
                  Annuleren
                </Button>
                {/* ANB-1303 AC4: primary action. */}
                <Button variant="primary" leadingIcon={<SaveIcon />} onClick={submitCreate}>
                  Product aanmaken
                </Button>
              </>
            )}
            {view === 'duplicate' && (
              <>
                {/* ANB-1347 AC8: Cancel returns to prior state with no save. */}
                <Button variant="ghost" onClick={cancel}>
                  Annuleren
                </Button>
                {/* ANB-1347 AC5: primary action. */}
                <Button variant="primary" leadingIcon={<DuplicateIcon />} onClick={submitDuplicate}>
                  Product dupliceren
                </Button>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

type EditTopBarProps = {
  supplierId: SupplierId;
  productId: ProductId;
  supplierProducts: ReadonlyArray<{ id: ProductId; name: string }>;
  onSupplierChange: (next: SupplierId) => void;
  onProductChange: (next: ProductId) => void;
  onNewProduct: () => void;
  onDuplicate: () => void;
};

function EditTopBar({
  supplierId,
  productId,
  supplierProducts,
  onSupplierChange,
  onProductChange,
  onNewProduct,
  onDuplicate,
}: EditTopBarProps) {
  return (
    <div className={styles.selectorRow}>
      <div className={styles.selectors}>
        <Dropdown
          label="Leverancier"
          value={supplierId}
          onChange={onSupplierChange}
          options={suppliers}
        />
        <Dropdown
          label="Product"
          value={productId}
          onChange={onProductChange}
          options={supplierProducts.map((p) => ({ value: p.id, label: p.name }))}
        />
      </div>
      <div className={styles.selectorActions}>
        <Button variant="primary" leadingIcon={<PlusIcon />} onClick={onNewProduct}>
          Nieuw product
        </Button>
        <Button variant="ghost" leadingIcon={<DuplicateIcon />} onClick={onDuplicate}>
          Dupliceer product
        </Button>
      </div>
    </div>
  );
}

type EditHeaderProps = {
  product: typeof products[number] | undefined;
  status: FormState['status'];
};

function EditHeader({ product, status }: EditHeaderProps) {
  return (
    <PageHeader
      title={product?.name ?? 'Product'}
      badge={
        <Badge tone={status === 'actief' ? 'success' : 'neutral'}>
          {status === 'actief' ? 'Actief' : 'Niet actief'}
        </Badge>
      }
      actions={
        <Button variant="primary" leadingIcon={<SaveIcon />}>
          Bewaar de eigenschappen
        </Button>
      }
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
  );
}
