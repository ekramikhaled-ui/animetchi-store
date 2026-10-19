import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useState } from "react";
import { BrandMark } from "./brand-mark";
import { DemoAdminEntry } from "./demo-admin-entry";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useStore } from "@/lib/store";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const { categories, language, setLanguage, t, cart } = useStore();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const nav = [{ to: "/", label: t.home }, { to: "/shop", label: t.shop }, { to: "/wholesale", label: t.wholesale }, { to: "/about", label: t.about }, { to: "/contact", label: t.contact }] as const;
  const count = cart.reduce((sum, line) => sum + line.quantity, 0);
  return <div className="min-h-screen bg-background text-foreground">
    <div className="bg-ink px-4 py-2 text-center text-[11px] font-semibold text-ink-foreground">{t.demo}</div>
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto grid h-18 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-2 sm:flex sm:gap-4 sm:px-4 md:px-6">
        <div className="flex min-w-0 items-center gap-1 sm:gap-4">
        <Sheet open={open} onOpenChange={setOpen}><SheetTrigger asChild><Button variant="ghost" size="icon" className="size-8 shrink-0 sm:size-10 lg:hidden" aria-label={t.menu}><Menu /></Button></SheetTrigger><SheetContent side={language === "ar" ? "right" : "left"} className="flex max-h-dvh w-[88vw] max-w-sm flex-col gap-0 overflow-hidden p-0"><SheetTitle className="sr-only">{t.menu}</SheetTitle><div className="shrink-0 border-b p-5"><BrandMark /></div><nav className="grid min-h-0 flex-1 content-start overflow-y-auto overscroll-contain p-3">{nav.map((item) => <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="border-b px-3 py-4 font-bold">{item.label}</Link>)}<p className="px-3 pb-2 pt-6 text-xs font-bold uppercase text-muted-foreground">{t.categories}</p>{categories.map((category) => <Link key={category.slug} to="/category/$categorySlug" params={{ categorySlug: category.slug }} onClick={() => setOpen(false)} className="px-3 py-2 text-sm">{category.name[language]}</Link>)}</nav></SheetContent></Sheet>
        <Link to="/" className="min-w-0 [&>span]:gap-1 [&>span]:text-xs [&>span>span:last-child]:truncate sm:[&>span]:gap-2 sm:[&>span]:text-base"><BrandMark /></Link>
        </div>
        <nav className="ms-auto hidden items-center gap-6 lg:flex">{nav.map((item) => <Link key={item.to} to={item.to} className={`text-sm font-semibold transition hover:text-primary ${pathname === item.to ? "text-primary" : ""}`}>{item.label}</Link>)}</nav>
        <div className="ms-auto flex shrink-0 items-center gap-1 [&>a]:size-8 sm:[&>a]:size-10 lg:ms-3">
          <Button variant="ghost" size="icon" asChild><Link to="/shop" search={{ q: "" }} aria-label={t.search}><Search /></Link></Button>
          <Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex"><Link to="/wishlist" aria-label={t.wishlist}><Heart /></Link></Button>
          <Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex"><Link to="/account" aria-label={t.account}><UserRound /></Link></Button>
          <Button variant="ghost" size="icon" asChild className="relative"><Link to="/cart" aria-label={`${t.cart}: ${count}`}><ShoppingBag />{count > 0 ? <span className="absolute end-0 top-0 grid size-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">{count}</span> : null}</Link></Button>
          <Button variant="outline" size="sm" onClick={() => setLanguage(language === "en" ? "ar" : "en")} className="ms-1 min-w-12 shrink-0 px-2 sm:min-w-16">{t.language}</Button>
        </div>
      </div>
    </header>
    <main>{children}</main>
    <footer className="border-t bg-ink text-ink-foreground"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]"><div><BrandMark /><p className="mt-5 max-w-md text-sm leading-7 text-ink-muted">{t.footerText}</p></div><div><p className="mb-4 text-xs font-bold uppercase text-primary">{t.categories}</p><div className="grid gap-2 text-sm">{categories.slice(0,4).map((category) => <Link key={category.slug} to="/category/$categorySlug" params={{ categorySlug: category.slug }} className="text-ink-muted hover:text-ink-foreground">{category.name[language]}</Link>)}</div></div><div><p className="mb-4 text-xs font-bold uppercase text-primary">{t.contact}</p><p className="text-sm leading-7 text-ink-muted">contact@example.com<br />WhatsApp: {language === "ar" ? "يُضاف قبل الإطلاق" : "Add before launch"}<br />Social links: {language === "ar" ? "عناصر نائبة" : "placeholders"}</p></div></div><div className="border-t border-ink-border px-5 py-5 text-center text-xs text-ink-muted">© 2026 Animetchi Demo Store<div className="mt-3"><DemoAdminEntry /></div></div></footer>
  </div>;
}