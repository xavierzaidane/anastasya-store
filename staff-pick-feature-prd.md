# PRD: Staff Pick Feature

**Product:** Anastasya Store (Next.js 16 / TypeScript / PostgreSQL / Prisma / TanStack Table & Form)
**Repo:** `xavierzaidane/anastasya-store`
**Author:** Product notes for coding agent
**Status:** Ready for implementation

---

## 1. Summary

Add a "Staff Pick" feature so admins can mark any product as a favorite/featured item from the Admin Dashboard, and those picks are surfaced to shoppers on the Storefront (e.g. a "Staff Picks" section + a badge on the product card/detail page).

## 2. Problem / Motivation

There's currently no way for the store team to manually curate and highlight favorite products to customers. Everything is shown chronologically (newest first) or by category. Staff want a lightweight, no-code way to say "feature this product" and have it show up prominently on the storefront.

## 3. Goals

- Admin can toggle any product as a "Staff Pick" from the products list, without opening the full edit form.
- Multiple products can be marked as Staff Picks at the same time (not limited to one).
- Storefront displays a dedicated "Staff Picks" section (e.g. on the homepage) showing only picked products.
- Picked products are visually badged wherever they appear in product listings/detail pages.
- Toggling is fast (single click, optimistic feel) and persists to the database.

## 4. Non-Goals

- No manual ordering/ranking of staff picks (v1 shows them, e.g., most-recently-picked first).
- No scheduling (e.g. "feature this from date X to Y").
- No customer-facing "nominate a pick" or voting feature.
- No limit enforcement on how many products can be staff picks (no max cap in v1).

## 5. Current State of the Codebase (context for implementation)

This is already partially scaffolded — the data model exists, but there's no way to set the flag and no storefront display yet.

| Layer | File | Current state |
|---|---|---|
| DB schema | `prisma/schema.prisma` | `Product.isStaffPick Boolean @default(false)` **already exists**. No migration needed. |
| API types | `types/api.ts`, `types/storefront.ts` | `isStaffPick` already present on `Product` / `StorefrontProduct` / `StorefrontApiProduct`. |
| Storefront mapping | `lib/storefront-products.ts` | `mapApiProductToStorefront` already copies `isStaffPick` through. |
| Validation | `lib/api/validation.ts` | `updateProductSchema` does **not** include `isStaffPick` — needs to be added. |
| Update API | `app/api/products/[slug]/route.ts` (`PUT`) | Does **not** persist `isStaffPick` on update — needs to be added. Supports partial updates already (good pattern to follow: `...(data.isStaffPick !== undefined && { isStaffPick: data.isStaffPick })`). |
| List API | `app/api/products/route.ts` (`GET`) | No filter for staff picks — needs a `?staffPick=true` query param support in the `where` clause. |
| Admin products table | `app/admin/products/columns.tsx` | No staff pick column/toggle. |
| Admin edit form | `components/admin/products/EditProductDialog.tsx` | Full edit dialog (name, price, images, items, etc.) — a heavy form; not ideal for a quick toggle. |
| Admin dashboard | `app/admin/AdminDashboard.tsx` | Already reads `isStaffPick` to show a "Staff Picks" stat count and a preview card of one staff pick — this will "just work" once picks can actually be set. |
| Storefront home | `app/landing/page.tsx` → `components/landing/Hero.tsx` | Renders `Hero`, `CTA`, `Category`, `FAQ`. There's an existing but currently **unused** `LatestProduct.tsx` carousel component that is a good template to copy for a new `StaffPicks.tsx` section. |
| Storefront category grid | `app/browse/[products]/page.tsx` | Product grid cards — no staff pick badge yet. |
| Storefront product detail | `app/browse/[products]/[slug]/page.tsx` + `components/products/ProductDetailPageClient.tsx` | `isStaffPick` already flows into the mapped product object; no badge rendered yet. |

## 6. User Stories

1. **As an admin**, I want to click a star icon next to a product in the Products table so it becomes a Staff Pick, without having to open the full edit form.
2. **As an admin**, I want to click the same star again to un-pick it.
3. **As an admin**, I want to see, at a glance, which products are currently staff picks (filled/starred icon) and how many total picks exist (dashboard stat — already built).
4. **As a shopper**, I want to see a "Staff Picks" section on the homepage so I can quickly find products the store recommends.
5. **As a shopper**, I want to see a small "Staff Pick" badge on the product card/detail page so I understand why it's featured.

## 7. Functional Requirements

### 7.1 Backend / API

