import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const config = window.LANTERN_SHOP_CONFIG || {};
const page = document.body.dataset.page;
const $ = (selector, root = document) => root.querySelector(selector);

// check that imageURl is a valid URL, otherwise returns an empty string, escape HTML
const esc = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (ch) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        ch
      ],
  );
const imageUrl = (value) => {
  try {
    const u = new URL(value);
    return ["https:", "http:"].includes(u.protocol) ? u.href : "";
  } catch {
    return "";
  }
};
const tabAuthStorage = {
  getItem(key) {
    let value = window.sessionStorage.getItem(key);
    if (value === null) value = window.localStorage.getItem(key);
    if (value !== null) window.sessionStorage.setItem(key, value);
    window.localStorage.removeItem(key);
    return value;
  },
  setItem(key, value) {
    window.sessionStorage.setItem(key, value);
    window.localStorage.removeItem(key);
  },
  removeItem(key) {
    window.sessionStorage.removeItem(key);
    window.localStorage.removeItem(key);
  },
};
// check supabase config
const sb =
  config.supabaseUrl && config.supabaseAnonKey
    ? createClient(config.supabaseUrl, config.supabaseAnonKey, {
        auth: {
          storage: tabAuthStorage,
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
        },
      })
    : null;
let session = null,
  currentUser = null,
  isAdmin = false,
  allProducts = [];

// util function to display messages in the UI, optionally errors
function say(target, text, error = false) {
  if (!target) return;
  target.textContent = text;
  target.classList.toggle("error", error);
}
function unavailable() {
  document
    .querySelectorAll("form")
    .forEach((form) =>
      form.addEventListener("submit", (e) => e.preventDefault()),
    );
  document.querySelectorAll('button[type="submit"]').forEach((button) => {
    button.disabled = true;
  });

  // if content not loading from supabase
  const n = $(".main");
  if (n) {
    const box = document.createElement("div");
    box.className = "notice";
    box.innerHTML =
      "Connect the shop to Supabase to load products and accounts. Add your Project URL and publishable key to <code>config.js</code>, then run <code>supabase-setup.sql</code> in the project SQL Editor.";
    n.prepend(box);
  }
}

// convert currency values to a formatted string, e.g. 1234.5 → "$1,234.50"
function money(price, currency = "USD") {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
    }).format(Number(price) || 0);
  } catch {
    return `${currency} ${Number(price) || 0}`;
  }
}

// user label and account link in the header
function setAccount(user) {
  currentUser = user || null;
  const label = $("#user-label"),
    link = $("#account-link");
  if (label)
    label.textContent = user
      ? `Welcome, ${user.user_metadata?.full_name || user.email?.split("@")[0] || "friend"}`
      : "The evening collection";
  if (link) {
    link.textContent = user ? "Sign out" : "Sign in";
    link.href = user ? "#" : "login.html";
    link.onclick = user
      ? async (e) => {
          e.preventDefault();
          await sb.auth.signOut();
          location.href = "index.html";
        }
      : null;
  }
}

// cart live count in the header
async function refreshCartCount() {
  const node = $("#cart-count");
  if (!node || !sb || !currentUser) {
    if (node) node.textContent = "";
    return;
  }
  const { data } = await sb
    .from("cart_items")
    .select("quantity")
    .eq("user_id", currentUser.id);
  const count = (data || []).reduce((sum, row) => sum + row.quantity, 0);
  node.textContent = count ? `(${count})` : "";
}

// check if the current user is an admin
async function checkAdmin() {
  if (!sb || !currentUser) return false;
  const { data, error } = await sb
    .from("shop_admins")
    .select("user_id")
    .eq("user_id", currentUser.id)
    .maybeSingle();
  if (error) console.warn("Admin check:", error.message);
  return Boolean(data);
}

