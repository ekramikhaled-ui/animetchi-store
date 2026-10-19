# Animetchi Store

# PROJECT: ANIME HOUSE — PREMIUM BILINGUAL E-COMMERCE DEMO

## 1. ROLE AND MAIN OBJECTIVE

Act as a senior product designer, UX/UI designer, frontend engineer, and e-commerce architect.

Build a highly polished, premium, modern, bilingual e-commerce website DEMO for a fictionalized prototype of a real anime and pop-culture store called **Anime House**.

This website is a private concept/demo intended to showcase what a professional online store could look like to the business owner.

The website must NOT falsely represent itself as the official Anime House website, must NOT claim to be affiliated with the business, and must NOT invent real inventory, prices, stock availability, delivery policies, or business information.

Use clearly labeled demo/sample products and placeholder business information where real data is unavailable.

### Primary objective

Create a website that looks professional enough to demonstrate to a potential store owner, with a strong visual identity, excellent user experience, responsive layouts, and functional front-end interactions.

The website should feel like a real, premium, carefully designed e-commerce product—not a generic AI-generated template.

Prioritize:

1. Visual quality.

2. User experience.

3. Clear navigation.

4. Bilingual support.

5. Mobile responsiveness.

6. Functional shopping interactions.

7. Maintainable code.

8. A structure that can later be adapted into a real store.

Do not ask unnecessary clarification questions. Make sensible design decisions based on the requirements below.

---

# 2. BUSINESS CONTEXT AND PRODUCT CATEGORIES

The store concept is based on an anime and Japanese/Korean pop-culture shop.

The categories to represent in the demo are:

1. Anime Accessories

2. K-pop

3. Gaming

4. Movies & TV Series

5. Korean Beauty

6. Japanese & Korean Ramen

7. Manga

8. Clothing

These categories are based on publicly described business interests and user-provided information. They are not a verified complete inventory catalog.

Do not imply that every sample product is currently sold by Anime House.

Use a flexible category structure so real categories can be added, removed, or renamed later.

The website must support two customer types:

- Retail customers purchasing individual items.

- Wholesale customers interested in bulk purchasing and business orders.

Do not assume wholesale prices, minimum order quantities, or wholesale policies unless they are explicitly supplied later. Use a "Contact us for wholesale pricing" or equivalent demo message.

---

# 3. BRAND DIRECTION

Brand name:

ANIME HOUSE

Brand personality:

- Creative.

- Premium.

- Youthful but not childish.

- Energetic.

- Pop-culture focused.

- Modern.

- Memorable.

- Trustworthy.

- Visually distinctive.

The design should communicate anime culture and Japanese/Korean pop-culture inspiration without becoming visually chaotic.

Avoid:

- Generic AI website appearance.

- Excessive gradients.

- Excessive neon.

- Overuse of anime character images.

- Too many decorative elements.

- Poor contrast.

- Cluttered layouts.

- Random emojis as the main design language.

- Unnecessary animations.

- A design that looks like a gaming dashboard instead of a shopping store.

The result should resemble a professionally art-directed specialty e-commerce brand.

---

# 4. VISUAL DESIGN SYSTEM

Create a consistent, reusable design system.

## Color direction

Use a creative premium palette inspired by the Anime House branding, with:

- Deep charcoal or near-black as a major visual anchor.

- Warm orange as the primary accent.

- Off-white or soft neutral backgrounds for product readability.

- Carefully selected secondary accent colors.

- Accessible text contrast.

Do not use black backgrounds on every section.

Use different surfaces intelligently:

- Dark hero sections.

- Clean product browsing surfaces.

- Subtle neutral backgrounds.

- Strong accent buttons.

- Carefully designed cards.

Orange should be used strategically for:

- Primary calls to action.

- Active states.

- Selected filters.

- Important highlights.

- Brand accents.

Avoid excessive use of orange that makes the website look cheap or visually tiring.

## Typography

Use a clean, modern, highly readable font system.

The website must support both:

- English LTR.

- Arabic RTL.

