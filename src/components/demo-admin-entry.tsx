import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useStore } from "@/lib/store";

export function DemoAdminEntry({ initiallyOpen = false }: { initiallyOpen?: boolean }) {
  const { t, language, demoAdminUnlocked, unlockDemoAdmin } = useStore();
  const router = useRouter();
  const [open, setOpen] = useState(initiallyOpen);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!unlockDemoAdmin(password)) { setError(true); return; }
    setPassword("");
    setOpen(false);
    await router.navigate({ to: "/admin" });
  }

  return <Dialog open={open} onOpenChange={(value) => { setOpen(value); setError(false); setPassword(""); }}>
    <DialogTrigger asChild><Button variant="link" className="h-auto whitespace-normal p-0 text-xs text-inherit" onClick={(event) => {
      if (demoAdminUnlocked) { event.preventDefault(); void router.navigate({ to: "/admin" }); }
    }}>{t.adminLink}</Button></DialogTrigger>
    <DialogContent dir={language === "ar" ? "rtl" : "ltr"} className="max-h-[90dvh] w-[calc(100%-2rem)] overflow-y-auto text-start">
      <DialogTitle className="pe-6">{t.adminPasswordTitle}</DialogTitle>
      <DialogDescription>{t.adminNotice}</DialogDescription>
      <form onSubmit={submit} className="grid gap-4">
        <label htmlFor="demo-admin-password" className="text-sm font-semibold">{t.password}</label>
        <Input id="demo-admin-password" type="password" value={password} onChange={(event) => { setPassword(event.target.value); setError(false); }} autoComplete="off" inputMode="numeric" required aria-invalid={error} aria-describedby={error ? "demo-admin-error" : undefined} />
        {error ? <p id="demo-admin-error" role="alert" className="text-sm text-destructive">{t.adminPasswordError}</p> : null}
        <Button type="submit"><LockKeyhole />{t.adminEnter}</Button>
      </form>
    </DialogContent>
  </Dialog>;
}