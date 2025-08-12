Kessler & Vayne Industries — PRD (/shop focus)

Decisions Locked
	•	Stack: “Easy to maintain.” Default: Vite + React + TypeScript (or SvelteKit if the team prefers). Styling with Tailwind (utility + tokens) to keep CSS tiny. No server required.
	•	Data: 100% browser‑local (LocalStorage + optional IndexedDB cache).
	•	Flow: Fake purchase; random delivery date in 2100s; items marked “Ordered” locally.
	•	Onboarding: “Open Account” binds first accountNumber+password and randomizes balance 503–998 CVX. Subsequent “Sign In” only verifies against first creds; cannot change.
	•	Security vibe: Light obfuscation; intentionally reversible by curious users.

⸻

1) Information Architecture
	•	Header: K&V logo → Routes: Shop, About, Balance, ⚙ Settings.
	•	Footer: flavor legal, meshbits disclaimer, link to the print catalog issue number.
	•	Global Promo Unit (ConvergenceLedger): small ad block that rotates copy; CTA → /balance.

Routes:
	•	/shop (primary)
	•	/about (K&V overview + lore)
	•	/balance (ConvergenceLedger Account: first creds bind; shows CVX balance)
	•	/settings (clear saved data; toggles)

⸻

2) Data & Persistence

Key‑Value Map (LocalStorage)

All keys prefixed kv_:
	•	kv_firstCreds: Base64(SHA‑256 of account:password)
	•	kv_balanceCVX: int ∈ [503, 998]
	•	kv_hasOnboarded: boolean
	•	kv_orders: string[] of product IDs
	•	kv_deliveryDates: map {[productId]: "YYYY‑MM‑DD"}
	•	kv_productsCache: cached product JSON (optional; fallback to bundled JSON)
	•	kv_ui: {filters, sort, theme, reducedMotion} (respect reduced motion if used)
	•	kv_puzzle: {ghostMark:number, steps:string[], discoveredAt:string}

Creation Rules
	•	First successful submit on /balance:
	•	If kv_firstCreds unset → hash & store; generate kv_balanceCVX with crypto.getRandomValues; set kv_hasOnboarded=true.
	•	Else → lock inputs; show “Already bound to this client.”
	•	Sign In:
	•	Hash submitted creds; compare to kv_firstCreds. If mismatch → diegetic error. If match → proceed (no server).

Purchase Rules (Fake)
	•	Click ImpulseCast on a product:
	•	If kv_hasOnboarded false → nudge to /balance.
	•	Else → append product ID to kv_orders and generate one future date:
	•	Year: random ∈ [2103, 2199]
	•	Month: 1–12; Day: clamp to valid days per month
	•	Show “Ordered • Arrives <date> via Axiom Mesh Courier”.

Light obfuscation: store orders as btoa(JSON.stringify([...])) and sprinkle a constant “pepper” string; easy to reverse‑engineer.

⸻

3) Product Model

{
  "id": "kv-hand-mk2",
  "name": "Vayne Series Mk.II Hand",
  "tier": "Standard | Corpo | Industrial",
  "priceCVX": 89,
  "availability": "in-print | limited | pre-order",
  "blurb": "Segmented armor, micro-actuators, GhostMark-ready.",
  "tags": ["hand", "augment", "actuator"],
  "specterId": "KV-7J3L-…",
  "cipherSeed": "KV-7J3L-…",
  "media": ["/img/hand-mk2.png"],
  "attributes": {"torque":"high","finish":"graphite"}
}


⸻

4) /shop Requirements

Layout
	•	Grid: Mobile 2–3 cols; desktop 4–6.
	•	Card: name, tier, price (CVX), mini CipherSig glyph, ImpulseCast button.
	•	Filters/Search: tier, price range, tag chips, search by name/blurb/tags; state persists (kv_ui).
	•	Detail Modal: bigger art, extended copy, attributes, full CipherSig, “ImpulseCast”.
	•	Promo Unit: ConvergenceLedger trust ad (rotating lines like “Meshbits don’t bounce.”) with CTA → /balance.