Choose typography that renders Arabic and English comfortably.

Use clear hierarchy:

- Large hero heading.

- Strong section headings.

- Readable product titles.

- Comfortable body text.

- Accessible buttons and form labels.

Do not use decorative fonts that reduce readability.

## Spacing

Use a consistent spacing scale.

The design must have:

- Comfortable white space.

- Consistent content widths.

- Balanced margins.

- Clear separation between sections.

- Strong visual rhythm.

Avoid cramped cards and unnecessarily oversized empty spaces.

## Borders and shadows

Use subtle, premium borders and shadows.

Cards should feel polished and structured.

Do not overuse heavy shadows, glowing effects, or excessive rounded corners.

---

# 5. RESPONSIVE DESIGN REQUIREMENTS

The website must be fully responsive and designed mobile-first.

Support:

- Small mobile screens.

- Large mobile screens.

- Tablets.

- Laptops.

- Desktop monitors.

Do not simply shrink the desktop layout.

Explicitly optimize:

- Mobile navigation.

- Product card layouts.

- Filter controls.

- Shopping cart.

- Product details.

- Login and account forms.

- Admin dashboard.

- Arabic RTL layout.

- Touch-friendly buttons.

On mobile:

- Use a compact header.

- Provide a clear menu.

- Make search easy to access.

- Use a suitable product grid.

- Prevent horizontal scrolling.

- Ensure buttons are easy to tap.

- Ensure product images maintain appropriate proportions.

Test layouts at different widths and correct overflow, clipping, and spacing issues.

---

# 6. LANGUAGE SYSTEM — ARABIC + ENGLISH

Implement a complete bilingual interface.

Supported languages:

- English.

- Arabic.

Default language:

- English, unless a more suitable decision is needed for the demo.

Provide a clearly visible language switcher in the header.

When Arabic is selected:

- The interface should use RTL direction.

- Arabic labels and interface copy should appear naturally.

- Alignment, spacing, navigation, forms, and icons should adapt correctly.

- Product layouts must remain visually balanced.

- Do not merely translate a few buttons while leaving the rest of the interface in English.

When English is selected:

- Use LTR direction.

- Use natural, professional English.

Create a centralized translation structure so all interface strings can be edited later.

Translate:

- Navigation.

- Homepage sections.

- Buttons.

- Search and filters.

- Product details.

- Cart.

- Checkout/order forms.

- Authentication screens.

- Admin dashboard.

- Empty states.

- Error messages.

- Success messages.

- Footer.

- Wholesale contact content.

Do not use awkward literal translations.

For demo products, use suitable English and Arabic product titles or a consistent translation fallback.

---

# 7. WEBSITE STRUCTURE AND ROUTES

Create a coherent navigation system.

Required pages:

1. Homepage

2. Shop / All Products

3. Category Page

4. Product Details Page

5. Shopping Cart

6. Wholesale Page

7. About Anime House

8. Contact Page

9. Login

10. Register

11. User Account

12. Admin Dashboard

13. Wishlist or saved products, if implemented without unnecessary complexity

14. 404 / Not Found Page

The homepage should guide users naturally toward:

- Browsing products.

- Discovering categories.

- Viewing featured items.

- Contacting the store.

- Exploring wholesale ordering.

Every page must have consistent header and footer navigation.

Use meaningful URLs and avoid confusing route structures.

---

# 8. HEADER AND NAVIGATION

Create a premium, responsive header.

The header should include:

- Anime House brand/logo area.

- Home.

- Shop.

- Categories or a category dropdown.

- Wholesale.

- About.

- Contact.

- Search.

- Language switcher.

- Account icon or account link.

- Shopping cart icon with item count.

On desktop:

- Use a clear navigation layout.

- Avoid crowding.

- Use a well-designed dropdown or mega-menu if appropriate.

On mobile:

- Use a clean hamburger menu.

- Include essential links.

- Make the cart and account actions easy to reach.

- Ensure the menu closes correctly after navigation.

The header should remain visually consistent across pages.

If a sticky header is used, it must not cover content or feel intrusive.

