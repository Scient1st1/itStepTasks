# Nocturne Goods

A lantern themed shop demo with Home, Shop all, Cart, Sign in, and Register pages. It uses plain JavaScript, Supabase Auth, Postgres, and Storage. The lantern is a shared fixed-length top-hung animation and starts unlit, with the page dark. Pull the lower bead or press Space to toggle the warm page light. Drag the lantern body left or right with the mouse to swing it; release to let it continue from that angle. Its light setting, hidden/visible status, and swing angle/speed are kept while you move between pages in the same tab; a fresh tab starts dark, visible, and at the default swing. Use the Hide lantern button beside Sign in to drop the lantern out of view; hiding it leaves the current page lighting unchanged. Select Show lantern to bring it back.

## Connect Supabase

1. Create a Supabase project.
2. Open **SQL Editor**, paste in `supabase-setup.sql`, and run it.
3. In `config.js`, fill in the project's **Project URL** and **publishable key** (or legacy `anon` key). Never put the `service_role` or another secret key in this static site.
4. Serve this folder over HTTP, for example with `python -m http.server 8080`, then open `http://localhost:8080`. ES modules and the Supabase client won't run correctly from a `file://` URL.
5. Create your account at `register.html`. If email confirmation is on, confirm the message first.
6. In Supabase **Authentication → Users**, copy your user's UUID. Replace the example UUID in the last SQL comment in `supabase-setup.sql` with it, uncomment that `INSERT`, and run the statement in SQL Editor. Reload `catalog.html` to see the admin product manager.

The SQL creates product and cart tables, row-level security policies, an admin allow-list, and a public `product-images` Storage bucket. Public visitors can read active products and product photos. Only the admin UUID inserted through SQL can create, edit, or delete products and upload/remove product images. Each account can read and change only its own cart rows.

## Load products and photos

Use `supabase-products-import-ready.csv` to seed 10 sample products with their image URLs, or `supabase-products-import.csv` if you want to import before uploading photos. `products-template.csv` is a smaller starter. In Supabase **Table Editor → products → Insert → Import Data from CSV**, select the CSV. The table generates product IDs; keep the CSV header names as provided. The seed CSV uses public URLs in the `product-images` bucket. Before importing `supabase-products-import-ready.csv`, download and extract `nocturne-product-images.zip`, then upload every JPG in it to the root of your Supabase Storage bucket named `product-images`. Keep the filenames unchanged so the CSV URLs resolve. You can also add and edit catalog items on the Shop all page after promoting your account.

For product images, either add an HTTPS image URL in the CSV's `image_url` column or use the admin form to upload an image. Uploads accept JPEG, PNG, WebP, and AVIF up to 5 MB. Product image downloads are public; only admins can upload and delete them.

## Pages and CRUD

- `index.html` — home and featured items
- `catalog.html` — browse, search, filter, add to basket; admins can create, read, update, and delete products
- `cart.html` — signed-in customers can read their basket, change quantities, remove a product, and clear the basket
- `login.html` and `register.html` — email/password Supabase Auth

Email/password Auth is handled by the Supabase client. It stores the access and refresh tokens with the session in sessionStorage, restores the session when you reload or navigate pages in the same tab, and refreshes tokens automatically. Closing the tab ends that stored session. Existing Supabase sessions from localStorage are moved into sessionStorage on the next app load. The app also keeps the current session in memory while the page is open. The static front end uses only the publishable/anon key; database and Storage permissions are enforced by the SQL policies.