- **Validation** — Extend `updateProductSchema` in `lib/api/validation.ts` to accept an optional `isStaffPick: boolean` (and, while touching this file, `isActive: boolean` since that field also exists on the model but isn't updatable yet — optional/nice-to-have, not blocking).
- **Update endpoint** — `PUT /api/products/[slug]` must persist `isStaffPick` when present in the request body, following the existing partial-update pattern. Must remain **admin-only** (`requireAdmin()` already guards this route — no change needed there).
- **List endpoint filter** — `GET /api/products` should accept `?staffPick=true` and filter `where: { isStaffPick: true }`, so the storefront can request only picked products (reuse existing pagination/`limit` support).
- No new DB migration required — the column already exists.

### 7.2 Admin UI

- Add a **"Staff Pick" column** to the products data table (`app/admin/products/columns.tsx`), rendered as a star icon button:
  - Filled/amber star = currently a staff pick.
  - Outline/muted star = not picked.
  - Clicking calls `PUT /api/products/{slug}` with `{ isStaffPick: <toggled value> }` directly (no dialog), then calls the existing `onProductUpdated` callback to refresh the table.
  - Disable the button while the request is in-flight; show a toast on success/failure (project already uses `sonner` for toasts — follow that pattern, see `EditProductDialog.tsx` for reference).
- No changes required to `EditProductDialog.tsx` (kept out of scope — the full form stays focused on core product fields).
- `AdminDashboard.tsx` already surfaces a "Staff Picks" count and a preview card — verify it continues to work once toggling is live; no changes expected but retest.

### 7.3 Storefront UI

- **New "Staff Picks" section** on the homepage:
  - New component, e.g. `components/landing/StaffPicks.tsx`, modeled after the existing (currently unused) `LatestProduct.tsx` carousel for visual consistency (same card styling, image aspect ratio, price badge).
  - Fetches `GET /api/products?staffPick=true&limit=8` client-side.
  - Renders nothing (section hidden) if there are zero staff picks yet — don't show an empty state on a public storefront.
  - Rendered on `components/landing/Hero.tsx` in a sensible spot (e.g. below the hero CTA, above the Category browser).
- **Badge on product cards**: show a small "Staff Pick" badge/star chip on the product image in:
  - Category product grid (`app/browse/[products]/page.tsx`)
  - New Staff Picks carousel cards
  - Only rendered when `product.isStaffPick` is true.
- **Badge on product detail page** (`components/products/ProductDetailPageClient.tsx`): show the same badge near the product title/price area, using the already-available `liveProduct.isStaffPick` field (data already flows through `mapApiProductToStorefront`).

## 8. Out of Scope / Explicitly Deferred

- Reordering/prioritizing multiple staff picks.
- Bulk "mark selected as staff pick" action from table row selection (table already has row selection UI — could be a fast-follow).
- Staff pick analytics (click-through, conversion).

## 9. Edge Cases

- Un-picking a product that's currently displayed in the storefront carousel: next fetch simply excludes it — no special handling needed since data is fetched fresh (`cache: 'no-store'`).
- Zero staff picks: storefront section should not render (see 7.3).
- Deleting a product that is a staff pick: existing `DELETE` cascade behavior applies as normal — no special handling needed since the flag lives on the product row itself.
- Race condition on rapid double-click of the toggle: disable the button while the request is pending.

## 10. Acceptance Criteria

- [ ] Admin can toggle any product's staff pick status from the Products table with one click, and the change persists after page refresh.
- [ ] `PUT /api/products/[slug]` accepts and saves `isStaffPick`.
- [ ] `GET /api/products?staffPick=true` returns only picked products.
- [ ] Homepage shows a "Staff Picks" section that lists only picked products, and hides itself gracefully when there are none.
- [ ] Staff Pick badge appears on: homepage staff picks carousel, category browse grid, and product detail page — only for picked products.
- [ ] Non-admins cannot toggle staff pick status (endpoint stays behind `requireAdmin()`).
- [ ] Existing "Staff Picks" stat/preview on `AdminDashboard.tsx` reflects live data correctly.

## 11. File Checklist for the Coding Agent

**Backend**
- `lib/api/validation.ts` — add `isStaffPick` (and optionally `isActive`) to `updateProductSchema`.
- `app/api/products/[slug]/route.ts` — persist `isStaffPick` on `PUT`.
- `app/api/products/route.ts` — support `?staffPick=true` filter on `GET`.

**Admin**
- `components/admin/products/ToggleStaffPickButton.tsx` — new star-toggle component.
- `app/admin/products/columns.tsx` — add Staff Pick column using the toggle component.

**Storefront**
- `components/landing/StaffPicks.tsx` — new curated carousel section.
- `components/landing/Hero.tsx` — render the new section.
- `app/browse/[products]/page.tsx` — badge on category grid cards.
- `components/products/ProductDetailPageClient.tsx` — badge on product detail page.

No Prisma migration needed (`isStaffPick` column already exists on `Product`).