---

# 9. HOMEPAGE DESIGN

Build a highly polished homepage with strong visual hierarchy.

## Section 1 — Hero

Create a distinctive hero section.

It should communicate:

- Anime.

- Pop culture.

- Discovery.

- Collecting.

- Lifestyle.

- Japanese/Korean-inspired products.

Include:

- Strong headline.

- Supporting description.

- Primary CTA: Explore Collection.

- Secondary CTA: Wholesale Inquiries.

- Attractive visual composition.

Do not use copyrighted anime character artwork without permission.

Use:

- Abstract anime-inspired visuals.

- Properly licensed or placeholder product imagery.

- Original graphic elements.

- Generic pop-culture merchandise photography.

- Shapes, patterns, and lighting that fit the brand.

The hero must not claim official partnerships with anime studios or franchises.

Create responsive hero layouts for both Arabic and English.

## Section 2 — Featured Categories

Display the main product categories using visually consistent cards.

Suggested categories:

- Anime Accessories.

- K-pop.

- Gaming.

- Movies & TV Series.

- Korean Beauty.

- Ramen.

- Manga.

- Clothing.

Each card should include:

- Category title.

- Short description.

- Relevant visual.

- Clear action.

- Hover/focus state.

Use appropriate images or clearly marked placeholders.

Do not imply that category imagery proves actual stock availability.

## Section 3 — Featured Products

Display a curated selection of sample products.

Use a consistent product-card design with:

- Image.

- Product name.

- Category.

- Demo price or clearly labeled sample pricing.

- Product status.

- View details button.

- Add to cart button where appropriate.

- Optional wishlist action.

Clearly communicate that the products and prices are examples in the demo.

Do not use invented stock claims such as "Only 2 left" unless the information is explicitly labeled as simulated demo data.

## Section 4 — Discover / Brand Story

Create a visually engaging section explaining the store concept.

Focus on:

- Anime and pop-culture discovery.

- Products for fans and collectors.

- Retail and wholesale browsing.

- A convenient online shopping experience.

Do not make unverified claims about the actual business.

## Section 5 — Wholesale CTA

Create a strong wholesale-focused section.

Message concept:

"Buying for your store? Let's talk wholesale."

Include:

- Short explanation.

- Wholesale inquiry CTA.

- Link to wholesale page.

- No invented pricing or minimum order requirements.

## Section 6 — Newsletter / Contact CTA

Only include newsletter functionality if it can be implemented correctly.

Otherwise, create a clean contact CTA.

Do not collect personal information unnecessarily in the demo.

## Section 7 — Footer

Include:

- Brand.

- Navigation links.

- Category links.

- Contact placeholder.

- Social media placeholder links.

- Language-related information if useful.

- Demo notice where appropriate.

Do not invent real phone numbers, addresses, or social profiles.

---

# 10. PRODUCT CATALOG

Create a structured, reusable product catalog using demo data.

The product model should support:

- Product ID.

- Name in English.

- Name in Arabic.

- Description in English.

- Description in Arabic.

- Category.

- Subcategory.

- Images.

- Demo retail price.

- Optional demo wholesale inquiry flag.

- Availability status.

- Tags.

- Featured status.

- Optional variants.

- Optional size information for clothing.

- Optional format/volume information for relevant products.

Use realistic-looking sample content but clearly identify it as demo content.

Do not copy real business inventory or claim that sample prices are official.

## Suggested demo product types

Create a balanced selection of sample items across the categories, such as:

- Anime-inspired keychains.

- Character-themed accessories using permitted imagery or placeholders.

- Generic K-pop-inspired merchandise placeholders.

- Gaming-inspired accessories.

- Manga volumes or manga-themed sample products.

- Anime-inspired clothing mockups.

- Korean beauty sample product placeholders.

- Japanese/Korean ramen sample items.

Use enough products to make the website feel populated, but avoid generating an unnecessarily huge catalog.

If image sources are not available, use consistent placeholder imagery rather than broken links or random unrelated images.

---

# 11. SHOP PAGE

