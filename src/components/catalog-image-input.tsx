import { useRef, useState } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { editorCopy } from "@/lib/catalog-editor-copy";
import { useStore } from "@/lib/store";

export type ImageValue = { image: string; ready: boolean; reading: boolean };
export function CatalogImageInput({ id, label, ratio = "square", value, onChange }: { id: string; label: string; ratio?: "cover" | "square"; value: ImageValue; onChange: (value: ImageValue) => void }) {
  const { language } = useStore(); const c = editorCopy[language];
  const input = useRef<HTMLInputElement>(null); const version = useRef(0);
  const [url, setUrl] = useState(/^https?:\/\//.test(value.image) ? value.image : "");
  const [error, setError] = useState(false);
  function change(image: string) { version.current++; setError(false); onChange({ image, ready: false, reading: false }); }
  function upload(file?: File) {
    if (!file) return;
    if (!file.type.startsWith("image/")) { setError(true); return; }
    const current = ++version.current; setError(false); onChange({ ...value, reading: true });
    const reader = new FileReader();
    reader.onload = () => { if (version.current !== current) return; if (typeof reader.result === "string") { setUrl(""); onChange({ image: reader.result, ready: false, reading: false }); } else { setError(true); onChange({ ...value, reading: false }); } };
    reader.onerror = () => { if (version.current === current) { setError(true); onChange({ ...value, reading: false }); } };
    reader.readAsDataURL(file);
  }
  return <div className="min-w-0 space-y-3">
    <Label htmlFor={`${id}-upload`}>{label}</Label>
    <div aria-label={`${label} — ${c.preview}`} className={`flex w-full items-center justify-center overflow-hidden border bg-muted ${ratio === "cover" ? "aspect-[4/5]" : "aspect-square"}`}>
      {value.image ? <img key={value.image} src={value.image} alt={label} className="h-full w-full object-contain" onLoad={() => onChange({ ...value, ready: true })} onError={() => { setError(true); onChange({ ...value, ready: false }); }} /> : <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground"><ImagePlus className="size-8" />{c.empty}</div>}
    </div>
    <input ref={input} id={`${id}-upload`} type="file" accept="image/*" className="sr-only" aria-label={`${c.upload}: ${label}`} onChange={event => upload(event.target.files?.[0])} />
    <div className="flex gap-2"><Button type="button" variant="outline" className="min-w-0 flex-1 whitespace-normal" onClick={() => { if (input.current) { input.current.value = ""; input.current.click(); } }}><ImagePlus />{c.upload}</Button><Button type="button" variant="outline" size="icon" aria-label={`${c.removeImage}: ${label}`} disabled={!value.image} onClick={() => { change(""); setUrl(""); }}><Trash2 /></Button></div>
    {value.reading ? <p role="status" className="text-sm text-muted-foreground">{c.reading}</p> : null}
    <div className="space-y-2"><Label htmlFor={`${id}-url`}>{c.url}</Label><Input id={`${id}-url`} type="url" dir="ltr" value={url} onChange={event => { setUrl(event.target.value); change(event.target.value.trim()); }} /></div>
    {error ? <p role="alert" className="text-sm text-destructive">{c.imageError}</p> : null}
  </div>;
}