Interactions
	•	Clicking ImpulseCast:
	•	If onboarded → set ordered state; confetti‑but‑minimal animation; delivery date tooltip.
	•	If not → inline nudge: “Bind your Prime SpecterID to initialize CVX.”

Visual
	•	Mail‑order B/W with neon accent; halftone textures; minimal motion by default (no strict a11y reqs per your note).

⸻

5) /balance Requirements

States
	•	Unbound (first visit): Account # + Password → “Initialize Account”
	•	On submit (first time only):
	•	Hash & store creds; generate CVX in [503, 998]; persist.
	•	Bound: Big numeric balance (e.g., 742 CVX), “Bound to this client.” Inputs disabled; “Sign out” hidden (no concept), but /settings can wipe everything.

Microcopy
	•	“Mesh‑native settlement. Your GhostMark improves delivery priority.”

⸻

6) /about Requirements
	•	Short K&V origin + divisions; one single subtle tease to hidden systems (e.g., “Some interfaces respond to unconventional input.”).
	•	Mentions NodeKey, SpecterID, GhostMark, ImpulseCast, BindScript, Axiom Mesh (consistent with your doc).

⸻

7) /settings Requirements
	•	Clear all local data (resets creds, balance, orders, puzzle).
	•	Toggle: High contrast; Reduce animation (optional).

⸻

8) Hidden CTF (multi‑step, progress‑aware)

All progress summarized by GhostMark meter (0–100) visible only after first discovery. Each arc ~25 points. Light obfuscation (base64+pepper). Console is client‑only, toggled with ~.

A) Specter Whisper (console + audio)
	•	Discover: Press ~ on /shop → faint console with “signal: -72dBm”.
	•	Steps:
	1.	Turn on promo tooltip once → console prints “carrier locked”.
	2.	Long‑hover CipherSig → UI emits short/long flashes (Morse); decode token.
	3.	kv> claim <token> → unlocks “band scanner” overlay when filters change.
	4.	Collect 3 frequencies (from applying three different filters) → concat → base64 → phrase.
	5.	kv> submit <phrase> → +25 GhostMark.
	•	Progress UI: tiny oscilloscope grows taller on each step.

B) CipherSig Parallax (alt‑click glyphs)
	•	Discover: Alt+click on a product’s CipherSig opens Parallax View (3 layers).
	•	Steps:
	1.	Find three products with distinct layer orders (L1/L2/L3).
	2.	Map orders using acrostic key hidden in /about (first letters per paragraph).
	3.	Decoded string reveals JSX fragment in an aria‑label.
	4.	Paste fragment in console; it renders a mini PIN prompt.
	5.	PIN = sum of the three products’ CVX prices mod 10000.
	6.	Submit PIN → +25 GhostMark.
	•	Progress UI: layered icon fills per product found.

C) Impulse Echo (purchase sequence)
	•	Discover: Order a sequence Standard → Industrial → Corpo within 60s.
	•	Steps:
	1.	Promo unit glitches; data attribute data-carrier appears.
	2.	Collect data-carrier values for each of the three orders; hex → binary → ASCII.
	3.	Console unlocks a Web Audio pad; press play → DTMF encodes 6 digits.
	4.	Enter digits in console → +25 GhostMark.
	•	Progress UI: waveform badge in header fills.

D) Axiom Footnotes (click‑hunt + filters)
	•	Discover: On /about, click the 3rd paragraph’s em‑dash five times → opens “Footnotes” drawer (5 notes).
	•	Steps:
	1.	Each footnote references a product attribute (finish, tag, price, tier, alt text date).
	2.	Filter /shop to isolate the matching set.
	3.	Header shows “Axiom Mesh Consistent”; click it → shows BindScript JSON preview.
	4.	Paste JSON to console for validation → +25 GhostMark.
	•	Progress UI: ledger checklist ticks each footnote.

Completion Reward: Epilogue modal + cosmetic badge added to header; kv_puzzle.completed=true.

