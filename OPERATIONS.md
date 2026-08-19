# Reverie — Operations & Order Flow

How an order becomes a live wedding website — from the client's side and from
your side. This is the operating manual for the business.

> **Money & contact are manual by design.** No payment gateway, no automated
> emails to clients. Clients pay by **InstaPay / Vodafone Cash** and you talk to
> them on **WhatsApp / phone**. The software's job is: capture the lead, let you
> build fast, and publish.

---

## 0. Your two questions, answered

### 1) A new client's domain — new repo, or same app?

**Same app. Always.** Never a new repo or a new Vercel project per client.

Your site is **multi-tenant**: every couple is a **database row**, served at
`yourapp.com/{slug}` by the one Vercel app (`src/app/[slug]/page.tsx`). Creating
a client = adding a row in the admin. It's live in seconds, with **no deploy**.

| Approach | Verdict |
|---|---|
| New GitHub repo + new Vercel project per client | ❌ Unmaintainable. Every fix = redeploy dozens of projects. Vercel limits. Chaos. |
| **One app, clients as rows at `/{slug}`** (what we built) | ✅ Instant, zero-deploy, one codebase to maintain |

**If a client wants their OWN domain** (`ahmedandsara.com` instead of a slug):
you add that domain to the **same** Vercel project, and a small `middleware.ts`
maps the incoming hostname → that client's slug (stored in `Site.domain`, a
field that already exists in the data model). Still one repo. See §7.

### 2) Reservations — where do the client's details go?

You **don't need a mail server.** The order form writes straight to your
Supabase database. You then:
- **See every lead** in a new admin **Leads** page (name, WhatsApp, email, date, plan, chosen template, notes), and
- **Get an instant push** the moment a lead arrives — recommended: a **Telegram bot** (free, on your phone). Email is an alternative (see §5).
- **Contact the client** with a one-tap **WhatsApp** (`wa.me/<number>`) or **Call** button on the lead.

No inbound email, no SMTP to receive — the data lands in your DB and pings your phone.

---

## 1. Pricing plans (DUMMY copy — you'll replace later)