Create a professional all-products browsing experience.

Include:

- Page title.

- Short description.

- Product grid.

- Search.

- Category filter.

- Subcategory filter if relevant.

- Price filter where applicable.

- Sort options.

- Clear filters button.

- Product count.

- Loading state if needed.

- Empty state when no products match.

Suggested sort options:

- Featured.

- Newest.

- Price: low to high.

- Price: high to low.

- Name A–Z.

Search must work against product names and relevant searchable fields.

Filters must work together.

When no results exist:

- Show a helpful message.

- Provide a clear reset action.

- Do not leave a blank page.

Ensure Arabic and English search labels and layout direction work correctly.

---

# 12. PRODUCT CARD DESIGN

Design reusable, polished product cards.

Each card should have:

- Consistent image ratio.

- Product name.

- Category or tag.

- Demo price when applicable.

- Clear visual status.

- View details CTA.

- Add to cart CTA.

- Optional wishlist button.

Interaction requirements:

- Cards should have clear hover and focus states.

- Buttons must be independently clickable.

- Clicking a button must not accidentally trigger another action.

- Images must not stretch or crop important content unnecessarily.

- Text should not overflow.

- Buttons should remain usable on mobile.

Do not add fake reviews, fake ratings, or fake customer counts unless clearly labeled as simulated demo data.

---

# 13. PRODUCT DETAILS PAGE

Create a complete product details experience.

Include:

- Large product gallery.

- Product title.

- Category.

- Demo price or contact-for-price message.

- Description.

- Product attributes.

- Variant selection if relevant.

- Quantity selector.

- Add to cart button.

- Wishlist action if implemented.

- Wholesale inquiry CTA.

- Related products.

- Breadcrumb navigation.

For unavailable or uncertain product data:

- Use appropriate demo labels.

- Avoid claims of actual inventory.

- Do not display fabricated delivery guarantees.

The page must work with different product types.

For clothing:

- Include demo size options only when the product is configured with sizes.

For manga:

- Include suitable format metadata only if configured.

For food and beauty:

- Avoid fabricated health claims, ingredients, expiration dates, or regulatory claims.

---

# 14. SHOPPING CART

Implement a functional front-end shopping cart.

Required behavior:

- Add product.

- Add quantity.

- Increase quantity.

- Decrease quantity.

- Remove item.

- Clear cart.

- Display cart item count.

- Calculate subtotal for demo-priced products.

- Handle products marked as contact-for-price appropriately.

- Display empty cart state.

- Keep the cart usable across relevant navigation during the session.

Use a sensible state management approach.

Do not process real payments.

Do not present the demo as a functioning payment-enabled store.

If a product does not have a usable demo price, do not calculate a misleading total for it.

Use clear messaging such as:

"Price available on request."

The cart should be designed so it can later connect to a real backend.

---

# 15. WHOLESALE EXPERIENCE

Create a dedicated wholesale page.

The purpose is to communicate that wholesale inquiries can be handled, without inventing business terms.

Include:

- Wholesale hero section.

- Short explanation of the inquiry process.

- Product categories relevant to bulk purchasing.

- Contact/inquiry CTA.

- Optional inquiry form.

- Optional ability to select products and quantities for an inquiry.

Suggested inquiry form fields:

- Name.

- Business name (optional).

- Contact method.

- WhatsApp number.

- Interested categories.

- Message.

- Optional product interests.

Do not claim:

- Confirmed wholesale prices.

- Minimum order quantities.

- Delivery terms.

- Stock availability.

- Official wholesale agreements.

Use a clear note that terms and prices are subject to confirmation by the business.

If a WhatsApp action is implemented, use a configurable placeholder contact number and do not invent a real number.

---

# 16. WHATSAPP ORDER FLOW

Implement a functional demo flow for sending an order summary to WhatsApp.

When the user clicks "Order via WhatsApp":

1. Validate the cart or inquiry information.

2. Display a clear order summary.

3. Include product names, quantities, and prices only where appropriate.

4. Provide a clear editable message preview if possible.

