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
  const cats = baseChips.map((b, i) => ({
    key: KEYS[i] || "other" + i,
    label: b.childNodes[0].textContent.trim(),
    count: Number(b.querySelector(".fchip-n")?.textContent || 0),
  }));
  const total = Number((results?.textContent.match(/[\d,]+/) || ["0"])[0].replace(/,/g, "")) || 0;
  const all = { key: "all", label: "All", count: total };
  const fmt = (n) => n.toLocaleString("en-US");

  const cards = [...grid.children].map((el, i) => {
    const name = el.querySelector(".pn")?.textContent || "";
    const hit = RULES.find(([, re]) => re.test(name));
    return { el, i, name, img: el.querySelector("img")?.getAttribute("src"), cat: hit ? hit[0] : "other" };
  });

  const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
  function pick(cat) {
    const own = cards.filter((c) => c.cat === cat.key);
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

  const origTitle = title?.textContent;
  const origResults = results?.textContent;
  let active = "all";

  function apply(key) {
    active = active === key && key !== "all" ? "all" : key;
    const cat = cats.find((c) => c.key === active);
    const shown = cat ? pick(cat) : cards;
    const set = new Set(shown);
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
      const on = cats[i].key === active;
      b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", on);
    });
    document.querySelectorAll("[data-ba-key]").forEach((b) => {
      const on = b.dataset.baKey === active;
      b.setAttribute("aria-pressed", on);
      b.classList.toggle("is-on", on);
    });
    document.querySelectorAll(".ba-c").forEach(updateTabs);
  }

  baseChips.forEach((b, i) => b.addEventListener("click", () => apply(cats[i].key, b)));

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

  /* ---------- mount: inherited first, then the directions ---------- */
  const taxa = baseRow.closest(".shop-taxa");
  const baseSection = h("section", { class: "ba-variant", id: "ba-v-base" },
    tag("Inherited · current", "Live pills", "Today's row from the live page, untouched. It now filters too, so you can compare."));
  taxa.before(baseSection);
  baseSection.append(taxa);
  const builders = { a: buildA, b: buildB, c: buildC, d: buildD, e: buildE, f: buildF };
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
  const SWITCHER_VIEWS = ["a", "d", "e", "f"];
  const DEFAULT_VIEW = "d";
  const STORE = "ba-1842-view-r2";
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
  } else {
    show(SHOW_SWITCHER && SWITCHER_VIEWS.includes(saved) ? saved : DEFAULT_VIEW);
  }
  sync();
})();
