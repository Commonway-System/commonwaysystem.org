# Commonway System: locked decisions

Decisions Kevin has locked. Don't reopen one without his say-so. When a session locks a new decision, add it here, one line, with the date. Voice, page structure, editorial and citation-format rules live on `/about/brand-guide/`; follow that page and don't restate its rules here.

## How decisions get made

- Lock one decision at a time, explicitly, before building on it.
- Kevin decides content and design judgment calls. Surface them; don't decide them silently.
- Verify a claim against the current files or sources before acting on memory of what was intended.

## Positioning

- The Commonway System complements NACTO, Complete Streets and Strong Towns rather than competing with them, and goes further where evidence supports it (for example, Arterial no-parking and no-direct-access rules), informed by Dutch Sustainable Safety and Vision Zero.
- Kevin is an enthusiast-compiler and researcher, not a credentialed engineer or planner. The citation system stands in for credentials.
- Audiences run from total beginners to professional engineers: plain language on top, technical depth beneath.
- The system is prescriptive where evidence supports it.

## Street design positions

- Design speed always equals the posted speed limit (FHWA's self-enforcing roadway framework).
- Roundabouts are the default intersection control. A traffic signal is a last resort and needs documented justification.
- Added lanes are a cost, not a cure. For congestion, look first at pricing, reallocating road space to transit, bikes and walking, and a connected street network. Widening is the last option, and any widening forecast must include induced travel. (2026-10-15)
- Induced demand evidence wording, verbatim: "On major roads, added capacity typically brings 8 to 10 percent or more driving per 10 percent more capacity within 3 to 10 years, less at first, and less is known for local streets." Source: Volker and Handy, UC Davis NCST, January 2023. (2026-10-15)
- NACTO's 35 mph urban-arterial cap applies to the Urban density tier. NACTO doesn't address Suburban or Compact, so their higher Arterial baselines stand. (2026-10-15)
- The Arterial noise zone is measured from the road's centerline (Dutch Wet geluidhinder Art. 74). (2026-10-15)
- The Arterial access modifier triggers at 3 or more crossing points per quarter mile (NACTO *City Limits*, "high crossing-point density"). (2026-10-15)
- Pedestrian survival figures come from Tefft (AAA Foundation, 2011) alone; the WHO 2004 figures are dropped. (2026-10-15)
- When a page needs more than one speed- or volume-based threshold, reuse one evidence-based number across all of them rather than letting each row pick its own.
- Freight-scale roundabouts are a design-vehicle and truck-apron note on INT-RAB-01, not a separate pattern (NCHRP Research Report 1043).
- Industrial Collector bicycle facility trigger: required wherever general population falls within a 3-mile bike or 0.5-mile walk catchment of the segment (FTA 2011 policy statement). Public right-of-way serves everyone, so it's a population catchment, not a jobs catchment.

## Components and structure

- "Layered guidance across sources" is a standing component (`GuidanceTable`): five default columns in order (Commonway System, Federal / State, NACTO, Complete Streets, Dutch / Sustainable Safety), free-form rows per pattern, expandable cells, placed directly before Design notes on every Local, Collector, Arterial and Intersections & Crossings pattern page.
- Guide sections: Core Concepts (transportation fundamentals: Ecosystem, Design Speed, Induced Demand, Hoofdnet/Plusnet), Using the System (how to read and find patterns and retrofits), Make It Happen. Hoofdnet/Plusnet is something the system draws on, not part of it. (2026-10-15)
- Start Here (`/guide/`) is the front door to the whole publication, not just the Guide.
- Descriptive patterns show no status badge, on purpose.
- Pattern IDs are permanent. One recorded exception: ART-PKY-07, after an index renumbering.

## Sources

- Cite a primary source, read directly. A search snippet or a summary is not a source.
- When a claim can be confirmed only through a secondary source that quotes the primary accurately, use it with the unsourced flag and a note naming what was read. Don't treat it as fully sourced, and don't drop it.
- When rewriting a page, re-read every existing source. Keep every source unless it's disproven; list each correction for Kevin.
- Where research turns up only one precedent for a rule, find a second before treating it as settled.
- Advocacy sources are cited for what they argue, not as evidence.
- Recheck a Related Media item's endorsement status (Aligned or Context-only) whenever its page is substantially re-researched. A media item belongs on the page it supports most; propose untagging off-topic items rather than leaving them.
- Never get past a bot wall (Cloudflare checks and the like). Use another source, or ask Kevin for the page text.

## Open items

- The open items list lives in `src/lib/data/roadmap.ts`, and the Roadmap on `/about/release-history/` renders from it. One list, nothing to sync.
- IDs are integers, never reused. When an item ships, delete it from the list and record it in that day's changelog. Update `highestIdAssigned` when adding one.
- Items are added, removed or reworded only on Kevin's explicit instruction.
- No private items in the repo. The repo is public.
