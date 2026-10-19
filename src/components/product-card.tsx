import { Link } from "@tanstack/react-router";
import { Heart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCategory, money, type Product } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export function ProductCard({ product }: { product: Product }) {
  const { language, t, addToCart, wishlist, toggleWishlist } = useStore();
  const category = getCategory(product.category);
  const saved = wishlist.includes(product.id);
  return <article className="group flex min-w-0 flex-col">
    <div className="relative aspect-[4/5] overflow-hidden bg-muted">
      <Link to="/product/$productId" params={{ productId: product.id }} aria-label={`${t.view}: ${product.name[language]}`} className="block h-full">
        <img src={product.image} alt={product.name[language]} width={1024} height={1024} loading="lazy" className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.03]" />
      </Link>
      <Button size="icon" variant="secondary" onClick={() => toggleWishlist(product.id)} aria-label={saved ? t.saved : t.save} className="absolute end-3 top-3 shadow-sm"><Heart className={saved ? "fill-primary text-primary" : ""} /></Button>
      {product.soldOut ? <span className="absolute start-3 top-3 bg-secondary px-2 py-1 text-xs font-bold text-secondary-foreground">{t.soldOut}</span> : null}
      <span className="absolute bottom-3 start-3 bg-background/95 px-2 py-1 text-[11px] font-bold uppercase text-foreground">{product.status === "sample" ? t.sampleProduct : t.inquiryPrice}</span>
    </div>
    <div className="flex flex-1 flex-col pt-4">
      <p className="text-xs font-semibold uppercase text-muted-foreground">{category?.name[language]}</p>
      <div className="mt-1 min-w-0">
        <Link to="/product/$productId" params={{ productId: product.id }} className="block min-h-12 min-w-0 break-words font-bold leading-snug hover:text-primary">{product.name[language]}</Link>
        <p className="mt-2 text-xs text-muted-foreground">{product.price === null ? t.inquiryPrice : t.samplePrice}</p>
        <span className="block text-sm font-bold">{product.price === null ? "—" : money(product.price, language)}</span>
      </div>
      <Button onClick={() => addToCart(product.id)} disabled={product.soldOut || product.price === null} className="mt-4 h-auto min-h-11 w-full whitespace-normal px-2 py-2 text-xs sm:text-sm"><Plus className="shrink-0" />{product.soldOut ? t.soldOut : product.price === null ? t.inquiryPrice : t.addCart}</Button>
    </div>
  </article>;
}