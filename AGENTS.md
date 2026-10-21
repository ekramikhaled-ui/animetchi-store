<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep simulated product availability separate from sample/inquiry pricing status and enforce it in the shared store and purchasing UI, so every product view stays consistent.
- The admin entry is a client-side demonstration gate only, not authorization; keep its unlock state in memory and retain the visible demo disclaimer.
- Keep franchise identifiers and optional labeled gallery images in the shared product model; all browsing uses that model to avoid divergent catalog views.
- Version local demo catalog seed upgrades and merge existing edits, cart IDs and deletions rather than clearing storage; visitors must retain working demo state.
- Keep click-to-chat checkout validation and message calculation in a browser-safe shared module with public configuration; no messaging API or order persistence is involved, so customer details remain in ephemeral form state and the cart is never cleared by handoff.
- All runtime category browsing reads the shared store; persist product/category edits atomically in one local demo snapshot and retain legacy storage as a migration fallback, so uploads and custom categories survive reloads without overwriting existing edits.
- Keep the product editor separate from admin listings and apply drafts through browser-safe catalog helpers, preserving product IDs, variants, franchises and secondary gallery images during edits.

- Store the primary cover in Product.image and the managed secondary image in Product.detailImage; derive a deduplicated gallery through productImages while retaining unmanaged legacy gallery entries.
- Reuse CatalogImageInput for cover, detail and category media so independent upload, URL, preview and readiness validation remain consistent.
- Normalize legacy bilingual options into stable dynamic variants without resetting saved catalog/cart data; shared browser-safe variant helpers govern selection, live prices and simulated availability across purchasing paths.
- Preserve variant ID, name and image on cart lines, while reading current catalog prices/availability for checkout; include public image URLs but never base64 uploads in click-to-chat messages to avoid oversized handoffs.