// generate a product card
function productCard(product, admin = false) {
  const img = imageUrl(product.image_url);
  const visual = img
    ? `<img class="product-image" src="${esc(img)}" alt="${esc(product.name)}" loading="lazy">`
    : `<div class="product-placeholder" aria-label="No product image">✦</div>`;
  const stock =
    Number(product.stock) > 0
      ? ""
      : '<span class="muted" style="font-size:10px"> · Out of stock</span>';
  return `<article class="product-card">${visual}<div class="product-info"><div class="product-cat">${esc(product.category || "Goods")}${stock}</div><h3>${esc(product.name)}</h3><p>${esc(product.description || "")}</p><div class="product-bottom"><span class="price">${money(product.price, product.currency)}</span><button class="button small" data-add="${esc(product.id)}" ${Number(product.stock) < 1 ? "disabled" : ""}>Add to basket</button></div>${admin ? `<div style="display:flex;gap:8px;margin-top:12px"><button class="button ghost small" data-edit="${esc(product.id)}">Edit</button><button class="button danger small" data-delete="${esc(product.id)}">Delete</button></div>` : ""}</div></article>`;
}

// render products into a target element or show message if none
function renderProducts(
  target,
  products,
  admin = false,
  emptyMessage = "No pieces in the collection yet.",
) {
  if (!target) return;
  target.innerHTML = products.length
    ? products.map((p) => productCard(p, admin)).join("")
    : `<div class="empty" style="grid-column:1/-1">${esc(emptyMessage)}</div>`;
}

// fetch products from the database, ordered by creation date
async function fetchProducts() {
  const { data, error } = await sb
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}
// if homepage returns featured products
async function initHome() {
  const target = $('[data-products="featured"]');
  try {
    const rows = await fetchProducts();
    allProducts = rows;
    renderProducts(
      target,
      rows.slice(0, 4),
      false,
      "The collection is being arranged. Check back soon.",
    );
    target?.addEventListener("click", (e) => {
      const add = e.target.closest("[data-add]");
      if (add) addToCart(add.dataset.add);
    });
  } catch (e) {
    renderProducts(
      target,
      [],
      false,
      e.message || "Could not load the collection.",
    );
  }
}

