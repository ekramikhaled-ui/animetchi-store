import type { Category, Product } from "./catalog";

export type ProductDraft = {
  name: { en: string; ar: string };
  price: number;
  oldPrice: number | null;
  category: string;
  image: string;
  soldOut: boolean;
};
export type CatalogSnapshot = { products: Product[]; categories: Category[] };
export const catalogStorageKey = "ah-catalog-state";

export function applyProductDraft(draft: ProductDraft, id: string, existing?: Product): Product {
  const base: Product = existing ?? {
    id, name: draft.name, category: draft.category, image: draft.image, price: draft.price,
    description: { en: "Locally added demo product.", ar: "منتج تجريبي مضاف محلياً." },
    subcategory: { en: "Demo", ar: "تجريبي" }, featured: false, status: "sample", tags: ["demo"],
    details: [{ en: "Demo only", ar: "للعرض فقط" }],
  };
  const gallery = existing?.gallery && existing.image !== draft.image
    ? [{ image: draft.image, label: { en: "Main view", ar: "الصورة الرئيسية" } }, ...existing.gallery.filter(item => item.image !== existing.image && item.image !== draft.image)]
    : existing?.gallery;
  return { ...base, ...draft, name: { en: draft.name.en.trim(), ar: draft.name.ar.trim() }, ...(gallery ? { gallery } : {}) };
}

export function createCategory(name: Category["name"], image: string, existing: Category[]): Category {
  const en = name.en.trim(); const ar = name.ar.trim();
  const base = en.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "custom-category";
  let slug = base; let suffix = 2;
  while (existing.some(category => category.slug === slug)) slug = `${base}-${suffix++}`;
  return { slug, name: { en, ar }, image, description: { en: "Sample collection", ar: "مجموعة تجريبية" } };
}

export function persistCatalog(storage: Pick<Storage, "setItem">, snapshot: CatalogSnapshot): boolean {
  try { storage.setItem(catalogStorageKey, JSON.stringify(snapshot)); return true; } catch { return false; }
}