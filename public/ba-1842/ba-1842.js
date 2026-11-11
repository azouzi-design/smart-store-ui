/* BA-1842 — subcategory pills: mock filtering + three proposed directions.
   No network calls; products are re-sorted from the cards already on the page. */
(() => {
  const ICONS = "/ba-1842/lucide/";
  const KEYS = ["beer", "wine", "seltzer", "vodka", "whiskey", "tequila", "gin", "brandy", "liqueur", "other"];
  const ICON = {
    all: "layout-grid", beer: "beer", wine: "wine", seltzer: "cup-soda", vodka: "martini",
    whiskey: "glass-water", tequila: "flame", gin: "leaf", brandy: "amphora", liqueur: "cherry", other: "ellipsis",
  };
  // Rough keyword match on product names; first hit wins. Not meant to be accurate.
  const RULES = [
    ["seltzer", /(seltzer|cider|cocktail|claw|truly|margarita|spritz|hard )/i],
    ["beer", /\b(beer|ale|lager|ipa|stout|pils|porter|brew)/i],
    ["vodka", /vodka/i],
    ["whiskey", /(whisk|bourbon|scotch)/i],
    ["tequila", /(tequila|mezcal)/i],
    ["gin", /\bgin\b/i],
    ["brandy", /(brandy|cognac)/i],
    ["liqueur", /(liqueur|schnapps)/i],
    ["wine", /(wine|cabernet|merlot|pinot|chardonnay|sauvignon|malbec|zinfandel|ros[eé]|blend|riesling|moscato|prosecco|champagne|grigio|shiraz|syrah)/i],
  ];

  const baseRow = document.querySelector(".shop-taxa .chips-row");
  const grid = document.querySelector(".dept .grid");
  const title = document.querySelector(".dept .dept-title");
  const results = document.querySelector(".shop-results");
  if (!baseRow || !grid) return;

  const baseChips = [...baseRow.querySelectorAll(".fchip")];
  const BEER_CATS = baseChips.map((b, i) => ({
    key: KEYS[i] || "other" + i,
    label: b.childNodes[0].textContent.trim(),
    count: Number(b.querySelector(".fchip-n")?.textContent || 0),
  }));
  // cats/cards point at the active department; only G and H switch departments (mock data for non-beer).
  let cats = BEER_CATS;
  const total = Number((results?.textContent.match(/[\d,]+/) || ["0"])[0].replace(/,/g, "")) || 0;
  const all = { key: "all", label: "All", count: total };
  const fmt = (n) => n.toLocaleString("en-US");

  const BEER_CARDS = [...grid.children].map((el, i) => {
    const name = el.querySelector(".pn")?.textContent || "";
    const hit = RULES.find(([, re]) => re.test(name));
    return { el, i, name, img: el.querySelector("img")?.getAttribute("src"), cat: hit ? hit[0] : "other" };
  });
  let cards = BEER_CARDS;

  const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
  function pick(cat) {
    const own = cards.filter((c) => c.cat === cat.key);
    if (cards !== BEER_CARDS) return own; // mock departments have their own cards per subcategory
    const target = Math.min(cat.count, 12);
    if (own.length >= target) return own;
    const rest = cards
      .filter((c) => c.cat !== cat.key)
      .sort((a, b) => hash(cat.key + a.i) - hash(cat.key + b.i));
    return own.concat(rest.slice(0, target - own.length));
  }
  // Tile thumbnail: first product in the category without a sale overlay baked into the image.
  const thumb = (cat) => {
    if (cat.key === "all") return null;
    const list = pick(cat);
    return (list.find((c) => !c.el.querySelector(".ipc-saletag")) || list[0])?.img;
  };

  let origTitle = title?.textContent;
  let origResults = results?.textContent;
  let active = "all";

  function apply(key) {
    active = active === key && key !== "all" ? "all" : key;
    const cat = cats.find((c) => c.key === active);
    const shown = cat ? pick(cat) : cards;
    const set = new Set(shown);
    [...grid.children].forEach((el) => (el.hidden = true));
    cards.forEach((c) => (c.el.hidden = !set.has(c)));
    shown.forEach((c, n) => {
      grid.appendChild(c.el);
      c.el.classList.remove("ba-in");
      void c.el.offsetWidth;
      c.el.style.animationDelay = Math.min(n, 12) * 25 + "ms";
      c.el.classList.add("ba-in");
    });
    if (title) title.textContent = cat ? cat.label : origTitle;
    if (results) results.textContent = cat ? `${fmt(cat.count)} result${cat.count === 1 ? "" : "s"}` : origResults;
    sync();
  }

  function sync() {
    baseChips.forEach((b, i) => {
      const on = cats === BEER_CATS && BEER_CATS[i].key === active;
      b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", on);
    });
    document.querySelectorAll("[data-ba-key]").forEach((b) => {
      const on = b.dataset.baKey === active;
      b.setAttribute("aria-pressed", on);
      b.classList.toggle("is-on", on);
    });
    document.querySelectorAll(".ba-c").forEach(updateTabs);
    afterSync.forEach((f) => f());
  }

  baseChips.forEach((b, i) => b.addEventListener("click", () => apply(BEER_CATS[i].key, b)));

  /* ---------- helpers ---------- */
  const h = (tag, attrs = {}, ...kids) => {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") el.className = v;
      else if (k === "html") el.innerHTML = v;
      else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v);
    }
    kids.flat().forEach((k) => k != null && el.append(k));
    return el;
  };
  const icon = (name, cls = "ba-ico") =>
    h("span", { class: cls, "aria-hidden": "true", style: `--ico:url("${ICONS}${name}.svg")` });
  const btn = (cat, cls, ...kids) =>
    h("button", {
      type: "button", class: cls, "data-ba-key": cat.key, "aria-pressed": "false",
      "aria-label": `${cat.label}, ${fmt(cat.count)} items`, onclick: (e) => apply(cat.key, e.currentTarget),
    }, ...kids);

  function scroller(track) {
    const wrap = h("div", { class: "ba-scroll" });
    const prev = h("button", { type: "button", class: "ba-arrow ba-prev", "aria-label": "Scroll left", tabindex: "-1" }, icon("chevron-left"));
    const next = h("button", { type: "button", class: "ba-arrow ba-next", "aria-label": "Scroll right", tabindex: "-1" }, icon("chevron-right"));
    const step = () => track.clientWidth * 0.7;
    prev.onclick = () => track.scrollBy({ left: -step(), behavior: "smooth" });
    next.onclick = () => track.scrollBy({ left: step(), behavior: "smooth" });
    const edges = () => {
      const max = track.scrollWidth - track.clientWidth - 2;
      wrap.classList.toggle("at-start", track.scrollLeft <= 2);
      wrap.classList.toggle("at-end", track.scrollLeft >= max);
    };
    track.addEventListener("scroll", edges, { passive: true });
    addEventListener("resize", edges);
    requestAnimationFrame(edges);
    wrap.append(prev, track, next);
    return wrap;
  }

  const VARIANTS = [
    { id: "a", name: "Photo tiles", why: "Shoppers recognise a bottle faster than a word. Each subcategory shows a product thumbnail, and the row scrolls on one line instead of wrapping to two." },
    { id: "b", name: "Icon pills, one line", why: "Same chip pattern, but with an icon, a count badge, an explicit All, and one scrolling line. The closest step from today." },
    { id: "c", name: "Tabs + More", why: "Ranked by item count: the five biggest stay visible and the long tail (Gin · 1) moves into More, so there are fewer choices." },
    // Round 2 (client: "not elegant and minimalistic enough"). Each must read differently from the
    // mobile department chips, which are white, bordered, fully rounded pills with an icon.
    { id: "d", name: "Quiet text tabs", why: "Type only: no boxes, borders or icons. Selection is a primary underline. Nothing like the bordered department pills above it." },
    { id: "e", name: "Round thumbnails", why: "Small circular product photos with a one-word caption and no counts. Keeps A's imagery at a fraction of the weight." },
    { id: "f", name: "Soft chips", why: "Borderless, softly squared chips on a neutral fill, no icons. Same tap-and-go as pills, but a different shape and weight from the departments." },
    // Round 3: subcategories live inside the department menu instead of a row above the grid.
    { id: "g", name: "Department sub-menu", why: "Desktop: nested under Beer & Wine in the sidebar. Mobile: a quiet text row attached under the department chips." },
    { id: "h", name: "Department overlay", why: "Tap Beer & Wine to choose a type. Desktop: a flyout panel beside the sidebar. Mobile: a bottom sheet." },
  ];
  const jump = () =>
    h("nav", { class: "ba-jump", "aria-label": "Jump to direction" },
      h("a", { href: "#ba-v-base" }, "Current"),
      VARIANTS.map((v) => h("a", { href: `#ba-v-${v.id}` }, v.id.toUpperCase())));
  const tag = (kind, name, why) =>
    h("header", { class: "ba-tag" },
      h("div", { class: "ba-tag-top" },
        h("span", { class: "ba-tag-k" + (kind.startsWith("Inherited") ? " is-inh" : "") }, kind),
        h("strong", { class: "ba-tag-t" }, name), jump()),
      why && h("p", { class: "ba-tag-d" }, why));

  /* ---------- A · photo tiles ---------- */
  // "All" tile: a 2x2 collage of the biggest subcategories' thumbnails instead of a generic grid icon.
  function allCollage() {
    const srcs = [...cats].sort((a, b) => b.count - a.count).map(thumb).filter(Boolean);
    const uniq = [...new Set(srcs)].slice(0, 4);
    return h("span", { class: "ba-a-collage" }, uniq.map((src) => h("img", { src, alt: "", loading: "lazy" })));
  }
  function buildA() {
    const track = h("div", { class: "ba-track ba-a", role: "group", "aria-label": "Beer, Wine & Spirits types" },
      [all, ...cats].map((c) => {
        const src = thumb(c);
        return btn(c, "ba-a-tile",
          h("span", { class: "ba-a-media" },
            src ? h("img", { src, alt: "", loading: "lazy" }) : allCollage(),
            icon("check", "ba-ico ba-a-check")),
          h("span", { class: "ba-a-label" }, c.label),
          h("span", { class: "ba-a-n" }, fmt(c.count)));
      }));
    return scroller(track);
  }

  /* ---------- B · icon pills ---------- */
  function buildB() {
    const track = h("div", { class: "ba-track ba-b", role: "group", "aria-label": "Beer, Wine & Spirits types" },
      [all, ...cats].map((c) =>
        btn(c, "ba-b-pill",
          h("span", { class: "ba-b-ic" }, icon(ICON[c.key] || "ellipsis")),
          h("span", { class: "ba-b-label" }, c.label),
          h("span", { class: "ba-b-n" }, fmt(c.count)))));
    return scroller(track);
  }

  /* ---------- C · tabs + more ---------- */
  function buildC() {
    const ranked = [...cats].sort((a, b) => b.count - a.count);
    const top = ranked.slice(0, 5);
    const more = ranked.slice(5);
    const tabs = h("div", { class: "ba-c-tabs", role: "group", "aria-label": "Beer, Wine & Spirits types" },
      [all, ...top].map((c) => btn(c, "ba-c-tab", h("span", {}, c.label), h("span", { class: "ba-c-n" }, fmt(c.count)))));
    const menu = h("div", { class: "ba-c-menu", role: "menu", hidden: "" },
      more.map((c) => {
        const b = btn(c, "ba-c-item", icon(ICON[c.key]), h("span", { class: "ba-c-item-l" }, c.label), h("span", { class: "ba-c-n" }, fmt(c.count)));
        b.setAttribute("role", "menuitemradio");
        b.addEventListener("click", () => toggle(false));
        return b;
      }));
    const moreLabel = h("span", { class: "ba-c-morel" }, `More`);
    const moreBtn = h("button", {
      type: "button", class: "ba-c-tab ba-c-more", "aria-haspopup": "menu", "aria-expanded": "false",
      onclick: () => toggle(menu.hidden),
    }, moreLabel, h("span", { class: "ba-c-n" }, String(more.length)), icon("chevron-down", "ba-ico ba-c-caret"));
    const moreWrap = h("div", { class: "ba-c-morewrap" }, moreBtn, menu);
    const bar = h("div", { class: "ba-c-bar" }, tabs, moreWrap, h("span", { class: "ba-c-ink", "aria-hidden": "true" }));
    function toggle(open) {
      menu.hidden = !open;
      moreBtn.setAttribute("aria-expanded", open);
      if (open) menu.querySelector("button")?.focus();
    }
    document.addEventListener("click", (e) => !moreWrap.contains(e.target) && toggle(false));
    moreWrap.addEventListener("keydown", (e) => e.key === "Escape" && (toggle(false), moreBtn.focus()));
    const root = h("div", { class: "ba-c" }, bar);
    root._more = { more, moreBtn, moreLabel };
    addEventListener("resize", () => updateTabs(root));
    requestAnimationFrame(() => updateTabs(root));
    return root;
  }
  function updateTabs(root) {
    const { more, moreBtn, moreLabel } = root._more;
    const inMore = more.find((c) => c.key === active);
    moreLabel.textContent = inMore ? inMore.label : "More";
    moreBtn.classList.toggle("is-on", !!inMore);
    moreBtn.querySelector(".ba-c-n").textContent = inMore ? fmt(inMore.count) : String(more.length);
    const on = root.querySelector(".ba-c-tabs .is-on") || (inMore && moreBtn);
    const ink = root.querySelector(".ba-c-ink");
    if (!on || !ink) return;
    const bar = root.querySelector(".ba-c-bar").getBoundingClientRect();
    const r = on.getBoundingClientRect();
    ink.style.width = r.width + "px";
    ink.style.transform = `translateX(${r.left - bar.left}px)`;
  }

  /* ---------- D · quiet text tabs ---------- */
  function buildD() {
    const track = h("div", { class: "ba-track ba-d", role: "group", "aria-label": "Beer, Wine & Spirits types" },
      [all, ...cats].map((c) =>
        btn(c, "ba-d-tab", h("span", { class: "ba-d-label" }, c.label), h("span", { class: "ba-d-n" }, fmt(c.count)))));
    const wrap = scroller(track);
    wrap.classList.add("ba-noarrows");
    return h("div", { class: "ba-d-bar" }, wrap);
  }

  /* ---------- E · round thumbnails ---------- */
  function buildE() {
    const track = h("div", { class: "ba-track ba-e", role: "group", "aria-label": "Beer, Wine & Spirits types" },
      [all, ...cats].map((c) => {
        const src = thumb(c);
        const b = btn(c, "ba-e-item",
          h("span", { class: "ba-e-disc" },
            src ? h("img", { src, alt: "", loading: "lazy" }) : h("span", { class: "ba-e-all" }, "All")),
          // short caption keeps every label on one line: "Hard Seltzer, Cider & Cocktails" -> "Hard Seltzer"
          h("span", { class: "ba-e-label" }, c.label.split(/,| &/)[0]));
        b.title = `${c.label} · ${fmt(c.count)}`;
        return b;
      }));
    const wrap = scroller(track);
    wrap.classList.add("ba-noarrows");
    return wrap;
  }

  /* ---------- F · soft chips ---------- */
  function buildF() {
    const track = h("div", { class: "ba-track ba-f", role: "group", "aria-label": "Beer, Wine & Spirits types" },
      [all, ...cats].map((c) =>
        btn(c, "ba-f-chip", h("span", { class: "ba-f-face" }, c.label, h("span", { class: "ba-f-n" }, fmt(c.count))))));
    const wrap = scroller(track);
    wrap.classList.add("ba-noarrows");
    return wrap;
  }

  /* ---------- Departments (G, H): clickable rail with mock subcategories ----------
     Beer & Wine uses the real snapshot products. Every other department gets mock
     subcategories and placeholder product cards so the prototype can be clicked through. */
  const afterSync = [];
  const onViewChange = [];
  const isView = (id) => document.body.dataset.baView === id;
  const isGH = () => isView("g") || isView("h");
  const BEER_KEY = "beerWine";
  const dtabs = [...document.querySelectorAll(".shop-side .dtab")];
  const deptLabel = (key) => dtabs.find((t) => t.dataset.tab === key)?.querySelector(".dtab-label")?.textContent || "";
  const searchInput = document.querySelector(".shop-search input");
  const BEER_TITLE = origTitle, BEER_RESULTS = origResults, BEER_TOTAL = all.count;

  // [subcategory, count, product names]
  const MOCK = {
    bakery: [["Bread", 142, "Sourdough Loaf|Honey Wheat Bread|Italian Bread|Multigrain Bread"], ["Bagels & Muffins", 38, "Plain Bagels|Everything Bagels|Blueberry Muffins|English Muffins"], ["Cakes & Cupcakes", 54, "Chocolate Layer Cake|Vanilla Cupcakes|Carrot Cake|Red Velvet Cupcakes"], ["Cookies & Brownies", 61, "Chocolate Chip Cookies|Fudge Brownies|Oatmeal Raisin Cookies|Sugar Cookies"], ["Donuts & Pastries", 33, "Glazed Donuts|Apple Turnovers|Cheese Danish|Butter Croissants"], ["Rolls & Buns", 47, "Dinner Rolls|Hamburger Buns|Hot Dog Buns|Brioche Buns"]],
    dairy: [["Milk", 96, "Whole Milk|2% Reduced Fat Milk|Skim Milk|Chocolate Milk"], ["Eggs", 24, "Large White Eggs|Brown Eggs|Cage-Free Eggs|Egg Whites"], ["Cheese", 188, "Sharp Cheddar|Shredded Mozzarella|Swiss Slices|Parmesan Wedge"], ["Yogurt", 132, "Greek Yogurt|Vanilla Yogurt|Strawberry Yogurt|Plain Yogurt"], ["Butter", 31, "Salted Butter|Unsalted Butter|Spreadable Butter|European Butter"], ["Creamers", 58, "Half & Half|Heavy Cream|French Vanilla Creamer|Oat Creamer"], ["Plant-Based Milk", 44, "Almond Milk|Oat Milk|Soy Milk|Coconut Milk"]],
    deli: [["Sliced Meats", 77, "Oven Roasted Turkey|Black Forest Ham|Genoa Salami|Roast Beef"], ["Sliced Cheese", 52, "American Cheese|Provolone|Pepper Jack|Muenster"], ["Prepared Salads", 28, "Potato Salad|Macaroni Salad|Chicken Salad|Coleslaw"], ["Hot Foods", 16, "Rotisserie Chicken|Chicken Tenders|Mac & Cheese|Meatballs"], ["Dips & Spreads", 35, "Hummus|Spinach Dip|Guacamole|Pimento Cheese"]],
    grocery: [["Pasta & Rice", 164, "Spaghetti|Penne Rigate|Long Grain Rice|Jasmine Rice"], ["Canned Goods", 231, "Diced Tomatoes|Black Beans|Chicken Noodle Soup|Sweet Corn"], ["Cereal & Breakfast", 148, "Honey Oat Cereal|Rolled Oats|Pancake Mix|Granola"], ["Snacks & Chips", 276, "Potato Chips|Tortilla Chips|Pretzels|Popcorn"], ["Baking", 119, "All-Purpose Flour|Granulated Sugar|Baking Soda|Chocolate Chips"], ["Condiments & Sauces", 203, "Ketchup|Yellow Mustard|Marinara Sauce|Mayonnaise"], ["Coffee & Tea", 97, "Medium Roast Coffee|Green Tea|Decaf Coffee|Black Tea"]],
    household: [["Cleaning Supplies", 88, "All-Purpose Cleaner|Glass Cleaner|Disinfecting Wipes|Bleach"], ["Laundry", 64, "Liquid Detergent|Dryer Sheets|Fabric Softener|Stain Remover"], ["Trash Bags", 22, "Kitchen Trash Bags|Outdoor Bags|Recycling Bags|Small Bags"], ["Dish Care", 31, "Dish Soap|Dishwasher Pods|Sponges|Rinse Aid"]],
    meat: [["Chicken", 58, "Chicken Breasts|Chicken Thighs|Whole Chicken|Chicken Wings"], ["Beef", 71, "Ground Beef 85%|Ribeye Steak|Chuck Roast|Sirloin Steak"], ["Pork", 39, "Pork Chops|Pork Tenderloin|Baby Back Ribs|Pork Shoulder"], ["Sausage & Hot Dogs", 46, "Italian Sausage|Beef Hot Dogs|Breakfast Links|Bratwurst"], ["Bacon", 23, "Thick Cut Bacon|Center Cut Bacon|Turkey Bacon|Applewood Bacon"]],
    paperProducts: [["Paper Towels", 21, "Paper Towels 6 Roll|Select-A-Size Towels|Paper Towels 12 Roll|Shop Towels"], ["Toilet Paper", 26, "Toilet Paper 12 Roll|Ultra Soft Bath Tissue|Toilet Paper 24 Roll|Septic Safe Tissue"], ["Napkins", 14, "Dinner Napkins|Lunch Napkins|Cocktail Napkins|Recycled Napkins"], ["Plates & Cups", 33, "Paper Plates|Plastic Cups|Bowls|Hot Cups"]],
    pets: [["Dog Food", 94, "Dry Dog Food|Wet Dog Food|Puppy Food|Grain-Free Dog Food"], ["Cat Food", 87, "Dry Cat Food|Wet Cat Food|Kitten Food|Indoor Cat Food"], ["Treats", 61, "Dog Biscuits|Dental Chews|Cat Treats|Jerky Treats"], ["Litter & Supplies", 42, "Clumping Litter|Poop Bags|Pet Wipes|Chew Toy"]],
    pharmacy: [["Pain Relief", 73, "Ibuprofen|Acetaminophen|Naproxen|Aspirin"], ["Cold & Flu", 66, "Daytime Cold Relief|Cough Syrup|Nasal Spray|Throat Lozenges"], ["Vitamins", 128, "Multivitamin|Vitamin D3|Vitamin C|Fish Oil"], ["First Aid", 41, "Bandages|Antibiotic Ointment|Gauze Pads|Medical Tape"]],
    produce: [["Fresh Fruit", 112, "Bananas|Honeycrisp Apples|Strawberries|Navel Oranges"], ["Fresh Vegetables", 146, "Broccoli Crowns|Baby Carrots|Red Bell Peppers|Yellow Onions"], ["Salads & Greens", 39, "Spring Mix|Romaine Hearts|Baby Spinach|Caesar Salad Kit"], ["Herbs", 22, "Fresh Basil|Cilantro|Flat Leaf Parsley|Fresh Mint"], ["Organic", 68, "Organic Bananas|Organic Avocados|Organic Kale|Organic Blueberries"]],
    seafood: [["Fresh Fish", 26, "Atlantic Salmon Fillet|Cod Fillet|Tilapia Fillet|Haddock"], ["Shrimp", 18, "Raw Shrimp 21/25|Cooked Shrimp|Jumbo Shrimp|Shrimp Ring"], ["Frozen Seafood", 34, "Breaded Fish Fillets|Fish Sticks|Frozen Scallops|Crab Cakes"], ["Shellfish", 11, "Mussels|Littleneck Clams|Snow Crab Legs|Lobster Tails"]],
  };
  // the rail's data-tab ids for the non-beer departments, matched by label where they differ
  const MOCK_KEY = (key) => (MOCK[key] ? key : key === "paper" || /paper/i.test(deptLabel(key)) ? "paperProducts" : key);
  const BRANDS = ["Price Chopper", "Hillside Farms"];

  const template = (BEER_CARDS.find((c) => !c.el.querySelector(".ipc-saletag")) || BEER_CARDS[0]).el.cloneNode(true);
  template.hidden = false;
  template.classList.remove("ba-in");
  template.style.animationDelay = "";
  function mockCard(name, ico, cat, i) {
    const el = template.cloneNode(true);
    el.querySelector(".ipc-saletag")?.remove();
    el.querySelector(".was")?.remove();
    el.querySelector(".price")?.classList.remove("on-sale");
    el.querySelector(".now").textContent = "$" + (1.99 + (hash(name) % 1100) / 100).toFixed(2);
    el.querySelector(".pn").textContent = name;
    el.querySelector(".photo")?.replaceWith(h("span", { class: "ba-ph", "aria-hidden": "true" }, h("span", { class: "ba-ico", style: `--ico:${ico}` })));
    el.hidden = true;
    grid.appendChild(el);
    return { el, i, name, img: null, cat };
  }

  const deptCache = {};
  function deptData(key) {
    if (key === BEER_KEY) return { cats: BEER_CATS, cards: BEER_CARDS, total: BEER_TOTAL };
    if (deptCache[key]) return deptCache[key];
    const tab = dtabs.find((t) => t.dataset.tab === key);
    const ico = tab?.querySelector(".gp-icon")?.style.maskImage || 'url("/ba-1842/lucide/layout-grid.svg")';
    const subs = MOCK[MOCK_KEY(key)];
    let d;
    if (subs) {
      const dcats = subs.map(([label, count], i) => ({ key: `${key}-${i}`, label, count }));
      const dcards = [];
      subs.forEach(([, , items], i) =>
        BRANDS.forEach((brand) => items.split("|").forEach((item) => dcards.push(mockCard(`${brand} ${item}`, ico, `${key}-${i}`, dcards.length)))));
      dcards.sort((a, b) => hash(a.name) - hash(b.name));
      d = { cats: dcats, cards: dcards, total: dcats.reduce((n, c) => n + c.count, 0) };
    } else {
      // "Recommended For You": no subcategories, a mix from every department
      const mix = [...BEER_CARDS.slice(0, 4)];
      Object.keys(MOCK).forEach((k) => {
        const real = dtabs.find((t) => MOCK_KEY(t.dataset.tab) === k)?.dataset.tab;
        if (real) mix.push(...deptData(real).cards.slice(0, 2));
      });
      d = { cats: [], cards: mix.sort((a, b) => hash(a.name) - hash(b.name)), total: 312 };
    }
    return (deptCache[key] = d);
  }

  let curDept = BEER_KEY;
  function setDept(key) {
    curDept = key;
    const d = deptData(key);
    cats = d.cats;
    cards = d.cards;
    all.count = d.total;
    const name = deptLabel(key);
    origTitle = key === BEER_KEY ? BEER_TITLE : name;
    origResults = key === BEER_KEY ? BEER_RESULTS : `${fmt(d.total)} results`;
    if (searchInput) searchInput.placeholder = `Search ${name}…`;
    dtabs.forEach((t) => {
      const on = t.dataset.tab === key;
      t.classList.toggle("on", on);
      t.setAttribute("aria-selected", on);
    });
    renderG();
    renderH();
    apply("all");
  }

  // caret + current-subcategory caption on every department that has subcategories
  dtabs.forEach((t) => {
    if (t.dataset.tab === "all") return;
    t.append(h("span", { class: "ba-dept-cur", "aria-hidden": "true" }), icon("chevron-down", "ba-ico ba-dept-caret"));
  });
  afterSync.push(() => {
    const cat = cats.find((c) => c.key === active);
    dtabs.forEach((t) => {
      const cur = t.querySelector(".ba-dept-cur");
      const mine = t.dataset.tab === curDept && cat;
      if (cur) cur.textContent = mine ? cat.label : "";
      t.classList.toggle("ba-has-cur", !!mine);
    });
  });

  /* ---------- G · department sub-menu ---------- */
  let gOpen = true;
  const gMobile = h("div", { class: "ba-g-mobile" });
  dtabs[0]?.closest(".dept-nav")?.after(gMobile);
  function renderG() {
    document.querySelectorAll(".ba-g-sub").forEach((n) => n.remove());
    gMobile.replaceChildren();
    dtabs.forEach((t) => t.classList.toggle("ba-open", t.dataset.tab === curDept && gOpen && cats.length > 0));
    if (!cats.length) return;
    const tab = dtabs.find((t) => t.dataset.tab === curDept);
    const name = deptLabel(curDept);
    const items = [{ ...all, label: `All ${name}` }, ...cats];
    tab.after(h("div", { class: "ba-g-sub", role: "group", "aria-label": `${name} types` },
      items.map((c) => btn(c, "ba-g-item", h("span", { class: "ba-g-label" }, c.label), h("span", { class: "ba-g-n" }, fmt(c.count))))));
    const track = h("div", { class: "ba-track ba-g-row", role: "group", "aria-label": `${name} types` },
      [{ ...all }, ...cats].map((c) => btn(c, "ba-d-tab", h("span", { class: "ba-d-label" }, c.label), h("span", { class: "ba-d-n" }, fmt(c.count)))));
    const wrap = scroller(track);
    wrap.classList.add("ba-noarrows");
    gMobile.append(wrap);
    tab.setAttribute("aria-expanded", gOpen);
  }
  function buildG() { return h("div"); }

  /* ---------- H · department overlay (text only) ---------- */
  const hTitle = h("strong", { class: "ba-h-title" });
  const hList = h("div", { class: "ba-h-list" });
  const hPanel = h("div", { class: "ba-h-panel", role: "dialog", "aria-modal": "true" },
    h("span", { class: "ba-h-grab", "aria-hidden": "true" }),
    h("header", { class: "ba-h-head" }, hTitle,
      h("button", { type: "button", class: "ba-h-close", "aria-label": "Close", onclick: () => closeH() }, icon("x"))),
    hList);
  const hBackdrop = h("div", { class: "ba-h-backdrop", onclick: () => closeH() });
  // mount inside the element that carries the retailer theme vars, so --c-primary is navy, not the base green
  const themed = [...document.querySelectorAll("[style]")].find((el) => el.getAttribute("style").includes("--c-primary")) || document.body;
  themed.append(hBackdrop, hPanel);
  let hTab = null;
  function renderH() {
    const name = deptLabel(curDept);
    hTitle.textContent = name;
    hPanel.setAttribute("aria-label", `${name} types`);
    hList.replaceChildren(...[{ ...all, label: `All ${name}` }, ...cats].map((c) => {
      const b = btn(c, "ba-h-item", h("span", { class: "ba-h-label" }, c.label), h("span", { class: "ba-h-n" }, fmt(c.count)), icon("check", "ba-ico ba-h-check"));
      b.addEventListener("click", () => setTimeout(closeH, 120));
      return b;
    }));
  }
  function placeH() {
    if (!hTab) return;
    const side = hTab.closest(".shop-side").getBoundingClientRect();
    const r = hTab.getBoundingClientRect();
    hPanel.style.setProperty("--ba-h-left", side.right + 12 + "px");
    hPanel.style.setProperty("--ba-h-top", Math.max(80, Math.min(r.top - 8, innerHeight - hPanel.offsetHeight - 16)) + "px");
  }
  function openH(tab, viaKeyboard) {
    hTab = tab;
    document.body.classList.add("ba-h-open");
    dtabs.forEach((t) => t.setAttribute("aria-expanded", t === tab));
    placeH();
    if (viaKeyboard) (hList.querySelector(".is-on") || hList.querySelector(".ba-h-item"))?.focus({ preventScroll: true });
  }
  function closeH() {
    if (!document.body.classList.contains("ba-h-open")) return;
    document.body.classList.remove("ba-h-open");
    hTab?.setAttribute("aria-expanded", "false");
  }
  addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("ba-h-open")) { closeH(); hTab?.focus(); }
  });
  addEventListener("resize", () => document.body.classList.contains("ba-h-open") && placeH());
  addEventListener("scroll", () => document.body.classList.contains("ba-h-open") && innerWidth >= 1024 && placeH(), { passive: true });
  function buildH() { return h("div"); }

  /* ---------- department clicks (G and H only) ---------- */
  dtabs.forEach((t) => {
    if (t.dataset.tab !== "all") t.setAttribute("aria-haspopup", "true");
    t.addEventListener("click", (e) => {
      if (!isGH()) return;
      const key = t.dataset.tab;
      const switching = key !== curDept;
      if (isView("g")) gOpen = switching ? true : !gOpen; // opening a department expands its sub-menu
      document.body.classList.toggle("ba-g-collapsed", !gOpen);
      if (switching) setDept(key);
      else renderG();
      if (isView("h") && !cats.length) closeH(); // e.g. Recommended For You: nothing to choose
      else if (isView("h")) {
        if (!switching && document.body.classList.contains("ba-h-open")) closeH();
        else openH(t, e.detail === 0); // opening a department opens its overlay
      }
    });
  });
  // leaving G/H puts the page back on Beer & Wine so the other directions keep working
  onViewChange.push(() => {
    closeH();
    gOpen = true;
    document.body.classList.remove("ba-g-collapsed");
    if (!isGH() && curDept !== BEER_KEY) setDept(BEER_KEY);
    else renderG();
  });
  renderH();

  /* ---------- mount: inherited first, then the directions ---------- */
  const taxa = baseRow.closest(".shop-taxa");
  const baseSection = h("section", { class: "ba-variant", id: "ba-v-base" },
    tag("Inherited · current", "Live pills", "Today's row from the live page, untouched. It now filters too, so you can compare."));
  taxa.before(baseSection);
  baseSection.append(taxa);
  const builders = { a: buildA, b: buildB, c: buildC, d: buildD, e: buildE, f: buildF, g: buildG, h: buildH };
  let anchor = baseSection;
  VARIANTS.forEach((v) => {
    const s = h("section", { class: "ba-variant", id: `ba-v-${v.id}` },
      tag(`Proposed · ${v.id.toUpperCase()}`, v.name, v.why), builders[v.id]());
    anchor.after(s);
    anchor = s;
  });

  /* ---------- floating view switcher: show one direction at a time ---------- */
  const views = [
    { id: "base", key: "Current", name: "Live pills" },
    ...VARIANTS.map((v) => ({ id: v.id, key: v.id.toUpperCase(), name: v.name })),
  ];
  // Round 2: compare the shared option A against the new minimal directions.
  // Base, B and C stay built; add their ids here to put them back in the bar.
  // ?v=f (or a/b/c/d/e/base) pins one design for sharing: no switcher, no saved pick.
  const PINNED = new URLSearchParams(location.search).get("v");
  const SHOW_SWITCHER = !PINNED;
  const SWITCHER_VIEWS = ["d", "e", "f", "g", "h"];
  const DEFAULT_VIEW = "g";
  const STORE = "ba-1842-view-r3";
  const read = () => { try { return localStorage.getItem(STORE); } catch { return null; } };
  const write = (v) => { try { localStorage.setItem(STORE, v); } catch {} };
  const caption = h("span", { class: "ba-sw-cap", "aria-live": "polite" });
  const seg = h("div", { class: "ba-sw-seg", role: "radiogroup", "aria-label": "Pill design" },
    views.filter((v) => SWITCHER_VIEWS.includes(v.id)).map((v) => h("button", {
      type: "button", role: "radio", class: "ba-sw-btn", "data-view": v.id, "aria-checked": "false",
      title: v.name, onclick: () => show(v.id),
    }, v.key)));
  if (SHOW_SWITCHER) document.body.append(h("div", { class: "ba-sw" }, seg, caption));
  document.body.classList.add("ba-solo");

  function show(id) {
    const v = views.find((x) => x.id === id) || views[0];
    document.querySelectorAll(".ba-variant").forEach((s) => s.classList.toggle("is-shown", s.id === `ba-v-${v.id}`));
    seg.querySelectorAll(".ba-sw-btn").forEach((b) => b.setAttribute("aria-checked", b.dataset.view === v.id));
    caption.textContent = v.name;
    document.body.dataset.baView = v.id;
    onViewChange.forEach((f) => f());
    write(v.id);
    document.querySelectorAll(".ba-c").forEach(updateTabs);
  }
  addEventListener("keydown", (e) => {
    if (!SHOW_SWITCHER) return;
    if (e.target.closest("input, select, textarea") || e.metaKey || e.ctrlKey || e.altKey) return;
    const i = Number(e.key) - 1; // 1–4 = the switcher's buttons, left to right
    if (SWITCHER_VIEWS[i]) show(SWITCHER_VIEWS[i]);
  });
  const saved = read();
  if (PINNED && views.some((v) => v.id === PINNED)) {
    document.querySelectorAll(".ba-variant").forEach((s) => s.classList.toggle("is-shown", s.id === `ba-v-${PINNED}`));
    document.body.dataset.baView = PINNED;
    onViewChange.forEach((f) => f());
  } else {
    show(SHOW_SWITCHER && SWITCHER_VIEWS.includes(saved) ? saved : DEFAULT_VIEW);
  }
  sync();
})();
