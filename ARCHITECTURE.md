# Reverie — how it works & the plan to make it a real SaaS

This answers the "what is the logic?" questions and lays out what's built vs. what's missing.

## 1. How a couple's site goes live (no per-couple Vercel page)

There is **one** Vercel app. Couples are **data rows**, not new pages.

```
Admin creates a site (slug: "ahmed-sara", status: "live")
        │  writes JSON row → Supabase `sites` table
        ▼
Guest visits  yoursite.com/ahmed-sara
        │  catch-all route src/app/[slug]/page.tsx
        ▼
  reads the row by slug → renders the film with that couple's data
```

- **Route:** [`src/app/[slug]/page.tsx`](src/app/[slug]/page.tsx) serves any slug from the DB. `/admin` and `/demo` are explicit routes and take precedence.
- **Status gate (now enforced):** only `live` / `paid` sites are reachable publicly. `draft` / `archived` → 404, even if the slug is guessed.
- **Lifecycle:** `draft` (building) → `paid` (couple paid, previewable) → `live` (public) → `archived`.
- So "publishing" = flipping a row's `status` to `live` in the admin. Instant. No deploy.

## 2. What a "template" really is (and isn't)

Today there is **one visual design** — the Enchanted-Garden film — and it lives in **code** ([`Experience.tsx`](src/components/Experience.tsx) + the scene components). You were right: a real new design is a code-level thing.

The admin "Templates" are therefore **themes**: a name + accent colour applied to that one film (re-tints the gold). They do **not** create new layouts. The UI now says this plainly.

**The correct model going forward:**
- A **design** = a coded template variant (its own scenes/animation), registered in a code registry with an `id`.
- A **theme** = admin-editable palette/typography on top of a design.
- The site editor picks `design + theme` per couple.

Until there's a second design, "templates" = themes. That's honest and still useful.

## 3. The character builder (fixed)

Groom and bride now have **separate, gender-appropriate** option sets (they shared one list before — the bug you saw):

| | Hair | Facial | Head |
|---|---|---|---|
| **Groom** | none · buzz · shortSwept · curly | beard | — |
| **Bride** | longWavy · bun · ponytail · curly | — | hijab drapes |

- No more `longWavy`/`bun` on the groom or `buzz`/bald on the bride.
- Added a feminine **ponytail** style; bride now defaults to real hair so removing the hijab never leaves her bald.
- Beard is groom-only; hijab is bride-only (already enforced in the avatar renderer).

## 4. Roadmap to a real SaaS

**✅ Done**
- Multi-tenant sites at `/{slug}`, DB-backed, status-gated.
- Admin: create/edit sites, live couple preview, per-couple character builder (gender-correct), chapters editor, themes.
- Bilingual (EN/AR), the cinematic film, Supabase persistence.

**▶ Phase A — Ordering & payments (the money step)**
1. Public "Start" flow: couple picks a plan → Stripe Checkout → on success, create a `draft` site + send them an intake link.
2. Intake form (couple self-fills names/date/venue/photos) → admin reviews → flips to `live`.
3. Webhook sets `status: paid`. *(Needs your Stripe keys.)*

**▶ Phase B — Custom domains / polish**
- Vercel domains API to map `ahmedandsara.com` → their slug.
- Draft preview links (signed, time-limited) so couples review before going live.
- OG images per couple for rich link previews (huge for WhatsApp sharing).

**▶ Phase C — Design library**
- Extract the film into a `designs` registry; add a 2nd design (e.g. minimalist/royal) so "templates" become real layout choices.

**▶ Phase D — Character depth**
- More hairstyles/beards/hijab drapes/outfits + accessories, per the original vision.

**▶ Phase E — Assisted content (later)**
- Optional AI draft of the couple's chapters from a short questionnaire, human-approved before publish.

## 5. Deploy checklist (Vercel)
- Set env in Vercel: `NEXT_PUBLIC_SUPABASE_URL` (base URL, **no** `/rest/v1`), `SUPABASE_SECRET_KEY`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`.
- Supabase tables already created + seeded.
