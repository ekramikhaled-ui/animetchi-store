import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { copy, type Language } from "./i18n";
import { initialProducts, type Product } from "./catalog";

type CartLine = { productId: string; quantity: number; variant?: string };
type DemoUser = { name: string; email: string } | null;
type StoreValue = {
  language: Language; setLanguage: (language: Language) => void; t: typeof copy.en | typeof copy.ar;
  cart: CartLine[]; addToCart: (id: string, quantity?: number, variant?: string) => void; setQuantity: (index: number, quantity: number) => void; removeFromCart: (index: number) => void; clearCart: () => void;
  wishlist: string[]; toggleWishlist: (id: string) => void;
  user: DemoUser; login: (name: string, email: string) => void; logout: () => void;
  products: Product[]; setProducts: (products: Product[]) => void; resetProducts: () => void;
  demoAdminUnlocked: boolean; unlockDemoAdmin: (password: string) => boolean;
};

const StoreContext = createContext<StoreValue | null>(null);
const readStorage = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try { const value = window.localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback; } catch { return fallback; }
};

// Upgrade seed content once without discarding local edits or deleted legacy rows.
const upgradeCatalog = (saved: Product[]): Product[] => {
  const legacyIds = new Set(["moon-fox-charm", "orbit-pin-set", "fan-display-kit", "arcade-desk-mat", "scene-capsule", "cloud-dew-set", "ramen-discovery-box", "panel-reader-kit", "night-shift-tee", "signal-tote"]);
  const upgraded = saved.map((product) => {
    const seed = initialProducts.find((item) => item.id === product.id);
    if (!seed || !legacyIds.has(product.id)) return product;
    const oldImage = product.image.includes("category-");
    const { price, status, name, ...attributes } = seed;
    return { ...attributes, ...product, ...(oldImage ? { image: seed.image } : {}), franchises: product.franchises ?? seed.franchises ?? [],
      ...(product.id === "scene-capsule" && product.name.en === "Scene Capsule Display" ? { name, description: seed.description, details: seed.details } : {}),
      ...((product.id === "scene-capsule" || product.id === "cloud-dew-set") && product.status === "inquiry" && product.price === null ? { price, status } : {}),
      soldOut: product.soldOut ?? product.id === "orbit-pin-set" };
  });
  return [...upgraded, ...initialProducts.filter((item) => !legacyIds.has(item.id) && !saved.some((product) => product.id === item.id))];
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [demoAdminUnlocked, setDemoAdminUnlocked] = useState(false);
  const [language, setLanguageState] = useState<Language>("en");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [user, setUser] = useState<DemoUser>(null);
  const [products, setProductsState] = useState<Product[]>(initialProducts);
  useEffect(() => {
    setLanguageState(readStorage("ah-language", "en")); setCart(readStorage("ah-cart", [])); setWishlist(readStorage("ah-wishlist", [])); setUser(readStorage("ah-user", null));
    const saved = readStorage<Product[]>("ah-products", initialProducts);
    const upgraded = readStorage<number>("ah-catalog-version", 1) < 2 ? upgradeCatalog(saved) : saved;
    setProductsState(upgraded); setHydrated(true);
  }, []);
  useEffect(() => { if (!hydrated) return; document.documentElement.lang = language; document.documentElement.dir = language === "ar" ? "rtl" : "ltr"; localStorage.setItem("ah-language", JSON.stringify(language)); }, [hydrated, language]);
  useEffect(() => { if (hydrated) localStorage.setItem("ah-cart", JSON.stringify(cart)); }, [cart, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem("ah-wishlist", JSON.stringify(wishlist)); }, [wishlist, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem("ah-user", JSON.stringify(user)); }, [user, hydrated]);
  useEffect(() => { if (hydrated) { localStorage.setItem("ah-products", JSON.stringify(products)); localStorage.setItem("ah-catalog-version", "2"); } }, [products, hydrated]);
  const value = useMemo<StoreValue>(() => ({
    language, setLanguage: setLanguageState, t: copy[language], cart,
    demoAdminUnlocked, unlockDemoAdmin: (password) => { const valid = password === "1234"; if (valid) setDemoAdminUnlocked(true); return valid; },
    addToCart: (productId, quantity = 1, variant) => { const product = products.find((item) => item.id === productId); if (!product || product.soldOut || product.price === null) return; setCart((lines) => { const index = lines.findIndex((line) => line.productId === productId && line.variant === variant); if (index < 0) return [...lines, { productId, quantity, ...(variant ? { variant } : {}) }]; return lines.map((line, i) => i === index ? { ...line, quantity: line.quantity + quantity } : line); }); },
    setQuantity: (index, quantity) => setCart((lines) => quantity < 1 ? lines.filter((_, i) => i !== index) : lines.map((line, i) => { if (i !== index) return line; const product = products.find((item) => item.id === line.productId); if (product?.soldOut && quantity > line.quantity) return line; return { ...line, quantity }; })),
    removeFromCart: (index) => setCart((lines) => lines.filter((_, i) => i !== index)), clearCart: () => setCart([]),
    wishlist, toggleWishlist: (id) => setWishlist((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]),
    user, login: (name, email) => setUser({ name, email }), logout: () => setUser(null), products, setProducts: setProductsState, resetProducts: () => setProductsState(initialProducts),
  }), [language, cart, wishlist, user, products, demoAdminUnlocked]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() { const value = useContext(StoreContext); if (!value) throw new Error("StoreProvider is missing"); return value; }