import { describe, expect, it } from "vitest";
import { initialProducts } from "./catalog";
import { applyProductDraft, catalogStorageKey, createCategory, persistCatalog, type ProductDraft } from "./catalog-editor";

const draft: ProductDraft = { name: { en: "Manual figure", ar: "مجسم يدوي" }, price: 125, oldPrice: 180, category: "figures", image: "data:image/png;base64,aGVsbG8=", soldOut: true };

describe("manual demo catalog", () => {
  it("saves both names, current and old prices, category, uploaded image and simulated stock", () => {
    const product = applyProductDraft(draft, "manual");
    expect(product).toMatchObject({ id: "manual", ...draft, status: "sample" });
  });
  it("preserves unedited product fields and identifiers", () => {
    const existing = initialProducts.find(product => product.id === "pulse-controller");
    if (!existing) throw new Error("Missing test seed");
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