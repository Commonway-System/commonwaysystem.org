---
name: add-agency
description: Research one road agency (or a short list) and add or update its entry in the Road Agency Directory (/references/road-agencies/), with every contact confirmed on the agency's own site. Use for any new agency, new contact, or recheck of an existing entry.
argument-hint: "<agency name and state, or an agency id like us-or-odot> [recheck]"
---

# Add or update a road agency

Target: $ARGUMENTS

The directory lists only researched agencies. Every contact must be read on the agency's own official site (or the official host it uses for forms, such as a city's 311 portal). A search snippet, a directory site, Wikipedia or an AI summary is not a source.

## 0. Load the model

- `src/lib/data/agencies/types.ts`: the fields, levels and contact types, and what each one means.
- `src/lib/data/agencies/countries.ts`: the country's level labels and its ISO 3166-2 region codes. A new country needs an entry here first (ask Kevin before adding one).
- The file the entry belongs in: `us/federal.ts` (national), `us/states.ts` (state, DC and territory DOTs), or one file per state for everything below that, named by its region code in lower case (`us/or.ts` for Oregon's counties, cities, MPOs and tribal transportation departments). Create the file when it doesn't exist; the index globs it automatically.

## 1. Research

Find, on the agency's own site, as many of these as exist. Skip any that don't; never guess a URL.

1. `website`: the agency's home page (or its transportation or public works department's page, for a general-purpose government).
2. `request`: a form for traffic-safety or street-change requests (crosswalks, speed, signals, bike lanes).
3. `report`: 311 or a problem-reporting form.
4. `ownership-map`: a map or lookup of who maintains which road.
5. `bike-ped`: the bicycle and pedestrian coordinator's or program's page. State DOTs are required to fund one (23 U.S.C. 217; confirm the subsection before citing it on a page).
6. `ada`: the ADA coordinator or ADA transition plan page.
7. `policy`, `safety-plan`, `plan`, `meetings`: Complete Streets policy, Vision Zero or safety action plan, long-range plan or improvement program, where public meetings are posted.
8. `phone`, `email`: the main line and a general inbox. An office's, never a named person's.

Check each URL in the Browser pane when curl returns 403 or times out (many .gov sites wall scripted requests). Never get past a bot check. Prefer the stable page over a deep PDF link.

## 2. Write the entry

- `id`: `<country>-<region>-<short name>` in lower case, permanent, never reused (`us-or-multnomah-county`). Check it's unique.
- `name`: the official name, written out. `abbr` only if the agency uses one.
- `aka`: other names the agency uses for itself on its own site (a second-language name, a longer abbreviation like "Alaska DOT&PF"), so site search finds them. Not nicknames others coin. A name in another language goes in as `{ name: '...', lang: 'es' }`.
- `level`, `region`, and `area` (the place served, for county, local, regional and tribal entries).
- `handles`: one plain sentence on what to contact it about, only when that isn't obvious from the level (a county road commission, a district that owns the streets). Follow the brand guide's editorial rules: plain words, no em-dashes.
- `checked`: today's date. On a recheck, update it only after every contact on the entry has been confirmed; give a contact its own `checked` when only that one was confirmed later.
- Location (`[lat, lng]` of the main office) when it's easy to confirm (not drawn yet; kept for pins on the map later).

## 3. Verify and report

- `pnpm run check` (the directory's index throws on a duplicate id, unknown region, bad date or empty contacts at build time).
- Open `/references/road-agencies/` in the dev server, filter to the new entry, and confirm every link opens the right page.
- Add one line to today's entry in `src/lib/data/releases.ts` (format: `.claude/rules/releases.md`): which agencies were added or updated, and how many contacts.
- Report to Kevin: what was added, anything you couldn't find, and any link you left out because it was walled or broken.