⸻

9) ConvergenceLedger Promo (ad unit)
	•	Rotates 3–5 short lines:
	•	“Meshbits don’t bounce.”
	•	“Your GhostMark is your credit.”
	•	“Item‑bound addresses. People‑bound freedom.”
	•	CTA → Open an Account (to /balance).
	•	Small “How it works” hover: 1‑2 lines referencing NodeKey, SpecterID, ImpulseCast.

⸻

10) Acceptance Criteria

/balance
	•	First successful submit sets kv_firstCreds, kv_balanceCVX ∈ [503,998], kv_hasOnboarded=true.
	•	Subsequent submits do not replace creds/balance.
	•	UI shows bound state and balance; only /settings can reset.

/shop
	•	Renders 24+ products from JSON; filters/search work and persist.
	•	Clicking ImpulseCast when onboarded:
	•	Adds product to kv_orders.
	•	Generates 2100s delivery date; saved to kv_deliveryDates[productId].
	•	Card updates to “Ordered • Arrives YYYY‑MM‑DD”.
	•	Not onboarded → inline prompt to /balance (no reload).

Puzzle
	•	Console toggles with ~; tracks steps in kv_puzzle.
	•	Each arc contributes ~25 to GhostMark; final badge appears at 100.
	•	All artifacts are client‑only and survive reload; wipe resets.

⸻

11) Technical Notes (Dev‑facing)

Folder Structure (React)

/src
  /pages (Shop.tsx, About.tsx, Balance.tsx, Settings.tsx)
  /components (ProductCard.tsx, CipherSig.tsx, PromoUnit.tsx, Console.tsx, Modal.tsx)
  /lib
    storage.ts  // get/set/reset, namespacing, pepper helpers
    crypto.ts   // hashCreds(account,password)
    rng.ts      // balance + delivery date
    puzzle.ts   // triggers + state machine
  /data
    products.json

Pseudocode

// crypto.ts
export async function hashCreds(a: string, p: string) {
  const enc = new TextEncoder().encode(`${a}:${p}`);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return btoa(String.fromCharCode(...new Uint8Array(buf)));
}

// rng.ts
export function randomBalance() {
  const n = new Uint32Array(1); crypto.getRandomValues(n);
  return 503 + (n[0] % (998 - 503 + 1));
}
export function futureDate2100s() {
  const n = new Uint32Array(3); crypto.getRandomValues(n);
  const year = 2103 + (n[0] % 97);          // 2103–2199
  const month = 1 + (n[1] % 12);
  const day = Math.min(28 + (n[2] % 3), new Date(year, month, 0).getDate());
  return `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
}

Light Obfuscation (example)

const PEPPER = 'kv∴meshbits';
function enc<T>(o:T){ return btoa(PEPPER + JSON.stringify(o)); }
function dec<T>(s:string){ return JSON.parse(atob(s).replace(PEPPER,'')) as T; }

CipherSig
	•	Deterministic SVG from cipherSeed (fast, printable). Seed → PRNG → draw N×N modules.

⸻

12) Performance & Quality
	•	JS runtime ≤ 200KB gz (MVP), first contentful paint < 1.5s mid‑tier mobile.
	•	Code‑split routes; lazy‑load product images.
	•	No analytics by default; optional local counters only.

⸻

13) Milestones
	1.	M1: Skeleton & Storage (3–4 days)
	•	Routing, storage module, /balance first‑bind flow, /settings reset.
	2.	M2: Shop Grid & Promo (4–6 days)
	•	Product data, grid, filters, detail modal, CipherSig, promo unit.
	3.	M3: Fake Purchase & Delivery (2–3 days)
	•	ImpulseCast CTA, orders state, 2100s date generation, ordered UI.
	4.	M4: Puzzle A end‑to‑end (5–7 days)
	•	Console, triggers, progress meter, full Specter Whisper arc.
	5.	M5: Remaining Puzzles & Polish (1–2 weeks)
	•	B–D arcs, microcopy, print‑style polish, QA.

⸻
