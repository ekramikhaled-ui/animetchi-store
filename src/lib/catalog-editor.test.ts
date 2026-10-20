import { describe, expect, it } from "vitest";
import type { Product } from "./catalog";
import { applyProductDraft, catalogStorageKey, createCategory, persistCatalog, productImages, type ProductDraft } from "./catalog-editor";

const draft: ProductDraft = { name: { en: "Manual figure", ar: "مجسم يدوي" }, price: 125, oldPrice: 180, category: "figures", image: "data:image/png;base64,aGVsbG8=", soldOut: true };

describe("manual demo catalog", () => {
  it("stores distinct cover and detail images in switchable order", () => {
    const product = applyProductDraft({ ...draft, image: "cover.jpg", detailImage: "detail.jpg" }, "two-images");
    expect(product.image).toBe("cover.jpg");
    expect(product.detailImage).toBe("detail.jpg");
    expect(productImages(product).map(item => item.image)).toEqual(["cover.jpg", "detail.jpg"]);
  });
  it("replaces or removes the managed secondary image without losing other gallery entries", () => {
    const existing = { ...applyProductDraft(draft, "edit"), gallery: [{ image: draft.image, label: { en: "Cover", ar: "غلاف" } }, { image: "old.jpg", label: { en: "Detail", ar: "تفاصيل" } }, { image: "extra.jpg", label: { en: "Extra", ar: "إضافية" } }] };
    const edited = applyProductDraft({ ...draft, detailImage: "new.jpg" }, existing.id, existing);
    expect(productImages(edited).map(item => item.image)).toEqual([draft.image, "new.jpg", "extra.jpg"]);
    const removed = applyProductDraft({ ...draft, detailImage: "" }, edited.id, edited);
    expect(productImages(removed).map(item => item.image)).toEqual([draft.image, "extra.jpg"]);
  });
  it("supports optional bilingual descriptions including explicitly blank values", () => {
    const product = applyProductDraft({ ...draft, description: { en: "  First line\nSecond line  ", ar: "  وصف المنتج  " } }, "description");
    expect(product.description).toEqual({ en: "First line\nSecond line", ar: "وصف المنتج" });
    expect(applyProductDraft({ ...draft, description: { en: "", ar: "" } }, product.id, product).description).toEqual({ en: "", ar: "" });
    expect(applyProductDraft(draft, "blank").description).toEqual({ en: "", ar: "" });
  });
  it("persists independently chosen category images, product images and descriptions across reloads", () => {
    let saved = "";
    const product = applyProductDraft({ ...draft, detailImage: "data:image/png;base64,ZGV0YWls", description: { en: "Details", ar: "تفاصيل" } }, "saved");
    const category = createCategory({ en: "Custom", ar: "مخصصة" }, "data:image/png;base64,Y2F0ZWdvcnk=", []);
    persistCatalog({ setItem: (_key, value) => { saved = value; } }, { products: [product], categories: [category] });
    const restored = JSON.parse(saved);
    expect(restored.products[0].detailImage).toBe("data:image/png;base64,ZGV0YWls");
    expect(restored.products[0].description.ar).toBe("تفاصيل");
    expect(restored.categories[0].image).toBe("data:image/png;base64,Y2F0ZWdvcnk=");
  });
  it("saves both names, current and old prices, category, uploaded image and simulated stock", () => {
    const product = applyProductDraft(draft, "manual");
    expect(product).toMatchObject({ id: "manual", ...draft, status: "sample" });
  });
  it("preserves unedited product fields and identifiers", () => {
    const existing: Product = {
      id: "pulse-controller", name: { en: "Controller", ar: "ذراع" }, description: { en: "Demo", ar: "تجريبي" },
      image: "front.jpg", category: "gaming", subcategory: { en: "Controllers", ar: "أذرع" }, price: 850,
      featured: false, status: "sample", tags: ["demo"], details: [], franchises: ["naruto"],
      variants: [{ en: "Small", ar: "صغير" }],
      gallery: [{ image: "front.jpg", label: { en: "Front", ar: "أمام" } }, { image: "back.jpg", label: { en: "Back", ar: "خلف" } }],
    };
    const updated = applyProductDraft(draft, existing.id, existing);
    expect(updated.id).toBe("pulse-controller");
    expect(updated.variants).toEqual(existing.variants);
    expect(updated.franchises).toEqual(existing.franchises);
    expect(updated.gallery?.[0]?.image).toBe(draft.image);
    expect(updated.gallery?.some(item => item.image === existing.image)).toBe(false);
    expect(updated.gallery?.[1]).toEqual(existing.gallery?.[1]);
  });
  it("creates bilingual custom categories with unique identifiers", () => {
    const first = createCategory({ en: "Figures", ar: "مجسمات" }, draft.image, []);
    const second = createCategory(first.name, draft.image, [first]);
    expect(first.slug).toBe("figures");
    expect(first.name.ar).toBe("مجسمات");
    expect(second.slug).toBe("figures-2");
  });
  it("stores products and categories together for reload persistence", () => {
    const values = new Map<string, string>();
    const snapshot = { products: [applyProductDraft(draft, "manual")], categories: [createCategory({ en: "Figures", ar: "مجسمات" }, draft.image, [])] };
    expect(persistCatalog({ setItem: (key, value) => { values.set(key, value); } }, snapshot)).toBe(true);
    expect(JSON.parse(values.get(catalogStorageKey) ?? "null")).toEqual(snapshot);
  });
  it("reports full storage instead of claiming a successful save", () => {
    expect(persistCatalog({ setItem: () => { throw new Error("QuotaExceededError"); } }, { products: [], categories: [] })).toBe(false);
  });
  it("supports a zero price and clearing the optional old price", () => {
    const product = applyProductDraft({ ...draft, price: 0, oldPrice: null }, "free");
    expect(product.price).toBe(0);
    expect(product.oldPrice).toBeNull();
  });
});