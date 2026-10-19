import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductCard } from "@/components/product-card";
import { categories, franchises } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/shop")({ validateSearch: (search: Record<string, unknown>) => ({ q: typeof search["q"] === "string" ? search["q"] : "" }), head: () => ({ meta: [{ title: "Shop Sample Products — Anime House Concept" }, { name: "description", content: "Explore the bilingual Anime House sample catalog by category, franchise and price." }, { property: "og:title", content: "Shop — Anime House Concept" }, { property: "og:description", content: "Browse distinct demo merchandise by category and anime franchise." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: Shop });
function Shop() {
  const search = Route.useSearch();
  const { language, t, products } = useStore();
  const [q, setQ] = useState(search.q);
  const [category, setCategory] = useState("all");
  const [franchise, setFranchise] = useState("all");
  const [sort, setSort] = useState("featured");
  const results = useMemo(() => products.filter(p => {
    const franchiseNames = franchises.filter(f => p.franchises?.includes(f.slug)).flatMap(f => [f.name.en, f.name.ar]);
    const categoryNames = categories.find(c => c.slug === p.category)?.name;
    const text = [p.name.en, p.name.ar, p.subcategory.en, p.subcategory.ar, categoryNames?.en, categoryNames?.ar, ...p.tags, ...franchiseNames].join(" ").toLowerCase();
    return (category === "all" || p.category === category) && (franchise === "all" || (franchise === "original" ? !p.franchises?.length : p.franchises?.includes(franchise))) && text.includes(q.trim().toLowerCase());
  }).sort((a,b) => sort === "low" ? (a.price ?? Infinity) - (b.price ?? Infinity) : sort === "high" ? (b.price ?? -1) - (a.price ?? -1) : sort === "name" ? a.name[language].localeCompare(b.name[language]) : Number(b.featured) - Number(a.featured)), [products, q, category, franchise, sort, language]);
  const reset = () => { setQ(""); setCategory("all"); setFranchise("all"); setSort("featured"); };
  return <section className="mx-auto max-w-7xl px-5 py-12">
    <div className="max-w-2xl"><p className="text-xs font-bold uppercase text-primary">{t.demo}</p><h1 className="mt-3 text-4xl font-black md:text-6xl">{t.allProducts}</h1><p className="mt-4 text-muted-foreground">{t.shopCopy}</p><p className="mt-2 text-xs leading-6 text-muted-foreground">{t.sampleImagery} {t.franchiseNotice}</p></div>
    <div className="my-8 grid min-w-0 gap-3 border-y py-5 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto]">
      <div className="relative min-w-0"><Search className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"/><Input aria-label={t.search} value={q} onChange={e => setQ(e.target.value)} placeholder={t.search} className="ps-10"/></div>
      <Select value={category} onValueChange={setCategory}><SelectTrigger aria-label={t.category} className="min-h-11 w-full min-w-0 [&>span]:truncate"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="all">{t.allCategories}</SelectItem>{categories.map(c => <SelectItem key={c.slug} value={c.slug}>{c.name[language]}</SelectItem>)}</SelectContent></Select>
      <Select value={franchise} onValueChange={setFranchise}><SelectTrigger aria-label={t.franchise} className="min-h-11 w-full min-w-0 [&>span]:truncate"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="all">{t.allFranchises}</SelectItem>{franchises.map(f => <SelectItem key={f.slug} value={f.slug}>{f.name[language]}</SelectItem>)}<SelectItem value="original">{t.originalDesigns}</SelectItem></SelectContent></Select>
      <Select value={sort} onValueChange={setSort}><SelectTrigger aria-label={t.sort} className="min-h-11 w-full min-w-0 [&>span]:truncate"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="featured">{t.featuredSort}</SelectItem><SelectItem value="low">{t.lowHigh}</SelectItem><SelectItem value="high">{t.highLow}</SelectItem><SelectItem value="name">{t.nameSort}</SelectItem></SelectContent></Select>
      <Button variant="outline" className="min-h-11" onClick={reset}><SlidersHorizontal/>{t.clear}</Button>
    </div>
    <p className="mb-6 text-sm text-muted-foreground">{results.length} {t.results}</p>
    {results.length ? <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">{results.map(p => <ProductCard key={p.id} product={p}/>)}</div> : <div className="border py-20 text-center"><p className="font-bold">{t.noResults}</p><Button onClick={reset} className="mt-5">{t.reset}</Button></div>}
  </section>;
}