5. Use a configurable placeholder WhatsApp number.

6. Generate a properly encoded WhatsApp message.

7. Do not claim that the order has been accepted, paid, or confirmed.

For contact-for-price products:

- Include product names and quantities.

- Clearly state that the price requires confirmation.

If no real WhatsApp number is provided:

- Use a demo placeholder.

- Make it obvious that the number must be replaced before launch.

- Do not generate a fake business contact.

Handle empty cart and missing contact details gracefully.

---

# 17. USER AUTHENTICATION

Include a polished login and registration interface for the demo.

Required screens:

- Login.

- Register.

- Forgot password placeholder or appropriate demo behavior.

- User account area.

- Logout.

For the initial demo:

- Use a mock authentication experience or an appropriately simple local demo implementation if real backend authentication is not required.

- Do not imply that mock accounts are secure production accounts.

- Do not store real passwords or sensitive personal information unnecessarily.

- Do not expose private user information.

- Do not claim production-grade security if no real authentication backend exists.

The UI should still look professional and demonstrate:

- Form validation.

- Error states.

- Success states.

- Password visibility control if appropriate.

- Accessible labels.

- Loading states.

- Empty account state.

Design the authentication structure so a real secure authentication provider can be integrated later.

---

# 18. USER ACCOUNT

Create a user account page for the demo.

Possible sections:

- Profile information.

- Saved products or wishlist if implemented.

- Order history placeholder.

- Wholesale inquiry history placeholder.

- Logout.

Clearly distinguish between:

- Implemented demo functionality.

- Future backend functionality.

Do not display fake completed orders as real transactions.

Use empty states that explain what will be available when the real store is connected.

---

# 19. ADMIN DASHBOARD

Create a polished admin dashboard as a DEMO interface.

The dashboard should demonstrate how a store owner could manage products and categories.

Required areas:

- Dashboard overview.

- Products.

- Categories.

- Orders or inquiries placeholder.

- Store settings placeholder.

## Product management

Implement a front-end demo interface that supports, where practical:

- Viewing products.

- Searching products.

- Filtering by category.

- Adding a demo product.

- Editing a demo product.

- Removing a demo product.

- Changing featured status.

- Updating demo pricing.

- Managing basic product fields.

If data is stored locally, clearly treat it as demo data.

Do not claim that the dashboard is secure or production-ready without a real backend and proper authorization.

Do not hardcode a publicly exposed production admin password.

For a demo-only admin entry point:

- Make the demo status clear.

- Avoid presenting mock authentication as real security.

- Structure the code so secure backend authentication and role-based authorization can be added later.

The admin dashboard must be responsive and usable on mobile and desktop.

---

# 20. DATA ARCHITECTURE

Use a clean and maintainable data structure.

Separate:

- Product data.

- Category data.

- Translation strings.

- Configuration values.

- UI components.

- Cart state.

- Authentication demo state.

- Admin demo state.

Do not duplicate product card designs throughout the application.

Use reusable components for:

- Header.

- Footer.

- Product card.

- Category card.

- Buttons.

- Forms.

- Modals.

- Toasts.

- Empty states.

- Loading states.

- Search and filters.

Avoid unnecessary dependencies.

Do not add complicated infrastructure unless it is required for a clearly requested function.

Prioritize a clean, extensible structure that can later be connected to a real database.

---

# 21. IMAGE AND ASSET REQUIREMENTS

Use only:

- Properly licensed assets.

- Original design elements.

- Suitable placeholder images.

- Assets supplied by the business owner with permission.

Do not scrape copyrighted anime artwork or use official franchise logos as if the store owns them.

Do not use random images that do not match the product.

Product images should:

- Have consistent aspect ratios.

- Be visually coherent.

- Load reliably.

- Have useful alt text.

- Maintain quality on mobile and desktop.

If a suitable image is unavailable, use a clearly designed placeholder that looks intentional and premium.

Do not leave broken image icons or unrelated stock images.

---

# 22. ACCESSIBILITY

Follow accessibility best practices.

Ensure:

- Adequate color contrast.

