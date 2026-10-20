import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CatalogImageInput, type ImageValue } from "./catalog-image-input";
import type { ProductVariant } from "@/lib/catalog";
import { editorCopy } from "@/lib/catalog-editor-copy";
import { useStore } from "@/lib/store";

export type VariantDraft = { variant: ProductVariant; image: ImageValue; price: string };
export function ProductVariantEditor({ items, onChange }: { items: VariantDraft[]; onChange: (items: VariantDraft[]) => void }) {
  const { language } = useStore(); const c = editorCopy[language];
  const update = (index: number, patch: Partial<VariantDraft>) => onChange(items.map((item, i) => i === index ? { ...item, ...patch } : item));
  function move(index: number, offset: number) {
    const next = [...items]; const item = next[index]; const other = next[index + offset];
    if (!item || !other) return;
    next[index] = other; next[index + offset] = item; onChange(next);
  }
  return <section className="min-w-0 space-y-4 border-t pt-5">
    <h2 className="text-lg font-bold">{c.variants}</h2>
    {items.map((item, index) => <div key={item.variant.id} className="grid min-w-0 gap-4 rounded-md border p-4 sm:grid-cols-[160px_minmax(0,1fr)]">
      <CatalogImageInput id={`variant-${item.variant.id}`} label={`${c.variantImage} ${index + 1}`} value={item.image} onChange={image => update(index, { image })} />
      <div className="min-w-0 space-y-4">
        <div className="flex justify-end gap-2">
          <Button type="button" size="icon" variant="outline" aria-label={`${c.moveUp} ${index + 1}`} title={c.moveUp} disabled={index === 0} onClick={() => move(index, -1)}><ArrowUp /></Button>
          <Button type="button" size="icon" variant="outline" aria-label={`${c.moveDown} ${index + 1}`} title={c.moveDown} disabled={index === items.length - 1} onClick={() => move(index, 1)}><ArrowDown /></Button>
          <Button type="button" size="icon" variant="ghost" aria-label={`${c.deleteVariant} ${index + 1}`} title={c.deleteVariant} onClick={() => onChange(items.filter((_, i) => i !== index))}><Trash2 /></Button>
        </div>
        <div className="space-y-2"><Label htmlFor={`variant-name-${item.variant.id}`}>{c.variantName}</Label><Input id={`variant-name-${item.variant.id}`} required maxLength={100} value={item.variant.name} onChange={event => update(index, { variant: { ...item.variant, name: event.target.value, labels: undefined } })} /></div>
        <div className="space-y-2"><Label htmlFor={`variant-price-${item.variant.id}`}>{c.variantPrice}</Label><Input id={`variant-price-${item.variant.id}`} type="number" min="0" step="any" value={item.price} onChange={event => update(index, { price: event.target.value })} /></div>
        <div className="flex flex-wrap items-center gap-3"><Label htmlFor={`variant-stock-${item.variant.id}`}>{c.stock}</Label><Switch id={`variant-stock-${item.variant.id}`} checked={item.variant.inStock} onCheckedChange={inStock => update(index, { variant: { ...item.variant, inStock } })} /><span className="text-sm">{item.variant.inStock ? c.inStock : c.soldOut}</span></div>
      </div>
    </div>)}
    <Button type="button" variant="outline" className="h-auto min-h-11 max-w-full whitespace-normal" onClick={() => onChange([...items, { variant: { id: crypto.randomUUID(), name: "", image: "", inStock: true }, image: { image: "", ready: false, reading: false }, price: "" }])}><Plus />{c.addVariant}</Button>
  </section>;
}