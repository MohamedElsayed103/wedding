# Cinematic Wedding Websites — Business Plan

*Turning "Mohamed & Mariam" into a repeatable product.*

---

## 0. TL;DR

You have already built the hard part: a proof that a **cinematic, illustrated, bilingual, scroll-driven wedding invitation** is possible and looks stunning. That is not what most couples are offered today — they're offered a static Zola/WithJoy template or a Canva PDF. The business opportunity is **"Zola, but it feels like a Pixar short and speaks Arabic natively."**

The single biggest thing standing between "cool project for my own wedding" and "business" is that **every character in this codebase is hand-drawn SVG, hard-coded per couple** (`Mohamed.tsx`, `Mariam.tsx`). That does not scale past a handful of manual client projects. Everything in Phase 1–2 of this plan exists to fix that, because it is the true bottleneck — not marketing, not hosting, not price.

Recommended path: **start as a productized service (manual, high-touch, premium-priced) for the first 10–20 couples while you build the self-serve version in parallel**, then flip to self-serve/SaaS once the character/theme system is parametric. Don't try to build the full SaaS before you have a single paying customer.

---

## 1. What You're Actually Selling

Be precise about the product, because it changes the whole plan:

| It is NOT | It IS |
|---|---|
| A registry platform (Zola's core business) | A **narrative experience** — the invitation itself is the gift |
| A generic template swap tool | A **couple-specific animated short film** with characters modeled on the couple |
| English-only, Western-styled | **Bilingual (Arabic/English) with RTL, Islamic-wedding-aware copy** by default |
| A one-size-fits-all builder (yet) | A **premium, illustrated, story-first** product — closer to "wedding invitation as art commission" than "wedding website SaaS" |

**Positioning statement:**
> "The only wedding website that guests actually watch instead of skim — a cinematic, illustrated love story starring the couple themselves, in Arabic and English, that ends with the RSVP, countdown, and map they need."

This positions you *above* Zola/WithJoy (free, generic, English-first, static) and *above* the paper-invitation printers who dominate Egypt/Gulf markets today (offline, non-interactive, no bilingual digital component) — see §2.

---

## 2. Market Snapshot (why now)

- Global wedding-invitation software market: **~$1.8B in 2025, projected ~$3.9B by 2034**. Middle East & Africa is currently the *smallest* regional share (~4.8%) but called out as having outsized long-term growth potential from GCC luxury weddings + rising smartphone penetration. Translation: **you'd be early in a region that's underserved, not late to a saturated one.**
- Incumbents (Zola, WithJoy/Joy, The Knot) are free or near-free, monetized via registry/cash-gift fees (Zola takes ~2.5% on card payments) and premium add-ons (custom domain ~$15–18/yr, guest texting ~$80). They are **built for the US gift-registry model**, which is not how Egyptian/Gulf/Levantine weddings work (no registries; RSVP + venue + family framing matter far more).
- The Arabic/Islamic wedding invitation market today is dominated by **static paper invitation printers** (e.g., Khattab in Cairo) and **Etsy/Canva digital card templates** — nobody has your combination of animation + bilingual + character illustration + real interactivity (countdown, map, RSVP).
- **Your unfair advantage isn't the tech stack** (Next.js + Framer Motion + Lenis is replicable in a weekend by any competent shop). It's the **art direction + bilingual/cultural fluency + willingness to do custom character work**. Protect and productize *that*, not the code.

Sources: [Zola vs WithJoy 2026](https://withjoy.com/blog/zola-vs-joy/), [Joy pricing](https://withjoy.com/pricing/), [Zola vs Knot fees](https://www.nathantailors.com/en/blog/zola-vs-the-knot-vs-weddingwire-2026), [Global wedding invitation software market report](https://dataintelo.com/report/global-wedding-invitations-software-market), [Khattab Invitations, Cairo](https://www.facebook.com/khattabinvitations/)

---

## 3. Product Tiers

Structure the offer so the bottleneck (custom character art) is priced accordingly, and so there's a low-friction entry point.

### Tier 1 — "Signature" (self-serve-ish, template-based) — *build this second*
- Choose from **3–5 pre-built "casts"** of couple illustrations (varied skin tones, hijab/no-hijab options, beard styles, 2 outfit palettes each) instead of fully custom art.
- Couple customizes: names, date, venue, map, 2–3 "memory" captions, color accent, language (EN/AR toggle for guests, not just one fixed language).
- Delivered on a subdomain (`mohamed-mariam.yourbrand.love`) or their own domain.
- **This is the volume product.** Price: **$150–$300** one-time (see §6 for reasoning).

### Tier 2 — "Bespoke" (what you have today) — *this is your MVP, sell it now*
- Hand-illustrated characters modeled on the couple's actual photo (like Mohamed & Mariam here), custom color palette pulled from their engagement photos, custom "memories" copy written with them, custom ceremony attire.
- Full bilingual, full film (envelope → calligraphy → meeting → journey → invitation → countdown → venue → finale).
- Delivered on a custom domain, white-glove onboarding call, revision rounds.
- Price: **$600–$1,500** depending on market (Egypt/Gulf pricing differs — see §6). This is your **cash-flow and word-of-mouth engine** for the first 6–12 months.

### Tier 3 — "Studio" (future, highest margin)
- Everything in Bespoke + a short *actual animated video* cut from the same scenes (for Instagram/TikTok save-the-date reels), printed QR-code invitation cards linking to the site, day-of digital guestbook, live RSVP dashboard with WhatsApp export for caterers.
- Price: **$1,500–$4,000+**, sold mainly to wedding planners/venues as a white-label add-on (see §8).

**Add-ons (all tiers):** extra language (French/Farsi/Turkish/Urdu), extra "memory" chapter, printed invitation card with QR code, guest SMS/WhatsApp reminders, anniversary "replay" email a year later (nice retention/referral hook).

---

## 4. The Core Technical Problem: Productizing the Art

This is the part most business plans for "an agency" skip, and it's the part that actually determines whether this scales. Right now:

- `Mohamed.tsx` / `Mariam.tsx` are **bespoke SVG code per couple** — skin tone, hair, beard, hijab style, and outfit colors are all hardcoded gradients and paths specific to one couple.
- Every new couple currently = a developer editing SVG paths by hand. That's an **agency/atelier model**, not a product. Fine for the first 10-30 clients (and honestly a good thing — it's your differentiator and lets you charge Bespoke-tier prices) but it cannot scale past what you personally (or a small illustration team) can hand-draw per month.

### Phased fix

**Phase A (now → 10 clients): Stay bespoke, but componentize.**
Refactor the character system so skin tone, hijab presence/style, beard style/length, hair style, and outfit color are **props/tokens**, not hardcoded values, even if a human still picks the values per client. This is mechanical work you can do now, and it turns "2 days of SVG surgery per client" into "20 minutes of picking values from a config file." (You already did exactly this pattern for `attire` and gradient-id-scoping in this codebase — extend the same pattern to skin tone, hijab style, beard, hair.)

**Phase B (10–30 clients): Build a small "cast library."**
Commission (or draw yourself) **6–10 modular hair styles, 4–6 beard styles, 6–8 hijab styles/drapes, a skin-tone ramp (4–5 stops), and 3–4 outfit palettes** for each gender. A client's "look" becomes a *combination* selected from the library, not new art. This is the single highest-leverage investment in the whole plan — it's what turns Tier 2 into Tier 1 economics.

**Phase C (30+ clients): Self-serve builder.**
A form/wizard (Next.js admin app) where a couple:
1. Uploads 1-2 reference photos (optional, just for the sales team / illustrator's eyeballing, not auto-processing — don't promise AI face-matching, it will look bad and erode the "premium illustrated" brand).
2. Picks from the cast library via visual swatches (like a character-creator screen in a video game).
3. Fills in names/date/venue/memories/language.
4. Gets a live preview, pays, and the site deploys automatically (see §5 for the infra to support this).

**Do not** attempt AI-image-generation-based characters (Midjourney/DALL·E consistent-character couples) as the primary path — as of today, consistent, on-model, culturally-accurate (hijab, modest dress, specific beard) character generation across many poses/outfits is still unreliable and will produce off-brand or embarrassing results for a wedding product. Revisit this in 12–18 months as tooling matures; use it at most for internal concept sketches, never final assets, without a human illustrator reviewing every output.

---

## 5. Technical Architecture for Scale

What you have (`Next.js 15 + TypeScript + Tailwind v4 + Framer Motion + Lenis`, deployed to Vercel) is the **right stack** — don't rewrite it. The changes needed are architectural, not a framework swap.

### 5.1 Multi-tenancy model
Pick one (recommendation: **A** to start, migrate to **B** once you pass ~50 active sites):

- **A. One Vercel project per couple** (what you have now). Simple, zero cross-tenant risk, but you manually `git push`/redeploy per client and pay per-project overhead at scale. Fine through Tier 2 bespoke phase.
- **B. One multi-tenant Next.js app, data-driven.** All couples' content lives in a database (Postgres via Supabase/Neon, or just a headless CMS like Sanity for structured content), routed via `app/[slug]/page.tsx` or wildcard subdomains (`*.yourbrand.love`) resolved via Vercel's wildcard domain + middleware reading the subdomain to fetch that couple's config. This is what makes Tier 1 self-serve possible at volume.

### 5.2 Content model
Right now copy lives in `src/lib/i18n.ts` and `src/lib/constants.ts` as compile-time constants. For multi-tenant, this becomes **runtime data**:
```
Couple {
  id, slug, plan_tier,
  names: { groom, bride },
  date, venue: { name, city, mapsUrl },
  language_default, translations: { en: {...}, ar: {...} },
  cast: { groomLook, brideLook },   // references into the cast library, Phase B
  memories: [ {icon, title_en, title_ar, caption_en, caption_ar} ],
  theme: { accentColor, ... }
}
```
Store in Postgres; render via server components fetching by slug/subdomain at request time (cached at the edge — this is a wedding site, content changes rarely, so aggressive ISR/caching is fine and keeps hosting cheap).

### 5.3 Admin/ops tooling (build this before Phase C, not after)
A minimal internal dashboard to: create a new couple record, assign a cast/theme, preview, and mark "paid → live." This alone will save you more time than anything else once you're past ~5 concurrent client projects — don't skip it to "move fast," it's what prevents ops chaos.

### 5.4 What to keep exactly as-is
- The performance work you already did (compositor-only sky crossfade, `content-visibility`, device-tier particle scaling, CSS-driven touch animations) — this is genuinely hard-won and directly protects your Awwwards-style pitch. Document it as an internal "performance checklist" so any future contractor doesn't regress it.
- The i18n architecture (typed dictionary, RTL handling, Arabic font/letter-spacing overrides) — extend it, don't replace it.
- The language-gate + envelope-open UX pattern — it's a strong signature interaction, keep it as the brand's recognizable "opening."

### 5.5 Hosting & cost at scale
- Vercel Pro plan once you're past the free tier / multiple custom domains (~$20/mo + usage). Cheap relative to price per site.
- Custom domains: either resell via Vercel's domain integration or have couples buy their own and point DNS (simpler, avoids you being a registrar).
- Database (Phase B): Supabase or Neon free tier covers you well past 100 active sites.
- Image/asset hosting: keep characters as SVG (already vector, tiny, crisp at any DPI, no CDN image cost) — this was a good decision, don't switch to raster/AI-generated PNGs, it'll cost you both money and the crispness that makes the product feel premium.

---

## 6. Pricing & Unit Economics

### Reference points
- Zola/WithJoy: **free**, monetized via registry fees + $15-80 add-ons. You cannot and should not compete on "free" — you compete on being worth paying for.
- A hand-drawn custom illustration commission (single couple portrait, not animated, not a website) runs **$50-300** on Etsy/Fiverr already. You're delivering *far* more (full animated bilingual site + that art), so Bespoke-tier pricing below is conservative, not aggressive.

### Suggested pricing (adjust ±30% based on your specific market — Cairo/Egypt pricing will sit lower in absolute USD than Gulf/US pricing for the same product; consider a **local-currency tier** for Egypt clients and a **USD tier** for Gulf/diaspora clients from day one)

| Tier | Egypt (EGP, illustrative) | Gulf/International (USD) | Your cost (time) |
|---|---|---|---|
| Signature (Tier 1, post-Phase B) | 4,000–7,000 EGP | $150–$300 | ~2–4 hrs (mostly automated) |
| Bespoke (Tier 2, today) | 12,000–25,000 EGP | $600–$1,500 | ~15–25 hrs (illustration + copy + setup) |
| Studio (Tier 3) | 30,000–60,000 EGP | $1,500–$4,000+ | ~30–50 hrs + coordination |

At Bespoke pricing, **$600-1,500 for ~20 hours of work is $30-75/hr** — reasonable freelance-dev/illustrator blended rate, and there's real headroom to discount for your first few "portfolio" clients in exchange for testimonials/referrals and permission to showcase the site publicly.

### Payment
- 50% deposit to start, 50% on approval before going live — standard for custom creative work, protects you from scope-creep-then-vanish.
- Local: Instapay/Vodafone Cash/bank transfer (Egypt); Fawry for broader reach. International: Stripe (note Stripe has limited/no direct Egypt payout support as of writing — verify current status, or route international payments through a partner/Wise/Payoneer setup) or Paymob (Egypt-based, supports cards + wallets, built for exactly this MENA gap).

---

## 7. Legal & Operational Setup

1. **Business registration.** Freelance/sole-proprietor registration is enough to start (Egypt: commercial register + tax card if operating formally; many one-person creative studios operate under a simple "freelancer" tax status initially — consult a local accountant before your first 5-10 sales, not after). Don't over-invest in incorporation before you have paying customers.
2. **Contract/ToS for every client**, covering: scope of revisions (e.g., "2 rounds included"), what happens to the site after the wedding (auto-archive after 12 months? Couple's choice?), data handling for RSVP guest lists (this is personal data — WhatsApp numbers, names — treat it seriously even informally: don't sell/share guest lists, state that in writing).
3. **IP/likeness.** Since characters are modeled *on* the couple, get simple written consent that you may use the finished illustrated site (not their real photos) in your portfolio/marketing unless they opt out. This is standard for photographers/illustrators and easy to get if asked upfront.
4. **Guest data (RSVP).** If/when you rebuild the RSVP feature (removed earlier in this project), treat it as handling personal data: state clearly who can see responses (only the couple + you, transiently), don't retain it longer than needed, and don't add analytics/ad trackers to guest-facing pages — this is a trust product, guests are sharing attendance + sometimes phone numbers.
5. **Cultural/religious sensitivity review.** Because the product is explicitly Islamic-wedding-aware (Qur'anic verse, mosque venues, modest dress), have a **standing checklist** (reviewed by someone knowledgeable, not just yourself) for each new couple's site: correct verse transliteration/diacritics, appropriate modesty in character art, correct honorifics, appropriate music/ambience choices (some clients will want no music at all for religious reasons — make silence a first-class, easy option, not an edge case).

---

## 8. Go-to-Market

Because this is a **highly visual, emotionally-resonant product**, marketing should lead with the product itself, not ads about the product.

### Channels, ranked by expected ROI for this specific product
1. **Instagram Reels / TikTok** showing the scroll-through experience (screen recording with music) — this format is *made* for a cinematic scroll site. This should be channel #1, not an afterthought. Post the opening-envelope moment and the finale as separate hooks.
2. **Wedding planner & photographer partnerships.** They're already selling premium/bespoke experiences to the same couples and want differentiated things to offer. Offer them a **referral commission (10-15%) or a white-label "Studio" tier** they can resell under their own brand.
3. **Real weddings as case studies.** Ask your first 3-5 clients (starting with your own site) for permission to publish a "behind the scenes" post-wedding recap — guests loved it, screenshots, maybe a short testimonial video. This is your best sales asset and costs nothing but asking.
4. **SEO**, longer-term: "wedding invitation website Egypt", "دعوة زفاف إلكترونية", "Islamic wedding website", "bilingual wedding invitation" — low competition today per the market research above, worth owning early.
5. **Wedding expos/exhibitions** (common in Cairo/Gulf) — a laptop/tablet running the live scroll demo at a booth is a strong live-conversion tool for a product that's hard to explain in words but instantly impressive to experience.

### Portfolio site
Build a **second, separate site** (or a `/showcase` route) that is itself a portfolio of 3-5 example couples (can be fictional/demo couples if you don't have real clients yet) so prospects can *experience* the product before buying, not just read about it. This is not optional — for this product, the demo *is* the pitch.

---

## 9. Team & Roles (as you grow)

| Stage | Who you need |
|---|---|
| 0–10 clients | Just you (dev + rough illustration) or you + one freelance illustrator for character art refinement |
| 10–30 clients | + a dedicated illustrator (builds the Phase B cast library), + a part-time copywriter/translator for Arabic copy quality (don't rely on your own Arabic or MT for client-facing religious/formal text — get a native reviewer) |
| 30+ clients | + ops/customer success person to run intake calls and the admin dashboard, + sales person for planner/venue partnerships |

The **Arabic copy reviewer is non-negotiable at any scale** — a wrong diacritic or awkward MSA phrasing on a Qur'anic verse or formal invitation line is the fastest way to damage trust with exactly the audience you're targeting.

---

## 10. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Custom character art doesn't scale | §4's phased cast-library plan — treat this as priority #1 engineering work, not an afterthought |
| Wedding industry is seasonal (spring/autumn peaks) | Price Bespoke tier to cash-flow through slow months; use slow season for building Phase B/C tooling |
| Couples want the site live in days, custom art takes weeks | Offer Tier 1 (Signature) as a fast-turnaround option explicitly for short-timeline couples |
| Free competitors (Zola/WithJoy/Canva) undercut on price | Don't compete on price — compete on the demo. Nobody with a Canva PDF has ever made a guest say "I've never seen anything like this" |
| Guest data / privacy mishandling | §7.4 — minimal retention, clear ToS, no ad trackers on guest pages |
| Single-person bottleneck (you) for all bespoke work | Cap concurrent Bespoke clients (e.g., max 3-4 in flight) until Phase B ships; use waitlist rather than overcommitting and damaging reputation with late delivery |
| Cultural/religious missteps | §7.5 standing review checklist, native reviewer sign-off before any site goes live |

---

## 11. 90-Day / 6-Month / 12-Month Plan

**Days 0–30 (Foundation):**
- Finish this site as your own flagship portfolio piece (already ~done).
- Componentize character props (skin tone, hijab style, beard, hair as config, per §4 Phase A) — do this *before* taking client #2, so client #2 is 10x faster than client #1 was.
- Write ToS/contract template, pick payment processor, register as freelancer for tax purposes.
- Get 2-3 friends/family engaged couples to be Bespoke-tier clients at a steep discount in exchange for portfolio rights + testimonials.

**Days 30–90 (First revenue):**
- Launch Instagram/TikTok with your own site's recording + first client recordings.
- Reach out to 5-10 wedding planners/photographers for partnership conversations.
- Deliver 3-5 Bespoke sites. Track actual hours spent per site honestly — this data drives your real pricing in month 4+.
- Start Phase B cast library (commission/draw the first 4-6 hair styles, 3-4 beard styles, 4-5 hijab styles, skin-tone ramp) in parallel.

**Months 3–6 (Productize):**
- Ship Tier 1 "Signature" using the cast library — this is your volume/margin product.
- Build the minimal admin dashboard (§5.3).
- Formalize the planner-referral program with real commission tracking.
- Target: 10-15 total sites delivered, at least 2 recurring planner-partner referral sources.

**Months 6–12 (Scale):**
- Multi-tenant architecture migration (§5.1 Option B) if volume justifies it (aim for this once you're fielding >5 sites/month).
- Self-serve builder wizard (Phase C).
- Expand languages beyond Arabic/English if demand appears (French for Levant/Maghreb clients, Farsi, Turkish).
- Revisit Studio tier with a real wedding-planner/venue white-label partner.

---

## 12. What to Build First, Concretely (Engineering Checklist)

If you want the very next commits to be business-aligned rather than just more polish on one couple's site:

1. [ ] Refactor `Mohamed.tsx`/`Mariam.tsx` props: `skinTone`, `hairStyle`, `beardStyle`/`none`, `hijabStyle`/`none`, `outfitPalette` — all as typed enums with a handful of preset values, defaulting to today's look. Small, mechanical, high-leverage.
2. [ ] Extract all remaining hardcoded couple facts (`constants.ts`, `i18n.ts`) into a single `site.config.ts`-style shape that *could* later be loaded from a database with zero component changes — i.e., componentize now, multi-tenant-ify later.
3. [ ] Write the intake questionnaire (see Appendix A) as an actual form (even a Google Form / Tally.so is fine at this stage — don't build custom intake tooling before you have 5 clients asking for it).
4. [ ] Build the `/showcase` portfolio route with 2-3 demo couples using different casts, once §12.1 lands.
5. [ ] Draft the client contract + ToS (a lawyer/template pass, not from scratch).
6. [ ] Set up Paymob or equivalent for EGP payments + Stripe/Wise for USD.

---

## Appendix A — Client Intake Questionnaire (draft)

1. Names (as they'd like them displayed, both languages if bilingual)
2. Wedding date & venue name/address/Google Maps link
3. Preferred language(s) for the site (guest-facing toggle vs. single fixed language)
4. 1-2 reference photos (for the illustrator's reference only — not uploaded/processed automatically)
5. Skin tone / hair style / beard (if applicable) / hijab (if applicable, and preferred drape style) — pick from a visual swatch sheet you provide
6. 2-4 "memory" moments they want told (how they met, a favorite shared moment, the proposal, etc.) in their own words — you'll polish the copy
7. Color palette preference (within the brand's warm/ivory/gold family, or a specific accent)
8. Ceremony attire for the finale scene (colors/style)
9. Any religious/cultural elements to include or avoid (specific verse, family honorifics, no music, etc.)
10. Domain preference (their own domain vs. a subdomain of your brand)
11. Timeline (wedding date minus how many weeks = your delivery deadline)

---

## Appendix B — Glossary of What You Already Built (so nothing gets lost in translation to a business)

- **One continuous scroll-driven film**, not a multi-page site — this is a core differentiator, preserve it in every tier.
- **Bilingual EN/AR with a language gate**, RTL layout, Arabic typography overrides — a real, working system already, not a "nice to have" bolt-on.
- **Illustrated, animated characters** (blink, breathe, sway) modeled on the couple, with a signature outfit and a separate ceremony outfit for the finale.
- **Performance-hardened for mobile** — compositor-only sky transitions, device-tier-scaled particles, CSS-driven (not JS/rAF) touch animations, `content-visibility` on off-screen sections.
- **Countdown, venue map with custom marker, invitation card** — the practical guest-facing utility that must ship in every tier regardless of art customization level.

---

## Appendix C — Implementation Log (keep this updated as the plan becomes reality)

**Shipped:**
- **Character componentization (§4 Phase A), done.** `Mohamed`/`Mariam` now take `skinTone` (fair/medium/tan), `outfitPalette` (groom: espresso/olive/navy; bride: champagne/rose/sage), and `beardStyle` (short/none) as typed props — all just gradient/color swaps on the existing artwork, no new illustration needed. Ceremony attire stays fixed (black tuxedo / white gown) since that's a real-world convention, not a customer choice. This is the mechanical unlock the plan called for — a new couple's "look" is now a config choice, not SVG surgery.
- **Admin tool, done (MVP).** A password-gated `/admin` at `src/app/admin/`: dashboard, Sites (full CRUD with a live character preview using the real production components), Templates (name/description/accent color), and Characters (the actual cast-library browser — every skin-tone × palette combination rendered live, exactly per §4 Phase B's "combination, not new art" goal).
- **Data model, done.** `src/lib/admin/types.ts` defines `Site`/`Template`/`CharacterLook`/`MemoryEntry` in the exact shape described in §5.2 — this is deliberately the same shape a future Postgres table would use.
- **Storage, MVP only — swap before relying on it in production.** `src/lib/admin/store.ts` is a local JSON file (`.data/admin-store.json`, gitignored). This works for local development and demos but Vercel's serverless functions have an ephemeral filesystem — writes will not reliably persist once actually deployed. Every function in `store.ts` is small and swappable by design (see the file's own header comment); replacing it with real queries against Neon/Supabase Postgres is a one-file change, not an admin-UI rewrite.
- **Auth, MVP only.** Single shared password (`ADMIN_PASSWORD` env var) + HMAC-signed session cookie (`ADMIN_SESSION_SECRET` env var). Appropriate for "one operator," per §9 — move to real per-user accounts when you hire.
- **Language persistence removed by design.** The language gate now re-asks on every visit (no cookie/localStorage) — a deliberate product decision (shared family devices, returning guests), not a bug.

**Not yet done (the real next steps, in order):**
1. **Wire the public site to read from the admin store.** Today `/` still renders the hardcoded `i18n.ts`/`constants.ts` content — editing the "mohamed-mariam" site in `/admin` does not yet change what guests see at `/`. Making `page.tsx` fetch `getPrimarySite()` (or a slug-based lookup) at request time and feed it into `LangProvider`/`Couple` is the single next task that turns this from "a nice internal tool" into "the actual multi-tenant control panel." Budget: a focused day — it touches `Envelope`, `InvitationCard`, `Venue`, `Countdown`, `Journey` (memories), and `Finale`.
2. **Swap `store.ts` for Postgres** (Neon or Supabase) before onboarding a real second client on a real deployment — see the caveat above. Needs an account + connection string only you can provide.
3. **Multi-tenant routing** (§5.1 Option B — wildcard subdomain or `/[slug]` route) once step 1 is done and you're ready to host more than one couple's site from this single deployment.
4. **Phase B art**: commission the additional hair styles, beard styles, and hijab styles/drapes described in §4 — the admin's Characters page will show them automatically the moment they're added as new enum values + paths in `Mohamed.tsx`/`Mariam.tsx`, no admin changes required.