- Keyboard navigation.

- Visible focus states.

- Proper labels for inputs.

- Meaningful button text.

- Alt text for meaningful images.

- Accessible error messages.

- Clear navigation.

- Appropriate heading hierarchy.

- Touch-friendly controls.

- RTL accessibility considerations.

Do not rely on color alone to communicate important states.

---

# 23. ANIMATIONS AND INTERACTIONS

Use subtle, purposeful animations.

Recommended:

- Smooth hover transitions.

- Small card lift or visual emphasis.

- Gentle section reveal when appropriate.

- Menu transitions.

- Cart feedback.

- Modal transitions.

- Filter state transitions.

Avoid:

- Excessive motion.

- Distracting animations.

- Long loading sequences.

- Automatic video playback.

- Animations that interfere with accessibility.

The website should feel alive but remain fast and practical.

---

# 24. ERROR HANDLING AND EMPTY STATES

Create polished states for:

- No search results.

- Empty cart.

- Missing product.

- Invalid route.

- Invalid form fields.

- Failed demo action.

- Loading content.

- Missing image.

- Empty account.

- Empty admin lists.

Each state should:

- Explain the situation clearly.

- Provide a useful next action.

- Match the bilingual interface.

- Avoid technical error messages that users cannot understand.

---

# 25. DEMO DATA AND BUSINESS SAFETY

This is a concept website, not an authorized official Anime House website.

Follow these rules:

- Do not claim official affiliation.

- Do not claim official inventory.

- Do not claim real prices.

- Do not invent business contact details.

- Do not invent physical store addresses.

- Do not invent delivery policies.

- Do not invent customer reviews.

- Do not invent order statistics.

- Do not use misleading official badges.

- Do not publish the demo as the business's official online store.

Include a discreet but clear demo notice where appropriate, especially in the admin area or footer.

Use editable configuration placeholders for:

- WhatsApp number.

- Contact email.

- Social links.

- Business address.

- Store policies.

---

# 26. PERFORMANCE AND QUALITY

Prioritize:

- Fast initial rendering.

- Responsive layouts.

- Efficient images.

- Minimal unnecessary dependencies.

- No broken links.

- No console errors where avoidable.

- Stable cart behavior.

- Consistent navigation.

- Reliable bilingual switching.

- Clean component structure.

Do not add unnecessary features just to make the project larger.

A smaller, polished, working feature is better than a large feature that is broken.

---

# 27. FINAL QUALITY CHECK

Before considering the demo complete, review the following:

## Visual

- Does the website look premium and creative?

- Does it feel like a specialty anime/pop-culture store?

- Are the colors consistent?

- Are the cards and buttons aligned?

- Is the typography readable?

- Are the images coherent?

- Is the website visually strong on mobile?

## Functional

- Does navigation work?

- Does search work?

- Do filters work?

- Does the product details page work?

- Does the cart work?

- Does quantity adjustment work?

- Does the demo WhatsApp flow work with a configurable placeholder?

- Does the language switcher work?

- Does RTL layout work?

- Do login and registration demo screens behave correctly?

- Does the admin demo interface work without exposing unsafe credentials?

## Content

- Are demo products clearly distinguishable from real inventory?

- Are demo prices clearly identified?

- Are there no fabricated business claims?

- Are all major interface strings translated?

- Are placeholder contacts clearly marked?

## Responsive

- Check mobile.

- Check tablet.

- Check desktop.

- Check Arabic RTL.

- Check English LTR.

- Check long product titles.

- Check empty states.

- Check forms and modals.

## Final instruction

Build the complete polished DEMO based on this specification.

Do not stop at a generic landing page.

Do not replace the requested e-commerce structure with a simple static homepage.

Do not add unrequested complex features that compromise the core experience.

Use your best professional judgment to resolve minor design decisions while preserving the requirements above.

The result should be a strong, presentable concept that can later be adapted into an official Anime House website after receiving the business owner's approval and real product data.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://animetchi-store.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d0411e8e-38e7-4470-90a0-202516a65230).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
