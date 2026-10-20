import type { Bilingual, Product, ProductVariant } from "./catalog";

export type VariantCartLine = { productId: string; quantity: number; variant?: string; variantId?: string; variantName?: string; variantImage?: string };

// Keep old bilingual options and saved cart labels usable without resetting catalog edits.
export function normalizeProductVariants(product: Product): Product {
  const options = product.variants as unknown as (ProductVariant | Bilingual)[] | undefined;
  if (!options) return product;
  return { ...product, variants: options.map((option, index) => "id" in option
    ? { ...option, inStock: option.inStock ?? true }
    : { id: `${product.id}-option-${index + 1}`, name: option.en, image: product.image, inStock: true, labels: option }) };
}

export function selectedVariant(product: Product, line: Pick<VariantCartLine, "variantId" | "variant">) {
  return product.variants?.find(item => line.variantId ? item.id === line.variantId : item.name === line.variant || item.labels?.en === line.variant);
}
export const variantName = (variant: ProductVariant, language: "en" | "ar") => variant.labels?.[language] ?? variant.name;
export const variantPrice = (product: Product, variant?: ProductVariant) => product.price === null ? null : variant?.price ?? product.price;
export function canPurchase(product: Product, variant?: ProductVariant) {
  const price = variantPrice(product, variant);
  return !product.soldOut && price !== null && Number.isFinite(price) && price >= 0 && (!product.variants?.length || Boolean(variant && variant.inStock && product.variants.some(item => item.id === variant.id)));
}
export function cartSelection(product: Product, variant?: ProductVariant): Omit<VariantCartLine, "quantity"> {
  return { productId: product.id, ...(variant ? { variantId: variant.id, variant: variant.name, variantName: variant.name, variantImage: variant.image } : {}) };
}
export function migrateVariantCart(cart: VariantCartLine[], products: Product[]) {
  return cart.map(line => {
    const product = products.find(item => item.id === line.productId);
    const variant = product ? selectedVariant(product, line) : undefined;
    return product && variant ? { ...cartSelection(product, variant), ...line, variantId: variant.id, variantName: line.variantName ?? variant.name, variantImage: line.variantImage ?? variant.image } : line;
  });
}
export function validVariants(variants: ProductVariant[]) {
  return new Set(variants.map(item => item.id)).size === variants.length && variants.every(item => item.id.trim() && item.name.trim() && item.name.trim().length <= 100 && item.image.trim() && (item.price === undefined || (Number.isFinite(item.price) && item.price >= 0)));
}