# Website Deep-Audit Prompt (Claude for Chrome)

**How to use:** Open the target site's homepage in a Chrome tab, open the
Claude for Chrome extension side panel, fill in `{{TARGET_URL}}` in the block
below, and paste the whole block as your first message. Let it run through to
the end before interrupting — the later phases depend on the earlier ones.
Ask it to keep going if it stops partway ("continue to Phase 3", etc.) —
a full audit is long and it may pause between phases.

---

```
You are auditing {{TARGET_URL}} using your Chrome browser tools. Your job is
to produce a rebuild-grade specification of this site — thorough enough that
an engineer could reconstruct it pixel-for-pixel and behavior-for-behavior
from your write-up alone, without ever opening the original.

This is not a skim. A page is not "done" until you have: its exact copy,
every image with its real source URL, every icon identified by name, every
color and font as a computed value (not a visual guess), and — for anything
interactive — a full run-through of every state, not just the first screen.

Work through the five phases below in order. Do not skip Phase 4 (live
interaction testing) even if a page looks static. Forms and multi-step flows
hide most of a site's real complexity, and skimming them is the single
biggest cause of an inaccurate rebuild. At the end of each phase, write up
what you found before moving to the next one, so nothing gets lost if you run
long.

GROUND RULES — read before starting

Never infer a color, font, or spacing value by eye. Get it from JavaScript
(getComputedStyle) via your browser tools. "Looks like light gray" is not a
spec — "rgb(151, 163, 180)" is. Text that looks like plain gray is very often
a hue-shifted color (blue-gray, warm-gray) that only shows up in the computed
value, never in a screenshot.

Text-only reading of a page misses images, and images carry real design
decisions. Reading visible text will not tell you a hero has a background
photo, that a card grid has photographic thumbnails, or that a logo strip
scrolls. Before you consider ANY page "captured," run a script that lists
every <img>, every element with a non-none background-image, and every
inline <svg>, with its class and the section it sits in. Do this even on
pages that "look" like plain text and cards — the most consequential misses
come from exactly those pages.

Identify the icon library, then name every icon, don't redraw or vaguely
describe them. If icons carry a class like "lucide-award" or
"lucide-shield-check", that is the literal component name in that library —
record it verbatim next to what it labels.

A single simulated click that doesn't visibly change anything doesn't mean
the element is inert. Try: a real keyboard-driven interaction (focus the
field, type, press Tab/Enter/Arrow keys); dispatching a fuller native event
sequence (pointerdown/mousedown + pointerup/mouseup + click); and — this
matters — check whether the click worked with a SEPARATE follow-up read
rather than checking in the same script right after clicking, since some
sites update state a moment later and an immediate check reads the stale
value.

Multi-step flows are almost never as simple as the first step suggests. A
wizard step showing one question on entry may reveal two, three, or four
more fields once you answer it. Treat "Step 1 of N" as a promise that N
distinct screens exist — do not stop early, and do not extrapolate later
steps from the pattern of earlier ones. Fill every step for real and read
what the next step actually contains.

If the site remembers your progress in a form across navigations, that's
real behavior worth noting — but also means you may need a hard refresh or a
new tab to see the true first-visit state.

A cookie-consent banner, if present, is part of the spec, not noise. Capture
its exact copy, its buttons, and — if it has a "manage preferences"
expansion — what that reveals.

Never submit a real quote request, application, purchase, or contact form
with fake data into what might be a live production system. Get every field
filled and confirm the submit button becomes enabled, then stop and say
explicitly that you stopped short of submitting and why.

PHASE 1 — Map the site

Produce a full route list before doing anything else. Walk every nav link,
every footer link, every button that navigates, and every link inside page
copy (including inside long-form content, not just nav/footer). For each
route, capture: URL path, page title, one-line purpose, and whether it's
static content, a form, or a multi-step flow. Check the footer separately —
it commonly holds routes nothing else links to (legal pages, help center,
about).

PHASE 2 — Extract the design system

Do this on at least three different pages (a marketing page, a content/list
page, a form page) before treating any value as global — some sites vary
tokens by section.

Capture, as computed values, with the utility class name too if the site
uses one (Tailwind etc.):
- Color tokens: background, body text, muted/secondary text, card/surface
  background, border color (note if borders use reduced opacity — common and
  easy to miss by eye), the brand/accent color(s) — many sites use more than
  one accent for different purposes.
- Typography: is there more than one font family? Check headings
  specifically against body text — a distinct display font for headings only
  is common. Get font-family, weight, and size for H1, H2, H3, body
  paragraph, small/caption text, button text, and nav links, at more than one
  breakpoint. Get the real letter-spacing value for any uppercase "eyebrow"
  labels.
- Spacing rhythm: padding on major page sections, and whether sections are
  separated by visible divider lines or purely by whitespace.
- Corners & elevation: border-radius on cards, buttons, and inputs as a
  pixel value. Box-shadow/glow on hover or selected states specifically, not
  just the resting state.
- Component states: for one representative button, card, and pill/tag, get
  resting AND hover AND selected/active computed styles. Note exactly what
  changes.
- Header/nav behavior: solid background or translucent with backdrop-blur?
  Sticky? Does it change on scroll?

Write this up as a token table (name -> value -> where it's used) before
moving on.

PHASE 3 — Page-by-page inventory

For every route from Phase 1:
- All copy, verbatim — headlines, body text, button labels, microcopy,
  placeholder text, helper/error text, footer fine print. Quote exactly,
  including capitalization and punctuation.
- All images: real source URL, alt text, where used, and role (hero
  background, card thumbnail, logo, decorative). Note reused assets at
  different sizes/crops.
- All icons: library + exact name, color, size, what it labels.
- Section order top to bottom, and for each section whether it's a grid,
  list, carousel/marquee, tabs, or accordion.
- Every distinct card/list-item visual variant if more than one exists.

PHASE 4 — Live-test every interactive flow

For every form, wizard, accordion, tab set, and filter control:
1. Load it fresh and record the exact entry state.
2. Go through every step or state, not a sample. For a multi-step wizard:
   fill step 1 for real, advance, record step 2 in full (including any
   fields that only appeared after step 1 was answered), advance, repeat
   until the final step, for every single step. Record the exact
   heading/question text per step, every selectable option in order
   verbatim, whether a step bundles multiple questions, any helper/privacy
   text shown, and what makes "continue" become enabled.
3. Try edge cases: submit empty (what validation message, where), enter
   obviously invalid input if it validates client-side (bad email, bad phone
   format), use "back" mid-flow and confirm whether earlier answers persist.
4. Get to the real end state without submitting fake data into a live
   system (see ground rules) — confirm the final submit control enables and
   stop there, noting that you stopped.
5. For accordions/tabs: open every item, not just the first. Note whether
   opening one closes others, and the expand/collapse icon plus its
   transition.
6. For filters/search: apply every option individually, note how results
   and the URL/query params change.

PHASE 5 — Responsive & state coverage

Check layout at mobile, tablet, and desktop widths for the homepage and at
least one form page. Note what reflows, what collapses into a menu, and
whether the mobile nav differs in structure (not just layout) from desktop.
Note loading states, empty states, and error states wherever reachable.
Note any animation (page-load reveals, hover transitions, scroll effects)
and its rough duration/easing if visible in computed styles.

FINAL OUTPUT

Present your complete findings as one structured write-up, in this order,
so it can be dropped straight into a playbook:
1. Site map (Phase 1 table)
2. Design system reference (Phase 2 token table)
3. Page inventory (Phase 3, one section per route)
4. Interactive flow specifications (Phase 4 — one full step-by-step spec per
   form/wizard; this section should be long, that's expected)
5. Responsive & state notes (Phase 5)
6. Open questions — everything you inferred rather than directly confirmed,
   and anything gated behind a login you didn't have credentials for

Flag every place you had to guess rather than confirm. A confident wrong
answer is worse than a flagged gap — the gap gets checked, the wrong answer
gets rebuilt wrong.
```
