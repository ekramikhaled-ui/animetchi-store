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
