# Anime House premium bilingual e-commerce demo

## Product direction
Build a complete, private concept storefront—not an official business site—with a bold editorial retail identity: charcoal anchors, warm orange actions, clean off-white shopping surfaces, restrained secondary accents, crisp borders, and subtle motion. Use an Arabic/English-capable font family and a compact mobile-first layout that becomes more editorial on larger screens.

Every customer-facing area will include a visible but unobtrusive demo notice. Products, prices, availability, contact details, wholesale terms, accounts, inquiries, and admin changes will be identified as samples where relevant.

## Experience map

### Shared storefront shell
- Create a responsive sticky header with brand mark, desktop navigation, category menu, search, language control, account, wishlist, and cart count.
- Create a compact mobile header and accessible slide-out menu that closes after navigation.
- Create a shared footer with navigation, categories, editable contact/social placeholders, language note, and concept disclaimer.
- Add localized 404 and error experiences, focus states, keyboard support, reduced-motion behavior, and image fallbacks.

### Public pages
- **Home `/`**: dark immersive hero, category discovery, featured sample products, concept story, wholesale callout, and contact callout.
- **Shop `/shop`**: combined keyword search, category and subcategory filters, demo-price range, sorting, result count, clear-all action, responsive filter drawer, and no-results recovery.
- **Category `/category/$categorySlug`**: localized category introduction and filtered product collection.
- **Product `/product/$productId`**: breadcrumb, image gallery, translated details, contextual attributes/variants, quantity control, cart and wishlist actions, wholesale inquiry, and related products. Missing IDs receive a polished not-found state.
- **Cart `/cart`**: quantity editing, remove and clear actions, priced subtotal, separate price-on-request handling, order summary preview, and configurable WhatsApp demo handoff without implying payment or confirmation.
- **Wishlist `/wishlist`**: saved product grid and empty state.
- **Wholesale `/wholesale`**: explanation, suitable categories, terms-confirmation notice, and validated inquiry form with optional product/category interests and message preview.
- **About `/about`** and **Contact `/contact`**: concept-focused copy and clearly marked placeholder contact channels without invented facts.
- Give every public route unique title, description, Open Graph title/description, Open Graph type, and Twitter card metadata.

### Demo identity and account
- **Login `/login`**, **register `/register`**, and **forgot password `/forgot-password`**: translated validation, password visibility, submission/loading/success states, and explicit local-demo security messaging.
- **Account `/account`**: editable sample profile, saved products, empty order/inquiry history placeholders, and logout.
- Implement session-only/local demo identity; never retain real passwords or imply production security.

### Admin demonstration
- **Admin `/admin`**: explicit demo entry and responsive owner workspace with overview, products, categories, inquiries/orders placeholders, and settings placeholders.
- Product management supports local search/filter, add, edit, remove, feature toggle, sample price updates, bilingual fields, attributes, and category assignment.
- Keep customer catalog data read-only by default; admin edits persist locally for demonstration and can be reset to the supplied sample set.
- No exposed production credential or claim of real authorization.

## Data and behavior
- Create typed, centralized category and product models covering bilingual text, subcategories, coherent image assets, demo prices, inquiry-only pricing, status, tags, featured state, optional variants/sizes, and relevant format/volume metadata.
- Seed a balanced set of clearly labeled sample items across all eight requested categories; avoid franchises, health claims, ratings, stock pressure, and unverified business claims.
- Store all interface copy in centralized English and natural Arabic dictionaries. The language switch updates `lang`, `dir`, alignment, directional icons, menus, dialogs, forms, validation, empty states, account, and admin copy; preference persists locally.
- Add reusable providers for language, cart, wishlist, demo identity, and admin catalog changes with versioned/safely parsed browser storage.
- Cart logic will merge matching products/variants, enforce positive quantities, exclude inquiry-only items from totals, and clearly separate priced versus confirmation-required lines.
- WhatsApp links use one configuration placeholder. If no real number is configured, users can review/copy the encoded message but cannot be misdirected to an invented contact.
- Inquiry and contact forms validate locally, show a preview/success demonstration, and clearly state that nothing is transmitted or confirmed.

## Design system and assets
- Define semantic color, typography, spacing, border, focus, and shadow tokens for light retail surfaces and dark brand bands; avoid hardcoded page colors.
- Build reusable controls and patterns: buttons, icon buttons with tooltips, fields, select/checkbox/slider controls, dialogs/drawers, badges, notices, toasts, empty/loading states, product cards, category cards, gallery, quantity stepper, and breadcrumbs.
- Create a cohesive original asset set for the hero, eight categories, and representative products using abstract collectible/product-still imagery without copyrighted characters or franchise logos. Keep stable image ratios and descriptive bilingual alt text.
- Use subtle menu, card, cart, and section transitions only; honor reduced motion.

## Responsive and accessibility quality
- Design explicitly for small mobile, large mobile, tablet, laptop, and desktop; prevent horizontal overflow and preserve product/image ratios and touch targets.
- Adapt dense shop filters, product gallery, cart, account, forms, and admin tables into usable mobile drawers, stacked layouts, or compact lists rather than shrinking desktop UI.
- Validate semantic headings, labels, error associations, contrast, keyboard navigation, visible focus, dialog focus behavior, touch sizing, long Arabic/English labels, and RTL ordering.

## Technical structure
- Use the existing TanStack file-based routes and shared root shell; create every linked route together and keep route-specific metadata on each leaf page.
- Separate static catalog/configuration, translations, state providers, reusable commerce components, and page composition.
- Keep this first version frontend-only as requested: no real authentication, orders, payments, newsletter collection, inventory, or message delivery.
- Use lightweight existing packages and browser-native behavior; add only a focused state/form dependency if the existing stack cannot cover the interaction cleanly.

## Verification
- Exercise English LTR and Arabic RTL across all pages and dialogs.
- Test navigation, mobile menu closure, search, combined filters, sorting, product variants, wishlist, cart merge/quantity/remove/clear/subtotal, inquiry-only items, WhatsApp preview/copy, demo account flows, and admin CRUD/reset.
- Check empty, invalid, missing-product, failed-validation, missing-image, and 404 states.
- Inspect representative 390px mobile, tablet, and desktop layouts for overflow, clipping, overlap, long text, and touch usability.
- Confirm all links resolve, each route has distinct metadata, the console is clean, and the central storefront flow works end to end.
