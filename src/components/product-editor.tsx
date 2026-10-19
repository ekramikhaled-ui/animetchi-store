import { useRef, useState, type FormEvent } from "react";
import { ImagePlus, Plus, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { Product } from "@/lib/catalog";
import { applyProductDraft, createCategory } from "@/lib/catalog-editor";
import { editorCopy } from "@/lib/catalog-editor-copy";
import { useStore } from "@/lib/store";

export function ProductEditor({ product, onClose }: { product?: Product; onClose: () => void }) {
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
  const [image, setImage] = useState(product?.image ?? "");
  const [url, setUrl] = useState(product?.image.startsWith("https://") || product?.image.startsWith("http://") ? product.image : "");
  const [imageReady, setImageReady] = useState(false);
  const [reading, setReading] = useState(false);
  const [soldOut, setSoldOut] = useState(product?.soldOut ?? false);
  const [error, setError] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const readVersion = useRef(0);

  function changeImage(value: string) { readVersion.current++; setReading(false); setImage(value); setImageReady(false); setError(""); }
  function upload(file?: File) {
    if (!file) return;
    if (!file.type.startsWith("image/")) { setError(c.imageError); return; }
    const version = ++readVersion.current;
    setReading(true); setError("");
    const reader = new FileReader();
    reader.onload = () => {
      if (version !== readVersion.current) return;
      setReading(false);
      if (typeof reader.result !== "string") { setError(c.imageError); return; }
      setImage(reader.result); setImageReady(false); setUrl("");
    };
    reader.onerror = () => { if (version === readVersion.current) { setReading(false); setError(c.imageError); } };
    reader.readAsDataURL(file);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!nameEn.trim() || !nameAr.trim() || !price.trim() || !Number.isFinite(Number(price)) || Number(price) < 0 || (!custom && !categories.some(item => item.slug === category)) || (custom && (!categoryEn.trim() || !categoryAr.trim()))) { setError(c.required); return; }
    if (!image || !imageReady || reading) { setError(c.imageError); return; }
    const previousPrice = oldPrice.trim() ? Number(oldPrice) : null;
    if (previousPrice !== null && (!Number.isFinite(previousPrice) || previousPrice <= Number(price))) { setError(c.priceError); return; }
    const newCategory = custom ? createCategory({ en: categoryEn, ar: categoryAr }, image, categories) : undefined;
    const next = applyProductDraft({ name: { en: nameEn, ar: nameAr }, price: Number(price), oldPrice: previousPrice, category: newCategory?.slug ?? category, image, soldOut }, product?.id ?? `demo-${crypto.randomUUID()}`, product);
    if (!saveProduct(next, newCategory)) { setError(c.storageError); return; }
    onClose();
  }

  return <Dialog open onOpenChange={open => { if (!open) onClose(); }}>
    <DialogContent dir={language === "ar" ? "rtl" : "ltr"} className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto p-5 text-start sm:p-6">
      <DialogTitle className="pe-8 text-xl">{product ? c.edit : c.add}</DialogTitle>
      <DialogDescription>{t.adminNotice}</DialogDescription>
      <form onSubmit={submit} className="grid min-w-0 gap-6">
        <div className="grid min-w-0 gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <div className="min-w-0 space-y-3">
            <Label>{c.image}</Label>
            <div className="flex aspect-square w-full items-center justify-center overflow-hidden border bg-muted" aria-label={c.preview}>
              {image ? <img key={image} src={image} alt={c.preview} className="h-full w-full object-contain" onLoad={() => setImageReady(true)} onError={() => { setImageReady(false); setError(c.imageError); }} /> : <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground"><ImagePlus className="size-8" />{c.empty}</div>}
            </div>
            <input ref={fileInput} id="product-upload" type="file" accept="image/*" className="sr-only" aria-label={c.upload} onChange={event => upload(event.target.files?.[0])} />
            <div className="flex gap-2"><Button type="button" variant="outline" className="min-w-0 flex-1 whitespace-normal" onClick={() => { if (fileInput.current) { fileInput.current.value = ""; fileInput.current.click(); } }}><ImagePlus />{c.upload}</Button><Button type="button" variant="outline" size="icon" aria-label={c.removeImage} disabled={!image} onClick={() => { changeImage(""); setUrl(""); }}><Trash2 /></Button></div>
            {reading ? <p role="status" className="text-sm text-muted-foreground">{c.reading}</p> : null}
            <div className="space-y-2"><Label htmlFor="product-url">{c.url}</Label><Input id="product-url" type="url" dir="ltr" value={url} onChange={event => { setUrl(event.target.value); changeImage(event.target.value.trim()); }} /></div>
          </div>
          <div className="min-w-0 space-y-4">
            <div className="space-y-2"><Label htmlFor="product-name-en">{c.nameEn}</Label><Input id="product-name-en" dir="ltr" value={nameEn} required onChange={event => setNameEn(event.target.value)} /></div>
            <div className="space-y-2"><Label htmlFor="product-name-ar">{c.nameAr}</Label><Input id="product-name-ar" dir="rtl" value={nameAr} required onChange={event => setNameAr(event.target.value)} /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="min-w-0 space-y-2"><Label htmlFor="product-price">{c.price}</Label><Input id="product-price" type="number" min="0" step="any" required value={price} onChange={event => setPrice(event.target.value)} /></div>
              <div className="min-w-0 space-y-2"><Label htmlFor="product-old-price">{c.oldPrice}</Label><Input id="product-old-price" type="number" min="0" step="any" value={oldPrice} onChange={event => setOldPrice(event.target.value)} /></div>
            </div>
            <div className="space-y-2"><Label htmlFor="product-category">{c.category}</Label>
              {!custom ? <Select value={category} onValueChange={setCategory}><SelectTrigger id="product-category" className="w-full min-w-0 [&>span]:truncate"><SelectValue /></SelectTrigger><SelectContent>{categories.map(item => <SelectItem key={item.slug} value={item.slug}>{item.name[language]}</SelectItem>)}</SelectContent></Select> : <div className="grid gap-3"><Label htmlFor="category-en">{c.categoryEn}</Label><Input id="category-en" dir="ltr" required value={categoryEn} onChange={event => setCategoryEn(event.target.value)} /><Label htmlFor="category-ar">{c.categoryAr}</Label><Input id="category-ar" dir="rtl" required value={categoryAr} onChange={event => setCategoryAr(event.target.value)} /></div>}
              <Button type="button" variant="link" className="h-auto max-w-full whitespace-normal px-0 text-start" onClick={() => setCustom(!custom)}><Plus />{custom ? c.existingCategory : c.newCategory}</Button>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4"><Label htmlFor="product-stock">{c.stock}</Label><div className="flex items-center gap-2"><Switch id="product-stock" checked={!soldOut} onCheckedChange={value => setSoldOut(!value)} /><span className="text-sm">{soldOut ? c.soldOut : c.inStock}</span></div></div>
          </div>
        </div>
        {error ? <p role="alert" className="text-sm text-destructive">{error}</p> : null}
        <div className="flex flex-wrap justify-end gap-3 border-t pt-4"><Button type="button" variant="outline" onClick={onClose}>{c.cancel}</Button><Button type="submit" disabled={reading}><Save />{c.save}</Button></div>
      </form>
    </DialogContent>
  </Dialog>;
}