import productImage0 from "@/assets/product-moon-fox-charm.jpg";
import productImage1 from "@/assets/product-orbit-pin-set.jpg";
import productImage2 from "@/assets/product-fan-display-kit.jpg";
import productImage3 from "@/assets/product-arcade-desk-mat.jpg";
import productImage4 from "@/assets/product-scene-capsule.jpg";
import productImage5 from "@/assets/product-cloud-dew-set.jpg";
import productImage6 from "@/assets/product-ramen-discovery-box.jpg";
import productImage7 from "@/assets/product-panel-reader-kit.jpg";
import productImage8 from "@/assets/product-night-shift-tee.jpg";
import productImage9 from "@/assets/product-signal-tote.jpg";
import productImage10 from "@/assets/product-pirate-manga-volume.jpg";
import productImage11 from "@/assets/product-ninja-manga-volume.jpg";
import productImage12 from "@/assets/product-ninja-mini-figure.jpg";
import productImage13 from "@/assets/product-geometric-haori.jpg";
import productImage14 from "@/assets/product-pulse-controller.jpg";
import productImage15 from "@/assets/product-starlight-stationery.jpg";
import productImage16 from "@/assets/product-wave-ramen-bowl.jpg";
import productImage17 from "@/assets/product-mecha-desk-lamp.jpg";
import controllerBack from "@/assets/product-pulse-controller-back.jpg";
import accessoriesImage from "@/assets/category-accessories.jpg";
import mangaImage from "@/assets/category-manga.jpg";
import figuresImage from "@/assets/category-figures.jpg";
import gamingImage from "@/assets/category-gaming.jpg";
import clothingImage from "@/assets/category-clothing.jpg";

export type Bilingual = { en: string; ar: string };
export type Category = {
  slug: string;
  name: Bilingual;
  description: Bilingual;
  image: string;
};
export type Product = {
  id: string;
  name: Bilingual;
  description: Bilingual;
  category: string;
  subcategory: Bilingual;
  image: string;
  gallery?: { image: string; label: Bilingual }[];
  franchises?: string[];
  price: number | null;
  featured: boolean;
  status: "sample" | "inquiry";
  soldOut?: boolean;
  tags: string[];
  variants?: Bilingual[];
  details: Bilingual[];
};

export const categories: Category[] = [
  { slug: "anime-accessories", name: { en: "Anime accessories", ar: "إكسسوارات الأنمي" }, description: { en: "Original pins, charms and collector details.", ar: "دبابيس وتعليقات وتفاصيل لهواة الاقتناء." }, image: accessoriesImage },
  { slug: "k-pop", name: { en: "K-pop", ar: "كي بوب" }, description: { en: "Fan-inspired stationery and display pieces.", ar: "قرطاسية وقطع عرض مستوحاة من ثقافة المعجبين." }, image: productImage2 },
  { slug: "gaming", name: { en: "Gaming", ar: "الألعاب" }, description: { en: "Desk gear and play-ready accessories.", ar: "تجهيزات مكتبية وإكسسوارات للألعاب." }, image: gamingImage },
  { slug: "movies-tv", name: { en: "Movies & TV", ar: "الأفلام والمسلسلات" }, description: { en: "Pop-culture objects for screen lovers.", ar: "قطع من ثقافة البوب لعشاق الشاشة." }, image: figuresImage },
  { slug: "korean-beauty", name: { en: "Korean beauty", ar: "الجمال الكوري" }, description: { en: "Concept beauty picks with clean presentation.", ar: "مختارات تجريبية للعناية بتقديم أنيق." }, image: productImage5 },
  { slug: "ramen", name: { en: "Japanese & Korean ramen", ar: "رامن ياباني وكوري" }, description: { en: "Sample pantry discoveries and gift bundles.", ar: "اكتشافات تجريبية للمطبخ وباقات هدايا." }, image: productImage6 },
  { slug: "manga", name: { en: "Manga", ar: "مانغا" }, description: { en: "Reading accessories and sample editions.", ar: "إكسسوارات قراءة وإصدارات تجريبية." }, image: mangaImage },
  { slug: "clothing", name: { en: "Clothing", ar: "الملابس" }, description: { en: "Original graphic streetwear concepts.", ar: "تصاميم أصلية لملابس الشارع." }, image: clothingImage },
];

