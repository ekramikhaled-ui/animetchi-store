import { describe, expect, it } from "vitest";
import type { Product } from "./catalog";
import { applyProductDraft, persistCatalog } from "./catalog-editor";
import { canPurchase, cartSelection, migrateVariantCart, normalizeProductVariants, selectedVariant, validVariants, variantPrice } from "./product-variants";
import { buildCheckout } from "./checkout";

const product: Product = { id: "mug", name: { en: "Mug", ar: "مج" }, category: "mugs", subcategory: { en: "", ar: "" }, image: "cover.jpg", description: { en: "", ar: "" }, price: 100, featured: false, status: "sample", tags: [], details: [], variants: [{ id: "luffy", name: "Luffy", image: "https://example.com/luffy.jpg", inStock: true }, { id: "zoro", name: "Zoro", image: "data:image/png;base64,eA==", price: 150.25, inStock: false }] };
const customer = { fullName: "Demo Customer", phone: "01012345678", governorate: "Cairo", city: "Nasr City", address: "Demo street number 12", notes: "" };
describe("dynamic variants", () => {
  it("uses base price when absent and custom price including zero when set", () => {
    expect(variantPrice(product, product.variants?.[0])).toBe(100);
    expect(variantPrice(product, product.variants?.[1])).toBe(150.25);
    expect(variantPrice(product, { id: "free", name: "Free", image: "free.jpg", price: 0, inStock: true })).toBe(0);
  });
  it("requires a selection and blocks sold-out variants and products", () => {
    expect(canPurchase(product)).toBe(false);
    expect(canPurchase(product, product.variants?.[0])).toBe(true);
    expect(canPurchase(product, product.variants?.[1])).toBe(false);
    expect(canPurchase({ ...product, soldOut: true }, product.variants?.[0])).toBe(false);
  });
  it("captures the exact selected variant ID, name and image", () => {
    expect(cartSelection(product, product.variants?.[0])).toEqual({ productId: "mug", variantId: "luffy", variant: "Luffy", variantName: "Luffy", variantImage: "https://example.com/luffy.jpg" });
  });
  it("retains added, reordered and removed variants through local snapshot saving", () => {
    const options = [...(product.variants ?? [])].reverse();
    const edited = applyProductDraft({ name: product.name, price: 100, oldPrice: null, category: product.category, image: product.image, soldOut: false, variants: options }, product.id, product);
    let saved = "";
    persistCatalog({ setItem: (_key, value) => { saved = value; } }, { products: [edited], categories: [] });
    expect(JSON.parse(saved).products[0].variants.map((v: { id: string }) => v.id)).toEqual(["zoro", "luffy"]);
    expect(applyProductDraft({ name: product.name, price: 100, oldPrice: null, category: product.category, image: product.image, soldOut: false, variants: [] }, product.id, product).variants).toEqual([]);
  });
  it("migrates old bilingual options and carts without losing quantities or edits", () => {
    const old = { ...product, variants: [{ en: "Small", ar: "صغير" }] } as unknown as Product;
    const migrated = normalizeProductVariants(old);
    const cart = migrateVariantCart([{ productId: "mug", quantity: 3, variant: "Small" }], [migrated]);
    expect(migrated.variants?.[0]).toMatchObject({ id: "mug-option-1", name: "Small", image: "cover.jpg", inStock: true });
    expect(cart[0]).toMatchObject({ quantity: 3, variantId: "mug-option-1", variantName: "Small", variantImage: "cover.jpg" });
    expect(selectedVariant(migrated, cart[0] ?? {} )?.labels?.ar).toBe("صغير");
  });
  it("rejects empty names, images, duplicate IDs and invalid custom prices", () => {
    const option = product.variants?.[0]; if (!option) throw new Error("Missing fixture");
    expect(validVariants([{ ...option, name: "" }])).toBe(false);
    expect(validVariants([{ ...option, image: "" }])).toBe(false);
    expect(validVariants([option, option])).toBe(false);
    expect(validVariants([{ ...option, price: -1 }])).toBe(false);
  });
  it("calculates live variant totals and specifies exact selection in the order", () => {
    const option = product.variants?.[1]; if (!option) throw new Error("Missing fixture");
    const available = { ...product, variants: [{ ...option, inStock: true }] };
    const line = { ...cartSelection(available, available.variants[0]), quantity: 2 };
    const result = buildCheckout([line], [available], customer, "en");
    if (!result.ok) throw new Error(result.error);
    expect(result.subtotal).toBe(300.5);
    expect(result.message).toContain("Mug (Zoro)");
    expect(result.message).toContain("Variant ID: zoro");
    expect(result.message).not.toContain("data:image");
  });
  it("blocks deleted and unavailable selections at checkout", () => {
    expect(buildCheckout([{ ...cartSelection(product, product.variants?.[1]), quantity: 1 }], [product], customer, "en")).toEqual({ ok: false, error: "unavailable" });
    expect(buildCheckout([{ productId: "mug", quantity: 1, variantId: "deleted" }], [product], customer, "en")).toEqual({ ok: false, error: "invalidCart" });
    expect(buildCheckout([{ productId: "mug", quantity: 1 }], [product], customer, "en")).toEqual({ ok: false, error: "invalidCart" });
  });
});