Currency: **EGP**. Each plan unlocks a set of templates. *(You have 1 template
today; you'll assign more to plans as we add them.)*

| Plan | Price | Templates available | What the client gets *(placeholder — replace)* |
|---|---|---|---|
| **Standard** | **500** | Template A *(Enchanted Garden)* | Dummy: A beautiful animated invitation on our core design. Your names, date, venue, bilingual (EN/AR), countdown, map, and a shareable link. Delivered in ~2 days. |
| **Premium** | **1000** | Templates A, B, C | Dummy: Everything in Standard **plus** more designs to choose from, custom character looks of you & your partner, your own love-story chapters, priority delivery, and your own custom domain. |
| **Custom** | **1500** | All templates + bespoke | Dummy: A fully bespoke film. Everything in Premium **plus** custom scenes/animation tailored to your story, unlimited revisions, and full custom-domain setup. |

- Plan definitions live in code at `src/lib/brand.ts` (`PRICING`). We'll wire the
  real numbers + descriptions there when you send the final copy.
- "Which template belongs to which plan" is just a tag on each template — we set
  it when you send template examples.

---

## 2. The CLIENT's journey (what they see)

```
1. Land on the site  →  see the 3 plans + template previews
2. Pick a plan  →  pick a template (live preview)
3. Fill the order form:
      name · WhatsApp number · email · wedding date · city/venue · notes
4. Submit  →  "Thank you! We'll contact you on WhatsApp within X hours."
5. You message/call them  →  agree on details
6. They pay via InstaPay / Vodafone Cash  →  send you a screenshot
7. You build it  →  send them a private PREVIEW link
8. They review  →  request tweaks (or approve)
9. Approved  →  their invitation goes LIVE at their link / domain
10. They share it on WhatsApp with their guests 🎉
```

The client never logs in, never pays online, never touches an admin. Simple.

---

## 3. YOUR journey (what you do)

```
1. 🔔 Notification fires (Telegram/email) + lead appears in Admin → Leads
2. Open the lead  →  tap WhatsApp / Call  →  talk to the client
3. Agree on plan, template, details, price
4. Send your InstaPay handle / Vodafone Cash number
5. Client pays  →  sends screenshot  →  you mark the order "Paid"
6. Admin → Sites → New:
      - fill names, date, venue, map link (from the lead)
      - pick their template (their chosen design)
      - build their character looks (groom + bride)
      - write / paste their story chapters
      - Save as DRAFT
7. Copy the DRAFT preview link  →  send on WhatsApp
8. Client approves (or you tweak and resend)
9. Flip status DRAFT → LIVE  →  it's public at /{their-slug}
10. (Premium/Custom) map their custom domain (§7)
11. Send them the final link  →  done ✅
```

Everything in steps 5–11 happens inside the admin you already have (plus the
Leads page + Paid toggle we'll add).

---

## 4. Order & site lifecycle (statuses)

```
LEAD (order form submitted)
   │  you contact + collect payment
   ▼
PAID  ──►  DRAFT (you build the site)  ──►  LIVE (public)  ──►  ARCHIVED (after the wedding)
```

- `draft` / `archived` sites are **not** publicly reachable even if someone
  guesses the slug (already enforced in `src/app/[slug]/page.tsx`).
- Only `live` (and `paid`, for the couple's preview) render publicly.

---

## 5. Notifications — the "free mail server" question

You have three free options. **Pick one; you can add more later.**

| Option | Setup | Feel |
|---|---|---|
| **Telegram bot** ⭐ recommended | Create a bot via `@BotFather`, get a token; server posts to it on each new order | Instant push on your phone, free forever, dead simple |
| **Email (Resend)** | Free tier (~3k emails/mo); add an API key | A tidy email per lead |
| **Email (Gmail SMTP)** | Your Gmail + an app password via nodemailer | Free, uses your own inbox |
| **None (just the Leads page)** | Nothing | You check the admin yourself |

**How it works technically:** the order-form API route saves the lead to the
`orders` table, then fires the notification (one HTTP call to Telegram / Resend).
The **admin Leads page** is always the source of truth — the notification is just
a nudge so you don't miss one.

**Contacting the client:** each lead row shows a **WhatsApp** button
(`https://wa.me/<their number>`) and a **Call** button (`tel:<number>`). One tap.

> You never *receive* email from a server — there's nothing to host. The client's
> data is written to your database and pushed to your phone.

---

## 6. Payment (Egypt, manual)

- **Accepted:** InstaPay, Vodafone Cash **only**.
- **Flow:** after you agree on WhatsApp → you send your InstaPay handle / Vodafone
  Cash number → client transfers → client sends a screenshot → you mark the order
  **Paid** in admin → you start building.
- No card data, no gateway, no fees, no PCI concerns.
- **Later (optional):** if volume grows, Paymob (Egyptian gateway) can automate
  card/wallet payments and auto-mark orders paid. Not needed now.

---

## 7. Custom domains (Premium / Custom plans)

**Standard clients** live at a slug on your domain:
`reverie.com/ahmed-sara` (or a subpath you choose).

**Premium / Custom clients** get their own domain, e.g. `ahmedandsara.com`:

```
1. Buy the domain (you buy + charge it back, or the client buys and points it)
2. Add the domain to the SAME Vercel project  →  Vercel gives DNS records
3. Set the DNS records (A / CNAME) at the registrar
4. A middleware.ts reads the request's hostname:
      - if it's a client's custom domain → rewrite "/" to "/{their-slug}"
      - the mapping lives in Site.domain (already in the data model)
5. Their invitation now serves at the root of their own domain
```

Still **one repo, one Vercel project** — Vercel allows many domains per project.
This middleware is a small, one-time build (see §9).

---

## 8. Example end-to-end timeline

| When | Who | What |
|---|---|---|
| Day 0, 9:00 | Client | Submits order (Premium, Template B) |
| Day 0, 9:01 | You | Telegram ping + lead in admin |
| Day 0, 11:00 | You ↔ Client | WhatsApp, confirm details, send payment info |
| Day 0, 14:00 | Client | Pays via InstaPay, sends screenshot |
| Day 0, 14:10 | You | Mark Paid, create draft site, start building |
| Day 1 | You | Send preview link |
| Day 1 | Client | Approves (or 1 round of tweaks) |
| Day 2 | You | Flip to Live, map domain, send final link |
| — | Client | Shares with guests 🎉 |

---

## 9. What's built vs. what we build next

**✅ Already built**
- Multi-tenant sites at `/{slug}`, DB-backed, status-gated
- Admin: create/edit sites, live preview, character builder (gender-correct),
  chapters editor, designs/themes, seed, health check
- Two designs (Enchanted Garden, Midnight Royal); bilingual film; Supabase wired;
  deployed on Vercel

**🔨 To build for this order flow** (rough effort)
1. **Public order form + plan/template picker** — the client-facing funnel. *(M)*
2. **`orders` table + admin "Leads" page** — capture + view leads, WhatsApp/Call
   buttons, "Paid" toggle, "Create site from lead" shortcut. *(M)*
3. **Notification** — Telegram bot (or Resend email) on new order. *(S)*
4. **Custom-domain middleware** — host → slug rewrite for Premium/Custom. *(S–M)*
5. **Assign templates to plans** — once you send template examples. *(S)*

*(S = small, M = medium.)*

---

## 10. Open items for you to decide

- **Notification channel:** Telegram (recommended) or email?
- **Your payment handles:** InstaPay address + Vodafone Cash number (shown to
  clients only after you talk to them, or on an invoice).
- **Domain strategy for Premium/Custom:** you buy & charge back, or client buys?
- **Final plan copy + prices** and **which templates go in which plan** (later).
