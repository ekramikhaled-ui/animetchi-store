import { useState, type FormEvent } from "react";
import { Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CatalogImageInput, type ImageValue } from "@/components/catalog-image-input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { Product } from "@/lib/catalog";
import { applyProductDraft, createCategory } from "@/lib/catalog-editor";
import { editorCopy } from "@/lib/catalog-editor-copy";
import { useStore } from "@/lib/store";

export function ProductEditor({ product, onClose }: { product?: Product | undefined; onClose: () => void }) {
  const { language, t, categories, saveProduct } = useStore();
  const c = editorCopy[language];
  const [nameEn, setNameEn] = useState(product?.name.en ?? "");
  const [nameAr, setNameAr] = useState(product?.name.ar ?? "");
  const [price, setPrice] = useState(product?.price?.toString() ?? "");
  const [oldPrice, setOldPrice] = useState(product?.oldPrice?.toString() ?? "");
  const [category, setCategory] = useState(product?.category ?? categories[0]?.slug ?? "");
  const [custom, setCustom] = useState(false);
  const [categoryEn, setCategoryEn] = useState("");
  const [categoryAr, setCategoryAr] = useState("");
  const [cover, setCover] = useState<ImageValue>({ image: product?.image ?? "", ready: false, reading: false });
  const [detail, setDetail] = useState<ImageValue>({ image: product?.detailImage ?? product?.gallery?.find(item => item.image !== product.image)?.image ?? "", ready: false, reading: false });
  const [categoryImage, setCategoryImage] = useState<ImageValue>({ image: "", ready: false, reading: false });
  const [descriptionEn, setDescriptionEn] = useState(product?.description.en ?? "");
  const [descriptionAr, setDescriptionAr] = useState(product?.description.ar ?? "");
  const [soldOut, setSoldOut] = useState(product?.soldOut ?? false);
  const [error, setError] = useState("");
  const reading = cover.reading || detail.reading || (custom && categoryImage.reading);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!nameEn.trim() || !nameAr.trim() || !price.trim() || !Number.isFinite(Number(price)) || Number(price) < 0 || (!custom && !categories.some(item => item.slug === category)) || (custom && (!categoryEn.trim() || !categoryAr.trim()))) { setError(c.required); return; }
    if (!cover.image || !cover.ready || reading || (detail.image && !detail.ready)) { setError(c.imageError); return; }
    if (custom && (!categoryImage.image || !categoryImage.ready)) { setError(c.categoryImageError); return; }
    const previousPrice = oldPrice.trim() ? Number(oldPrice) : null;
    if (previousPrice !== null && (!Number.isFinite(previousPrice) || previousPrice <= Number(price))) { setError(c.priceError); return; }
    const newCategory = custom ? createCategory({ en: categoryEn, ar: categoryAr }, categoryImage.image, categories) : undefined;
    const next = applyProductDraft({ name: { en: nameEn, ar: nameAr }, price: Number(price), oldPrice: previousPrice, category: newCategory?.slug ?? category, image: cover.image, detailImage: detail.image, description: { en: descriptionEn, ar: descriptionAr }, soldOut }, product?.id ?? `demo-${crypto.randomUUID()}`, product);
    if (!saveProduct(next, newCategory)) { setError(c.storageError); return; }
    onClose();
  }

  return <Dialog open onOpenChange={open => { if (!open) onClose(); }}>
    <DialogContent dir={language === "ar" ? "rtl" : "ltr"} className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto p-5 text-start sm:p-6">
      <DialogTitle className="pe-8 text-xl">{product ? c.edit : c.add}</DialogTitle>
      <DialogDescription>{t.adminNotice}</DialogDescription>
      <form onSubmit={submit} className="grid min-w-0 gap-6">
        <div className="grid min-w-0 gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <div className="min-w-0 space-y-6">
            <CatalogImageInput id="product-cover" label={c.cover} ratio="cover" value={cover} onChange={setCover} />
            <CatalogImageInput id="product-detail" label={c.detail} value={detail} onChange={setDetail} />
          </div>
          <div className="min-w-0 space-y-4">
            <div className="space-y-2"><Label htmlFor="product-name-en">{c.nameEn}</Label><Input id="product-name-en" dir="ltr" value={nameEn} required onChange={event => setNameEn(event.target.value)} /></div>
            <div className="space-y-2"><Label htmlFor="product-name-ar">{c.nameAr}</Label><Input id="product-name-ar" dir="rtl" value={nameAr} required onChange={event => setNameAr(event.target.value)} /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="min-w-0 space-y-2"><Label htmlFor="product-price">{c.price}</Label><Input id="product-price" type="number" min="0" step="any" required value={price} onChange={event => setPrice(event.target.value)} /></div>
              <div className="min-w-0 space-y-2"><Label htmlFor="product-old-price">{c.oldPrice}</Label><Input id="product-old-price" type="number" min="0" step="any" value={oldPrice} onChange={event => setOldPrice(event.target.value)} /></div>
            </div>
            <div className="space-y-2"><Label htmlFor="product-category">{c.category}</Label>
              {!custom ? <Select value={category} onValueChange={setCategory}><SelectTrigger id="product-category" className="w-full min-w-0 [&>span]:truncate"><SelectValue /></SelectTrigger><SelectContent>{categories.map(item => <SelectItem key={item.slug} value={item.slug}>{item.name[language]}</SelectItem>)}</SelectContent></Select> : <div className="grid gap-3"><Label htmlFor="category-en">{c.categoryEn}</Label><Input id="category-en" dir="ltr" required value={categoryEn} onChange={event => setCategoryEn(event.target.value)} /><Label htmlFor="category-ar">{c.categoryAr}</Label><Input id="category-ar" dir="rtl" required value={categoryAr} onChange={event => setCategoryAr(event.target.value)} /><CatalogImageInput id="category-image" label={c.categoryImage} value={categoryImage} onChange={setCategoryImage} /></div>}
              <Button type="button" variant="link" className="h-auto max-w-full whitespace-normal px-0 text-start" onClick={() => setCustom(!custom)}><Plus />{custom ? c.existingCategory : c.newCategory}</Button>
            </div>
            <div className="space-y-2"><Label htmlFor="product-description-en">{c.descriptionEn}</Label><Textarea id="product-description-en" dir="ltr" rows={4} value={descriptionEn} onChange={event => setDescriptionEn(event.target.value)} /></div>
            <div className="space-y-2"><Label htmlFor="product-description-ar">{c.descriptionAr}</Label><Textarea id="product-description-ar" dir="rtl" rows={4} value={descriptionAr} onChange={event => setDescriptionAr(event.target.value)} /></div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4"><Label htmlFor="product-stock">{c.stock}</Label><div className="flex items-center gap-2"><Switch id="product-stock" checked={!soldOut} onCheckedChange={value => setSoldOut(!value)} /><span className="text-sm">{soldOut ? c.soldOut : c.inStock}</span></div></div>
          </div>
        </div>
        {error ? <p role="alert" className="text-sm text-destructive">{error}</p> : null}
        <div className="flex flex-wrap justify-end gap-3 border-t pt-4"><Button type="button" variant="outline" onClick={onClose}>{c.cancel}</Button><Button type="submit" disabled={reading}><Save />{c.save}</Button></div>
      </form>
    </DialogContent>
  </Dialog>;
}