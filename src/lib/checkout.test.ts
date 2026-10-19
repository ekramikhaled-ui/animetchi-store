import { describe, expect, test } from "vitest";
import { buildCheckout, customerSchema } from "./checkout";
import type { Product } from "./catalog";

const customer = { fullName: "عميل تجريبي", phone: "01012345678", governorate: "القاهرة", city: "مدينة نصر", address: "عنوان تجريبي، شارع الاختبار 12", notes: "اتصل قبل الاتفاق & شكراً" };
const products: Product[] = [
  { id: "a", name: { ar: "منتج ألف", en: "Product A" }, description: { ar: "", en: "" }, category: "manga", subcategory: { ar: "", en: "" }, image: "", price: 185, featured: false, status: "sample", tags: [], details: [] },
  { id: "b", name: { ar: "منتج باء", en: "Product B" }, description: { ar: "", en: "" }, category: "manga", subcategory: { ar: "", en: "" }, image: "", price: 265, featured: false, status: "sample", tags: [], details: [] },
];
const cart = [{ productId: "a", quantity: 2 }, { productId: "b", quantity: 3 }];
describe("WhatsApp checkout rules", () => {
  test("uses the supplied recipient exactly and round trips Arabic text", () => {
    const result = buildCheckout(cart, products, customer, "ar");
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const url = new URL(result.url);
    expect(url.origin + url.pathname).toBe("https://wa.me/201505523958");
    expect(url.searchParams.get("text")).toBe(result.message);
    expect(result.message).toContain(customer.address);
    expect(result.message).toContain(customer.notes);
    expect(result.message).toContain(customer.fullName);
    expect(result.message).toContain(customer.phone);
    expect(result.message).toContain(customer.governorate);
    expect(result.message).toContain(customer.city);
  });
  test("includes both products and exact quantities, unit and line prices", () => {
    const result = buildCheckout(cart, products, customer, "en");
    if (!result.ok) throw new Error(result.error);
    expect(result.message).toContain("Product A\nQuantity: 2\nUnit price: EGP 185.00\nLine total: EGP 370.00");
    expect(result.message).toContain("Product B\nQuantity: 3\nUnit price: EGP 265.00\nLine total: EGP 795.00");
    expect(result.pieces).toBe(5);
    expect(result.subtotal).toBe(1165);
  });
  test("unconfigured shipping never invents a final total", () => {
    const result = buildCheckout(cart, products, customer, "en");
    if (!result.ok) throw new Error(result.error);
    expect(result.finalTotal).toBeNull();
    expect(result.message).toContain("Shipping: Not specified");
  });
  test("configured shipping is included with cent-accurate totals", () => {
    const result = buildCheckout(cart, products, customer, "en", { whatsappRecipient: "201505523958", shippingCostEGP: 75.5 });
    if (!result.ok) throw new Error(result.error);
    expect(result.finalTotal).toBe(1240.5);
  });
  test("uses edited catalog prices and quantities, without mutating the cart", () => {
    const before = JSON.stringify(cart);
    const result = buildCheckout(cart, products.map(p => ({ ...p, price: 100.25 })), customer, "en");
    if (!result.ok) throw new Error(result.error);
    expect(result.subtotal).toBe(501.25);
    expect(JSON.stringify(cart)).toBe(before);
  });
  test("blocks an empty cart", () => {
    expect(buildCheckout([], products, customer, "ar")).toEqual({ ok: false, error: "empty" });
  });
  for (const field of ["fullName", "phone", "governorate", "city", "address"] as const) {
    test(`requires ${field}`, () => {
      expect(buildCheckout(cart, products, { ...customer, [field]: "" }, "ar")).toEqual({ ok: false, error: "invalidCustomer" });
    });
  }
  test("notes are optional and Arabic phone digits normalize", () => {
    const parsed = customerSchema.parse({ ...customer, phone: "٠١٠١٢٣٤٥٦٧٨", notes: "" });
    expect(parsed.phone).toBe("01012345678");
    expect(buildCheckout(cart, products, parsed, "ar").ok).toBe(true);
  });
  test("blocks invalid quantity and stale sold-out/deleted products", () => {
    expect(buildCheckout([{ productId: "a", quantity: -1 }], products, customer, "en")).toEqual({ ok: false, error: "invalidCart" });
    expect(buildCheckout(cart, [], customer, "en")).toEqual({ ok: false, error: "unavailable" });
    expect(buildCheckout(cart, products.map(p => ({ ...p, soldOut: true })), customer, "en")).toEqual({ ok: false, error: "unavailable" });
  });
  test("inquiry prices do not create misleading totals", () => {
    const result = buildCheckout(cart, products.map(p => ({ ...p, price: null })), customer, "en");
    if (!result.ok) throw new Error(result.error);
    expect(result.subtotal).toBeNull();
    expect(result.finalTotal).toBeNull();
    expect(result.message).toContain("Price on request");
  });
  test("rejects excessive notes and nonfinite prices", () => {
    expect(customerSchema.safeParse({ ...customer, notes: "a".repeat(1001) }).success).toBe(false);
    expect(buildCheckout(cart, products.map(p => ({ ...p, price: NaN })), customer, "en")).toEqual({ ok: false, error: "invalidCart" });
  });
});