// render products into the catalog with search, filter, and sort options
function renderCatalog() {
  const q = ($("#search")?.value || "").trim().toLowerCase();
  const category = $("#category-filter")?.value || "";
  const sort = $("#sort-filter")?.value || "featured";
  let rows = allProducts.filter(
    (p) =>
      (!category || p.category === category) &&
      (!q ||
        `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(q)),
  );
  if (sort === "price-asc")
    rows.sort((a, b) => Number(a.price) - Number(b.price));
  if (sort === "price-desc")
    rows.sort((a, b) => Number(b.price) - Number(a.price));
  if (sort === "name") rows.sort((a, b) => a.name.localeCompare(b.name));
  const status = $("#catalog-status");
  if (status)
    say(status, `${rows.length} ${rows.length === 1 ? "piece" : "pieces"}`);
  renderProducts(
    $('[data-products="catalog"]'),
    rows,
    isAdmin,
    "No pieces match that search. Try another filter.",
  );
}

// reset product form to default values
function resetProductForm() {
  const form = $("#product-form");
  if (!form) return;
  form.reset();
  form.elements.id.value = "";
  form.elements.currency.value = "USD";
  form.elements.category.value = "Lanterns";
  form.elements.is_active.checked = true;
  $("#save-product").textContent = "Add product";
  $("#cancel-edit").hidden = true;
  say($("#admin-status"), "");
}

// initial catalogue on manage products page
async function initCatalog() {
  const panel = $("#admin-panel");
  isAdmin = await checkAdmin();
  if (panel) panel.hidden = !isAdmin;
  try {
    allProducts = await fetchProducts();
    const select = $("#category-filter");
    for (const name of [
      ...new Set(allProducts.map((p) => p.category).filter(Boolean)),
    ].sort()) {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      select.append(option);
    }
    renderCatalog();
  } catch (e) {
    say($("#catalog-status"), e.message || "Could not load products.", true);
  }
  $("#search")?.addEventListener("input", renderCatalog);
  $("#category-filter")?.addEventListener("change", renderCatalog);
  $("#sort-filter")?.addEventListener("change", renderCatalog);
  // add to cart from admin panel
  $('[data-products="catalog"]')?.addEventListener("click", async (e) => {
    const add = e.target.closest("[data-add]");
    if (add) {
      await addToCart(add.dataset.add);
      return;
    }
    const edit = e.target.closest("[data-edit]");
    if (edit) {
      const p = allProducts.find((x) => x.id === edit.dataset.edit);
      if (!p) return;
      const f = $("#product-form");
      for (const key of [
        "id",
        "name",
        "category",
        "description",
        "price",
        "currency",
        "stock",
        "image_url",
      ])
        f.elements[key].value = p[key] ?? "";
      f.elements.is_active.checked = p.is_active;
      $("#save-product").textContent = "Save changes";
      $("#cancel-edit").hidden = false;
      $("#admin-panel").open = true;
      $("#admin-panel").scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const del = e.target.closest("[data-delete]");
    if (del) {
      const p = allProducts.find((x) => x.id === del.dataset.delete);
      if (!p || !confirm(`Delete “${p.name}” from the catalog?`)) return;
      del.disabled = true;
      const { error } = await sb.from("products").delete().eq("id", p.id);
      if (error) say($("#catalog-status"), error.message, true);
      else {
        allProducts = allProducts.filter((x) => x.id !== p.id);
        renderCatalog();
        say($("#admin-status"), "Product deleted.");
      }
      return;
    }
  });
  $("#cancel-edit")?.addEventListener("click", resetProductForm);
  $("#product-form")?.addEventListener("submit", saveProduct);
}

// create a new product or update an existing one
async function saveProduct(e) {
  e.preventDefault();
  const form = e.currentTarget,
    fd = new FormData(form),
    status = $("#admin-status"),
    button = $("#save-product");
  button.disabled = true;
  say(status, "Saving…");
  try {
    let photoUrl = String(fd.get("image_url") || "").trim();
    const file = fd.get("image_file");
    if (file?.size) {
      if (file.size > 5 * 1024 * 1024)
        throw new Error("Choose an image smaller than 5 MB.");
      const clean = file.name.replace(/[^a-z0-9._-]/gi, "-");
      const path = `catalog/${crypto.randomUUID()}-${clean}`;
      const { error: uploadError } = await sb.storage
        .from("product-images")
        .upload(path, file, { contentType: file.type, upsert: false });
      if (uploadError) throw uploadError;
      photoUrl = sb.storage.from("product-images").getPublicUrl(path)
        .data.publicUrl;
      form.elements.image_url.value = photoUrl;
    }
    const row = {
      name: String(fd.get("name")).trim(),
      category: String(fd.get("category")).trim(),
      description: String(fd.get("description") || "").trim(),
      price: Number(fd.get("price")),
      currency: String(fd.get("currency")).trim().toUpperCase(),
      stock: Number(fd.get("stock")),
      image_url: photoUrl,
      is_active: fd.get("is_active") === "on",
    };
    const id = String(fd.get("id") || "");
    const result = id
      ? await sb.from("products").update(row).eq("id", id).select().single()
      : await sb.from("products").insert(row).select().single();
    if (result.error) throw result.error;
    allProducts = id
      ? allProducts.map((p) => (p.id === id ? result.data : p))
      : [result.data, ...allProducts];
    resetProductForm();
    renderCatalog();
    say(status, id ? "Product updated." : "Product added.");
  } catch (err) {
    say(status, err.message || "Could not save product.", true);
  } finally {
    button.disabled = false;
  }
}

// add to cart function for both catalog and admin panel
async function addToCart(productId) {
  if (!currentUser) {
    location.href = "login.html?next=cart.html";
    return;
  }
  const product = allProducts.find((p) => p.id === productId);
  if (!product) {
    say($("#catalog-status"), "Product was not found.", true);
    return;
  }
  const { data: existing, error: readError } = await sb
    .from("cart_items")
    .select("id,quantity")
    .eq("user_id", currentUser.id)
    .eq("product_id", productId)
    .maybeSingle();
  if (readError) {
    say($("#catalog-status") || $("#home-status"), readError.message, true);
    return;
  }
  if ((existing?.quantity || 0) >= product.stock) {
    say(
      $("#catalog-status") || $("#home-status"),
      "Your basket already has all available stock.",
      true,
    );
    return;
  }
  const result = existing
    ? await sb
        .from("cart_items")
        .update({ quantity: existing.quantity + 1 })
        .eq("id", existing.id)
    : await sb.from("cart_items").insert({
        user_id: currentUser.id,
        product_id: productId,
        quantity: 1,
      });
  if (result.error)
    say($("#catalog-status") || $("#home-status"), result.error.message, true);
  else {
    say(
      $("#catalog-status") || $("#home-status"),
      `${product.name} added to your basket.`,
    );
    await refreshCartCount();
  }
}
// check if the product has an image
function productVisual(product, alt) {
  const img = imageUrl(product?.image_url);
  return img
    ? `<img src="${esc(img)}" alt="${esc(alt)}" loading="lazy">`
    : '<div class="product-placeholder">✦</div>';
}

// cart items page with controls
async function initCart() {
  const host = $("#cart-content"),
    status = $("#cart-status");
  if (!currentUser) {
    host.innerHTML =
      '<div class="empty">Sign in to see and manage your basket.<br><a class="button" style="margin-top:18px" href="login.html?next=cart.html">Sign in</a></div>';
    return;
  }
  say(status, "Loading your basket…");

  // get cart data from the database
  const { data, error } = await sb
    .from("cart_items")
    .select(
      "id,quantity,product:products(id,name,price,currency,category,image_url,stock,is_active)",
    )
    .eq("user_id", currentUser.id)
    .order("created_at");
  if (error) {
    say(status, error.message, true);
    return;
  }
  say(status, "");
  const rows = data || [];
  if (!rows.length) {
    host.innerHTML =
      '<div class="empty">Your basket is waiting for something lovely.<br><a class="button" style="margin-top:18px" href="catalog.html">Browse the collection</a></div>';
    return;
  }
  // usable means the cart items that have a valid product associated with them. avoid deleted ones;
  const usable = rows.filter((x) => x.product);
  // set used for unique currencies in the cart, subtotals per currency
  const currencies = [...new Set(usable.map((x) => x.product.currency))];

  const totals = {};
  for (const item of usable)
    totals[item.product.currency] =
      (totals[item.product.currency] || 0) +
      Number(item.product.price) * item.quantity;

  // host is cart content div and rendering the cart items with their details
  host.innerHTML = `<div>${rows
    .map((item) => {
      const p = item.product;
      if (!p)
        return `<div class="cart-row"><div class="product-placeholder">✦</div><div>This piece is no longer available.</div><button class="button danger small" data-remove="${esc(item.id)}">Remove</button></div>`;
      return `<article class="cart-row">${productVisual(p, p.name)}<div><div class="product-cat">${esc(p.category)}</div><h3 style="font-size:19px;margin:6px 0">${esc(p.name)}</h3><div class="muted" style="font-size:12px">${money(p.price, p.currency)} each</div></div><div class="quantity"><button aria-label="Reduce quantity" data-qty="${esc(item.id)}" data-delta="-1">−</button><span>${item.quantity}</span><button aria-label="Increase quantity" data-qty="${esc(item.id)}" data-delta="1" ${item.quantity >= p.stock ? "disabled" : ""}>+</button></div><button class="button danger small" data-remove="${esc(item.id)}">Remove</button></article>`;
    })
    .join(
      "",
    )}</div><div class="cart-total"><span>Subtotal</span><span>${currencies.map((c) => money(totals[c], c)).join(" + ") || money(0)}</span></div><div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap"><a class="button ghost" href="catalog.html">Continue browsing</a><button class="button danger" id="clear-cart">Clear basket</button></div>`;

  // remove items from the cart, update quantities, and clear the cart
  host.addEventListener(
    "click",
    async (e) => {
      const remove = e.target.closest("[data-remove]");
      if (remove) {
        const { error } = await sb
          .from("cart_items")
          .delete()
          .eq("id", remove.dataset.remove)
          .eq("user_id", currentUser.id);
        if (error) say(status, error.message, true);
        else await initCart();
        await refreshCartCount();
        return;
      }
      const qty = e.target.closest("[data-qty]");
      if (qty) {
        const item = rows.find((x) => x.id === qty.dataset.qty),
          next = item.quantity + Number(qty.dataset.delta);
        if (next < 1) {
          const { error } = await sb
            .from("cart_items")
            .delete()
            .eq("id", item.id)
            .eq("user_id", currentUser.id);
          if (error) say(status, error.message, true);
        } else if (next <= item.product.stock) {
          const { error } = await sb
            .from("cart_items")
            .update({ quantity: next })
            .eq("id", item.id)
            .eq("user_id", currentUser.id);
          if (error) say(status, error.message, true);
        }
        await initCart();
        await refreshCartCount();
        return;
      }
      if (e.target.closest("#clear-cart")) {
        const { error } = await sb
          .from("cart_items")
          .delete()
          .eq("user_id", currentUser.id);
        if (error) say(status, error.message, true);
        else {
          await initCart();
          await refreshCartCount();
        }
      }
    },
    { once: true },
  );
}

//  log in  with Supabase auth, redirect to next page or home after login
async function initLogin() {
  $("#login-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = e.currentTarget,
      s = $("#login-status"),
      b = f.querySelector("button");
    b.disabled = true;
    say(s, "Signing in…");
    const { data, error } = await sb.auth.signInWithPassword({
      email: f.elements.email.value.trim(),
      password: f.elements.password.value,
    });
    b.disabled = false;
    if (error) {
      say(s, error.message, true);
      return;
    }
    const next = new URLSearchParams(location.search).get("next");
    location.href = ["cart.html", "catalog.html", "index.html"].includes(next)
      ? next
      : "index.html";
  });
}

// register with supabase auth, redirect to home after registration
async function initRegister() {
  $("#register-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = e.currentTarget,
      s = $("#register-status"),
      b = f.querySelector("button");
    if (f.elements.password.value !== f.elements.confirm_password.value) {
      say(s, "Those passwords do not match.", true);
      return;
    }
    b.disabled = true;
    say(s, "Creating your account…");
    const { data, error } = await sb.auth.signUp({
      email: f.elements.email.value.trim(),
      password: f.elements.password.value,
      options: { data: { full_name: f.elements.name.value.trim() } },
    });
    b.disabled = false;
    if (error) {
      say(s, error.message, true);
      return;
    }
    if (data.session) location.href = "index.html";
    else {
      const msg = $("#auth-message");
      msg.hidden = false;
      msg.textContent =
        "Check your email for the confirmation link, then sign in.";
      f.reset();
      say(s, "Account created.");
    }
  });
}

// page initialization and session management
async function start() {
  if (!sb) {
    unavailable();
    return;
  }
  const { data } = await sb.auth.getSession();
  session = data.session;
  setAccount(session?.user);
  sb.auth.onAuthStateChange((_event, next) => {
    session = next;
    setAccount(next?.user);
    setTimeout(() => {
      refreshCartCount();
      if (page === "cart" && next?.user) initCart();
    }, 0);
  });
  await refreshCartCount();
  if (page === "home") await initHome();
  if (page === "catalog") await initCatalog();
  if (page === "cart") await initCart();
  if (page === "login") await initLogin();
  if (page === "register") await initRegister();
}
start().catch((error) => {
  console.error(error);
  const target = $(".status");
  say(target, error.message || "Could not connect to the shop.", true);
});
