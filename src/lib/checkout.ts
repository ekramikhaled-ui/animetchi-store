import { z } from "zod";
import type { Product } from "./catalog";
import type { Language } from "./i18n";
import { checkoutConfig } from "./checkout-config";
import { selectedVariant, variantName, variantPrice, type VariantCartLine } from "./product-variants";

const normalizeDigits = (value: string) => value.replace(/[٠-٩۰-۹]/g, digit => {
  const code = digit.charCodeAt(0);
  return String(code >= 0x06f0 ? code - 0x06f0 : code - 0x0660);
});
const text = (min: number, max: number) => z.string().trim().min(min).max(max).refine(value => !/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value));
export const customerSchema = z.object({
  fullName: text(3, 100).refine(value => value.split(/\s+/).length >= 2),
  phone: z.string().trim().max(30).transform(value => normalizeDigits(value).replace(/[\s()-]/g, "")).refine(value => /^(?:01[0125]\d{8}|\+?[1-9]\d{7,14})$/.test(value)),
  governorate: text(2, 100),
  city: text(2, 100),
  address: text(8, 500),
  notes: text(0, 1000),
});
export type Customer = z.infer<typeof customerSchema>;
export type CheckoutCartLine = VariantCartLine;
export type CheckoutError = "empty" | "unavailable" | "invalidCart" | "invalidCustomer" | "configuration" | "tooLong";
type Result = { ok: true; message: string; url: string; pieces: number; subtotal: number | null; finalTotal: number | null } | { ok: false; error: CheckoutError };
const cartSchema = z.array(z.object({ productId: text(1, 100), quantity: z.number().int().min(1).max(999), variant: text(1, 100).optional(), variantId: text(1, 200).optional(), variantName: text(1, 100).optional(), variantImage: z.string().optional() })).max(100);
const priceSchema = z.number().finite().min(0).max(10000000).nullable();
const formatPrice = (value: number, language: Language) => new Intl.NumberFormat(language === "ar" ? "ar-EG" : "en-EG", { style: "currency", currency: "EGP", maximumFractionDigits: 2 }).format(value);

export function buildCheckout(cart: CheckoutCartLine[], products: Product[], customer: unknown, language: Language, config = checkoutConfig): Result {
  const validatedCustomer = customerSchema.safeParse(customer);
  if (!validatedCustomer.success) return { ok: false, error: "invalidCustomer" };
  const validatedCart = cartSchema.safeParse(cart);
  if (!validatedCart.success) return { ok: false, error: "invalidCart" };
  if (!validatedCart.data.length) return { ok: false, error: "empty" };
  if (!/^[1-9]\d{7,14}$/.test(config.whatsappRecipient) || !priceSchema.safeParse(config.shippingCostEGP).success) return { ok: false, error: "configuration" };
  const ar = language === "ar";
  const c = validatedCustomer.data;
  const parts = [ar ? "طلب جديد من متجر أنيميتشي" : "New order from Animetchi", ar ? "المنتجات والأسعار تجريبية؛ التوفر وقبول الطلب يحتاجان تأكيد المتجر." : "Sample products and prices; availability and order acceptance require store confirmation.", "", `${ar ? "اسم العميل" : "Customer name"}: ${c.fullName}`, `${ar ? "رقم الهاتف" : "Phone"}: ${c.phone}`, `${ar ? "المحافظة" : "Governorate"}: ${c.governorate}`, `${ar ? "المنطقة / المدينة" : "Area / city"}: ${c.city}`, `${ar ? "العنوان بالتفصيل" : "Detailed address"}: ${c.address}`, "", ar ? "المنتجات المطلوبة:" : "Requested products:"];
  let cents = 0;
  let pieces = 0;
  let unknownPrice = false;
  for (const line of validatedCart.data) {
    const product = products.find(item => item.id === line.productId);
    if (!product || product.soldOut) return { ok: false, error: "unavailable" };
    if (!priceSchema.safeParse(product.price).success || !text(1, 200).safeParse(product.name[language]).success) return { ok: false, error: "invalidCart" };
    const option = selectedVariant(product, line);
    if ((product.variants?.length || line.variantId) && !option) return { ok: false, error: "invalidCart" };
    if (option && !option.inStock) return { ok: false, error: "unavailable" };
    const price = variantPrice(product, option);
    if (!priceSchema.safeParse(price).success) return { ok: false, error: "invalidCart" };
    const variant = line.variantName ?? (option ? variantName(option, language) : line.variant);
    const unitCents = price === null ? null : Math.round(price * 100);
    const lineCents = unitCents === null ? null : unitCents * line.quantity;
    unknownPrice ||= lineCents === null;
    cents += lineCents ?? 0;
    pieces += line.quantity;
    parts.push("", `${product.name[language]}${variant ? ` (${variant})` : ""}`, `${ar ? "الكمية" : "Quantity"}: ${line.quantity}`, `${ar ? "سعر الوحدة" : "Unit price"}: ${unitCents === null ? (ar ? "السعر عند الطلب" : "Price on request") : formatPrice(unitCents / 100, language)}`, `${ar ? "إجمالي المنتج" : "Line total"}: ${lineCents === null ? (ar ? "يحتاج تأكيد السعر" : "Price confirmation required") : formatPrice(lineCents / 100, language)}`);
  }
  const subtotal = unknownPrice ? null : cents / 100;
  const shipping = config.shippingCostEGP === null ? null : Math.round(config.shippingCostEGP * 100) / 100;
  const finalTotal = subtotal === null || shipping === null ? null : (cents + Math.round(shipping * 100)) / 100;
  parts.push("", `${ar ? "إجمالي عدد القطع" : "Total pieces"}: ${pieces}`, `${ar ? "إجمالي قيمة المنتجات" : "Product total"}: ${subtotal === null ? (ar ? "غير مكتمل؛ توجد أسعار تحتاج التأكيد" : "Incomplete; some prices require confirmation") : formatPrice(subtotal, language)}`, `${ar ? "تكلفة الشحن" : "Shipping"}: ${shipping === null ? (ar ? "غير محددة؛ يؤكدها المتجر" : "Not specified; the store will confirm") : formatPrice(shipping, language)}`, `${ar ? "إجمالي المبلغ النهائي" : "Final total"}: ${finalTotal === null ? (ar ? "يُحدد بعد تأكيد الأسعار والشحن" : "Pending price and shipping confirmation") : formatPrice(finalTotal, language)}`);
  if (c.notes) parts.push("", `${ar ? "ملاحظات العميل" : "Customer notes"}: ${c.notes}`);
  const message = parts.join("\n");
  if (message.length > 12000) return { ok: false, error: "tooLong" };
  return { ok: true, message, url: `https://wa.me/${config.whatsappRecipient}?text=${encodeURIComponent(message)}`, pieces, subtotal, finalTotal };
}