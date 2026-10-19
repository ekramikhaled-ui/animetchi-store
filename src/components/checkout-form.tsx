import { useState, type FormEvent } from "react";
import { Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { buildCheckout, customerSchema, type CheckoutError, type Customer } from "@/lib/checkout";
import { checkoutCopy } from "@/lib/checkout-copy";
import { useStore } from "@/lib/store";

const emptyCustomer: Customer = { fullName: "", phone: "", governorate: "", city: "", address: "", notes: "" };
const fields = ["fullName", "phone", "governorate", "city", "address", "notes"] as const;
const limits = { fullName: 100, phone: 30, governorate: 100, city: 100, address: 500, notes: 1000 };
export function CheckoutForm() {
  const { cart, products, language, t } = useStore();
  const c = checkoutCopy[language];
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState<Customer>(emptyCustomer);
  const [errors, setErrors] = useState<Partial<Record<keyof Customer, string>>>({});
  const [orderError, setOrderError] = useState<CheckoutError | null>(null);
  const [handoff, setHandoff] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const result = buildCheckout(cart, products, customer, language);
  function updateField(field: keyof Customer, value: string) {
    setCustomer(previous => ({ ...previous, [field]: value }));
    setErrors(previous => ({ ...previous, [field]: undefined }));
    setOrderError(null);
    setHandoff(false);
    setCopyError(false);
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHandoff(false);
    setOrderError(null);
    const parsed = customerSchema.safeParse(customer);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof Customer, string>> = {};
      for (const field of fields) if (parsed.error.flatten().fieldErrors[field]?.length) fieldErrors[field] = c.errors[field];
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    // Recompute at the click from current store values, never a saved order snapshot.
    const current = buildCheckout(cart, products, parsed.data, language);
    if (!current.ok) { setOrderError(current.error); return; }
    window.open(current.url, "_blank", "noopener,noreferrer");
    setHandoff(true);
  }
  return <>
    <Button className="mt-6 min-h-11 w-full" onClick={() => { setOpen(true); setHandoff(false); setOrderError(null); }}>{c.checkout}</Button>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent dir={language === "ar" ? "rtl" : "ltr"} className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto p-4 sm:p-6">
        <DialogTitle className="pe-7 text-start">{c.title}</DialogTitle>
        <DialogDescription className="text-start leading-6">{c.notice}</DialogDescription>
        <form onSubmit={submit} noValidate className="grid min-w-0 gap-4">
          <div className="grid min-w-0 gap-4 sm:grid-cols-2">
            {fields.map(field => <div key={field} className={`min-w-0 space-y-2 ${field === "address" || field === "notes" ? "sm:col-span-2" : ""}`}>
              <Label htmlFor={`checkout-${field}`}>{c[field]}{field !== "notes" ? " *" : ""}</Label>
              {field === "address" || field === "notes" ? <Textarea id={`checkout-${field}`} value={customer[field]} required={field !== "notes"} maxLength={limits[field]} autoComplete={field === "address" ? "street-address" : "off"} aria-invalid={Boolean(errors[field])} aria-describedby={errors[field] ? `checkout-${field}-error` : undefined} onChange={event => updateField(field, event.target.value)} className="min-h-20" /> : <Input id={`checkout-${field}`} value={customer[field]} required maxLength={limits[field]} type={field === "phone" ? "tel" : "text"} dir={field === "phone" ? "ltr" : undefined} autoComplete={{ fullName: "name", phone: "tel", governorate: "address-level1", city: "address-level2" }[field]} aria-invalid={Boolean(errors[field])} aria-describedby={errors[field] ? `checkout-${field}-error` : undefined} onChange={event => updateField(field, event.target.value)} className="min-h-11" />}
              {errors[field] ? <p id={`checkout-${field}-error`} role="alert" className="text-sm text-destructive">{errors[field]}</p> : null}
            </div>)}
          </div>
          {result.ok ? <div className="min-w-0 border-t pt-4"><h3 className="mb-3 font-bold">{c.preview}</h3><pre className="max-h-60 overflow-y-auto whitespace-pre-wrap break-words font-sans text-sm leading-6">{result.message}</pre><Button type="button" variant="outline" className="mt-3 min-h-11" onClick={async () => { try { await navigator.clipboard.writeText(result.message); setCopyError(false); } catch { setCopyError(true); } }}><Copy />{t.copyMessage}</Button>{copyError ? <p role="alert" className="mt-2 text-sm text-destructive">{language === "ar" ? "تعذر النسخ؛ يمكنك تحديد نص المعاينة ونسخه يدوياً." : "Could not copy; select the preview text and copy it manually."}</p> : null}</div> : result.error !== "invalidCustomer" ? <p role="alert" className="text-sm text-destructive">{c.orderErrors[result.error]}</p> : null}
          {orderError ? <p role="alert" className="text-sm text-destructive">{c.orderErrors[orderError]}</p> : null}
          <Button type="submit" className="h-auto min-h-11 w-full whitespace-normal py-3"><ExternalLink className="shrink-0" />{c.confirm}</Button>
          {handoff && result.ok ? <div role="status" className="min-w-0 space-y-3 border-t pt-3"><p className="text-sm leading-6">{c.handoff}</p><Button asChild variant="outline" className="h-auto min-h-11 w-full whitespace-normal py-2"><a href={result.url} target="_blank" rel="noopener noreferrer"><ExternalLink />{c.retry}</a></Button></div> : null}
        </form>
      </DialogContent>
    </Dialog>
  </>;
}