export const initialProducts: Product[] = [
  { id: "moon-fox-charm", name: { en: "Moon Fox Acrylic Charm", ar: "تعليقة ثعلب القمر" }, description: { en: "An original double-sided acrylic charm concept with a polished metal clasp.", ar: "تصميم تجريبي لتعليقة أكريليك أصلية بوجهين ومشبك معدني مصقول." }, category: "anime-accessories", subcategory: { en: "Charms", ar: "تعليقات" }, image: productImage0, price: 185, featured: true, status: "sample", tags: ["charm", "collector"], details: [{ en: "Sample acrylic finish", ar: "تشطيب أكريليك تجريبي" }, { en: "Original artwork", ar: "رسم أصلي" }] },
  { id: "orbit-pin-set", soldOut: true, name: { en: "Orbit Enamel Pin Set", ar: "طقم دبابيس أوربت" }, description: { en: "Three original celestial motifs designed as a premium collector set.", ar: "ثلاثة رموز فلكية أصلية مصممة كطقم اقتناء مميز." }, category: "anime-accessories", subcategory: { en: "Pins", ar: "دبابيس" }, image: productImage1, price: 240, featured: true, status: "sample", tags: ["pins", "gift"], details: [{ en: "Set of three", ar: "طقم من ثلاث قطع" }, { en: "Demo packaging", ar: "تغليف تجريبي" }] },
  { id: "fan-display-kit", name: { en: "Fan Display Starter Kit", ar: "عدة عرض للمعجبين" }, description: { en: "A modular concept kit for arranging cards, keepsakes and mini prints.", ar: "عدة تجريبية مرنة لترتيب البطاقات والتذكارات والمطبوعات الصغيرة." }, category: "k-pop", subcategory: { en: "Display", ar: "عرض" }, image: productImage2, price: 320, featured: false, status: "sample", tags: ["display", "stationery"], details: [{ en: "Modular display", ar: "عرض مرن" }] },
  { id: "arcade-desk-mat", name: { en: "Arcade Motion Desk Mat", ar: "حصيرة مكتب أركيد" }, description: { en: "A large desk mat concept with an original motion-inspired print.", ar: "تصميم تجريبي لحصيرة مكتب كبيرة بطباعة أصلية مستوحاة من الحركة." }, category: "gaming", subcategory: { en: "Desk gear", ar: "تجهيز المكتب" }, image: productImage3, price: 490, featured: true, status: "sample", tags: ["desk", "gaming"], variants: [{ en: "Charcoal / Orange", ar: "فحمي / برتقالي" }, { en: "Cream / Cobalt", ar: "كريمي / أزرق" }], details: [{ en: "Sample size: 80 × 30 cm", ar: "مقاس تجريبي: 80 × 30 سم" }] },
  { id: "scene-capsule", name: { en: "Scene Capsule Swordsman Figure", ar: "مجسم سياف سين كابسول" }, description: { en: "A swordsman display figure concept inspired by One Piece. Generated sample artwork, not a verified licensed product.", ar: "مجسم عرض لسياف مستوحى من ون بيس. الصورة نموذج مولّد وليست لمنتج موثّق الترخيص." }, category: "movies-tv", subcategory: { en: "Collectibles", ar: "مقتنيات" }, image: productImage4, franchises: ["one-piece"], price: 890, featured: false, status: "sample", tags: ["display", "concept"], details: [{ en: "Display figure with base; sample height: 18 cm", ar: "مجسم بقاعدة؛ ارتفاع تجريبي: ١٨ سم" }] },
  { id: "cloud-dew-set", name: { en: "Cloud Dew Sample Set", ar: "مجموعة كلاود ديو التجريبية" }, description: { en: "A packaging and presentation concept only; no ingredients or skincare claims are supplied.", ar: "تصميم تجريبي للتغليف والعرض فقط؛ لا توجد مكونات أو ادعاءات للعناية بالبشرة." }, category: "korean-beauty", subcategory: { en: "Beauty concept", ar: "تصميم عناية" }, image: productImage5, price: 420, featured: true, status: "sample", tags: ["beauty", "gift"], details: [{ en: "Concept product only", ar: "منتج تصوري فقط" }] },
  { id: "ramen-discovery-box", name: { en: "Ramen Discovery Box", ar: "صندوق اكتشاف الرامن" }, description: { en: "A sample bundle concept showing how a mixed ramen selection could be presented.", ar: "تصميم تجريبي يوضح طريقة تقديم تشكيلة متنوعة من الرامن." }, category: "ramen", subcategory: { en: "Sample bundle", ar: "باقة تجريبية" }, image: productImage6, price: 560, featured: true, status: "sample", tags: ["ramen", "bundle"], details: [{ en: "Final contents require confirmation", ar: "المحتويات النهائية تتطلب التأكيد" }] },
  { id: "panel-reader-kit", name: { en: "Panel Reader Kit", ar: "عدة قارئ المانغا" }, description: { en: "A reading stand, page markers and sleeve concept for manga collectors.", ar: "تصميم تجريبي لحامل قراءة وعلامات صفحات وغلاف لهواة المانغا." }, category: "manga", subcategory: { en: "Reading accessories", ar: "إكسسوارات القراءة" }, image: productImage7, price: 375, featured: false, status: "sample", tags: ["manga", "reading"], details: [{ en: "Illustrative manga pages; no published book included", ar: "صفحات مانغا توضيحية؛ لا يتضمن كتاباً منشوراً" }] },
  { id: "night-shift-tee", name: { en: "Night Shift Graphic Tee", ar: "تيشيرت نايت شفت" }, description: { en: "An oversized streetwear concept with original manga-style brush artwork.", ar: "تصميم تجريبي واسع لملابس الشارع برسومات فرشاة أصلية بأسلوب المانغا." }, category: "clothing", subcategory: { en: "T-shirts", ar: "تيشيرتات" }, image: productImage8, price: 650, featured: true, status: "sample", tags: ["streetwear", "apparel"], variants: [{ en: "Small", ar: "صغير" }, { en: "Medium", ar: "متوسط" }, { en: "Large", ar: "كبير" }, { en: "X-Large", ar: "كبير جداً" }], details: [{ en: "Demo sizing only", ar: "مقاسات تجريبية فقط" }] },
  { id: "signal-tote", name: { en: "Signal Canvas Tote", ar: "حقيبة سيجنال القماشية" }, description: { en: "A sturdy tote concept with an original two-color graphic.", ar: "تصميم تجريبي لحقيبة متينة برسمة أصلية بلونين." }, category: "clothing", subcategory: { en: "Bags", ar: "حقائب" }, image: productImage9, price: 290, featured: false, status: "sample", tags: ["bag", "streetwear"], details: [{ en: "Sample material specification", ar: "مواصفات خامة تجريبية" }] },
  {"id": "pirate-manga-volume", "name": {"en": "Pirate Voyage Manga — Sample Volume", "ar": "مانغا رحلة القرصان — مجلد تجريبي"}, "description": {"en": "A concept paperback inspired by One Piece; generated cover, not an actual published edition.", "ar": "تصور لكتاب مستوحى من ون بيس؛ غلاف مولّد وليس إصداراً منشوراً حقيقياً."}, "category": "manga", "subcategory": {"en": "Manga volumes", "ar": "مجلدات مانغا"}, "image": productImage10, "price": 265, "featured": true, "status": "sample", "tags": ["manga volumes", "demo"], "franchises": ["one-piece"], "details": [{"en": "Paperback concept · sample format: 13 × 19 cm", "ar": "تصور لغلاف ورقي · مقاس تجريبي: ١٣ × ١٩ سم"}]},
  {"id": "ninja-manga-volume", "name": {"en": "Ninja Moon Manga — Sample Volume", "ar": "مانغا قمر النينجا — مجلد تجريبي"}, "description": {"en": "A ninja-themed manga concept inspired by Naruto. Cover art and edition are demonstration content.", "ar": "تصور مانغا بطابع النينجا مستوحى من ناروتو. الغلاف والإصدار للعرض فقط."}, "category": "manga", "subcategory": {"en": "Manga volumes", "ar": "مجلدات مانغا"}, "image": productImage11, "price": 250, "featured": false, "status": "sample", "tags": ["manga volumes", "demo"], "franchises": ["naruto"], "details": [{"en": "Paperback concept · reading language to be confirmed", "ar": "تصور لغلاف ورقي · لغة القراءة تحتاج تأكيداً"}]},
  {"id": "ninja-mini-figure", "name": {"en": "Ninja Mini Display Figure", "ar": "مجسم نينجا صغير للعرض"}, "description": {"en": "An orange-clad ninja figure concept inspired by Naruto, with a display base. Licensing is not verified.", "ar": "تصور لمجسم نينجا بالزي البرتقالي مستوحى من ناروتو مع قاعدة عرض. الترخيص غير موثّق."}, "category": "movies-tv", "subcategory": {"en": "Collectibles", "ar": "مقتنيات"}, "image": productImage12, "price": 720, "featured": true, "status": "sample", "tags": ["collectibles", "demo"], "franchises": ["naruto"], "details": [{"en": "Sample height: 12 cm · display base", "ar": "ارتفاع تجريبي: ١٢ سم · قاعدة عرض"}]},
  {"id": "geometric-haori", "name": {"en": "Geometric Haori Jacket", "ar": "جاكيت هاوري هندسي"}, "description": {"en": "A sage-green haori streetwear concept with an original geometric print.", "ar": "تصور لجاكيت هاوري أخضر بطباعة هندسية أصلية."}, "category": "clothing", "subcategory": {"en": "Jackets", "ar": "جاكيتات"}, "image": productImage13, "price": 980, "featured": false, "status": "sample", "tags": ["jackets", "demo"], "franchises": [], "details": [{"en": "Sample fabric: woven blend · relaxed fit", "ar": "خامة تجريبية: نسيج مخلوط · قصة مريحة"}], "variants": [{"en": "Small", "ar": "صغير"}, {"en": "Medium", "ar": "متوسط"}, {"en": "Large", "ar": "كبير"}]},
  {"id": "pulse-controller", "name": {"en": "Pulse Gaming Controller", "ar": "ذراع ألعاب بالس"}, "description": {"en": "A black-and-white controller concept with coral controls. Compatibility is not verified.", "ar": "تصور لذراع تحكم بالأبيض والأسود وأزرار مرجانية. التوافق مع الأجهزة غير موثّق."}, "category": "gaming", "subcategory": {"en": "Controllers", "ar": "أذرع تحكم"}, "image": productImage14, "price": 850, "featured": false, "status": "sample", "tags": ["controllers", "demo"], "franchises": [], "details": [{"en": "Concept hardware · connection and compatibility require confirmation", "ar": "جهاز تصوري · طريقة الاتصال والتوافق يحتاجان تأكيداً"}], gallery: [{ image: productImage14, label: { en: "Front view", ar: "من الأمام" } }, { image: controllerBack, label: { en: "Rear view", ar: "من الخلف" } }] },
  {"id": "starlight-stationery", "name": {"en": "Starlight Fan Stationery Kit", "ar": "طقم قرطاسية ستارلايت للمعجبين"}, "description": {"en": "A lavender notebook, decorative tapes and stickers for a fan-inspired desk.", "ar": "دفتر بنفسجي وأشرطة تزيين وملصقات لمكتب مستوحى من ثقافة المعجبين."}, "category": "k-pop", "subcategory": {"en": "Stationery", "ar": "قرطاسية"}, "image": productImage15, "price": 210, "featured": false, "status": "sample", "tags": ["stationery", "demo"], "franchises": [], "details": [{"en": "Sample notebook: A5 · decorative tape and stickers", "ar": "دفتر تجريبي: A5 · أشرطة تزيين وملصقات"}]},
  {"id": "wave-ramen-bowl", "name": {"en": "Wave Ramen Bowl & Chopsticks", "ar": "وعاء رامن ويف مع عيدان الأكل"}, "description": {"en": "A black bowl concept with a red wave pattern and matching chopsticks.", "ar": "تصور لوعاء أسود بنقشة موج حمراء وعيدان أكل متناسقة."}, "category": "ramen", "subcategory": {"en": "Tableware", "ar": "أدوات المائدة"}, "image": productImage16, "price": 340, "featured": false, "status": "sample", "tags": ["tableware", "demo"], "franchises": [], "details": [{"en": "Sample diameter: 18 cm · material and food safety require confirmation", "ar": "قطر تجريبي: ١٨ سم · الخامة والسلامة الغذائية تحتاجان تأكيداً"}]},
  {"id": "mecha-desk-lamp", "name": {"en": "Mecha Desk Lamp", "ar": "مصباح مكتب ميكا"}, "description": {"en": "An original robot-shaped desk lamp concept in white, orange and charcoal.", "ar": "تصور أصلي لمصباح مكتب على شكل روبوت بالأبيض والبرتقالي والفحمي."}, "category": "gaming", "subcategory": {"en": "Desk accessories", "ar": "إكسسوارات المكتب"}, "image": productImage17, "price": 1100, "featured": false, "status": "sample", "tags": ["desk accessories", "demo"], "franchises": [], "details": [{"en": "Sample height: 24 cm · electrical specifications not verified", "ar": "ارتفاع تجريبي: ٢٤ سم · المواصفات الكهربائية غير موثّقة"}]},
];

export const getCategory = (slug: string) => categories.find((category) => category.slug === slug);
export const getProduct = (id: string, products = initialProducts) => products.find((product) => product.id === id);
export const money = (value: number, language: "en" | "ar") => new Intl.NumberFormat(language === "ar" ? "ar-EG" : "en-EG", { style: "currency", currency: "EGP", maximumFractionDigits: 0 }).format(value);

export const franchises = [
  { slug: "one-piece", name: { en: "One Piece", ar: "ون بيس" } },
  { slug: "naruto", name: { en: "Naruto", ar: "ناروتو" } },
];
