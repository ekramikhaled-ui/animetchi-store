import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStore } from "@/lib/store";

export function DemoAuthForm({ mode }: { mode: "login" | "register" | "forgot" }) {
  const { t, login } = useStore(); const [show, setShow] = useState(false); const [notice, setNotice] = useState("");
  const submit = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); const data = new FormData(event.currentTarget); const email = String(data.get("email") ?? ""); const name = String(data.get("name") ?? "Demo customer"); if (!email.includes("@")) { setNotice(t.required); return; } if (mode !== "forgot") login(name || "Demo customer", email); setNotice(t.sentDemo); };
  return <form onSubmit={submit} className="space-y-5">
    {mode === "register" ? <div><Label htmlFor="name">{t.name}</Label><Input id="name" name="name" className="mt-2" required /></div> : null}
    <div><Label htmlFor="email">{t.email}</Label><Input id="email" name="email" type="email" className="mt-2" required /></div>
    {mode !== "forgot" ? <div><Label htmlFor="password">{t.password}</Label><div className="relative mt-2"><Input id="password" name="password" type={show ? "text" : "password"} required minLength={6} className="pe-12" /><Button type="button" variant="ghost" size="icon" onClick={() => setShow(!show)} className="absolute end-1 top-1" aria-label={t.showPassword}>{show ? <EyeOff /> : <Eye />}</Button></div></div> : null}
    <Button type="submit" className="w-full">{mode === "login" ? t.login : mode === "register" ? t.register : t.submit}</Button>
    {notice ? <p role="status" className="text-sm font-semibold text-primary">{notice}</p> : null}<p className="text-xs leading-5 text-muted-foreground">{t.demoAuth}</p>
  </form>;
}