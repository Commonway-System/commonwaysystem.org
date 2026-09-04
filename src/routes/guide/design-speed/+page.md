---
title: Design Speed & Speed Limits
description: Why design speed, operating speed, and posted speed limit routinely diverge, and the Commonway System rule that keeps them locked together.
date: 2026-09-02
llms: Explains the difference between design speed, 85th-percentile operating speed, and posted speed limit; the 1985-to-2001 FHWA/AASHTO history behind why they diverge; and the Commonway System rule that design speed always equals posted speed limit, with its Local/Collector/Arterial/Freeway application.
---

<script>
  import { Citation, EvidenceChip, RelatedMedia } from '$lib/theme/components'
</script>

<RelatedMedia id="/guide/design-speed/" />

## What design speed is

Design speed is a selected speed used to determine a roadway's geometric design features: curve radii, sight distance, lane width, and similar elements.<Citation index={1} /> It is an input to the drawing board, not a number posted on a sign. A road's actual geometry, its curves, its lane widths, its sightlines, can support a much higher speed than the design speed on the plans, because geometric standards are written with a built-in safety margin for near-worst-case conditions.<Citation index={3} /> Engineers call the highest speed a road's geometry can actually support its _inferred design speed_, and it is frequently higher than the design speed the road was drawn to.<Citation index={5} />

## What a posted speed limit is

A posted speed limit is the legal maximum speed for a section of road, set by a state or local transportation authority. In conventional US practice, posted limits are commonly derived from the 85th-percentile operating speed: the speed at or below which 85 percent of drivers travel in free-flow conditions.<Citation index={2} /> This method sets the limit to match how people already drive, not to match what the road's geometry was designed for.

## Why these two numbers diverge

Design speed, operating speed, and posted speed limit are three different measures, set by three different parties, for three different reasons: designers set design speed to establish geometric features, operators set posted limits they judge safe for the road, and drivers pick their own speed based on how safe the road feels to them. These three numbers are frequently incompatible with each other.<Citation index={4} />

The mismatch has a specific origin. A 1985 FHWA memorandum establishing the controlling criteria for federal-aid design stated that design speed should be selected to equal or exceed the posted speed limit. In 2001, AASHTO's Green Book dropped that link. The Green Book now defines design speed purely as a geometric design input and gives no guidance connecting it to posted speed limits.<Citation index={5} /> Since then, US roads are routinely built with generous, above-minimum geometry, then posted below what that geometry actually invites. The result: streets whose curves, lane widths, and sightlines all say "drive faster" while the sign says otherwise. Drivers overwhelmingly follow the road, not the sign. Documented cases show 85th-percentile operating speeds and posted speed limits both exceeding the road's own designated design speed, on roads whose geometry was never checked for consistency against the number on the plans.<Citation index={6} />

## Why it matters

A posted number does not change how a driver feels behind the wheel. Geometry does. A driver's comfortable, "natural" speed is set by what the road communicates: lane width, curvature, sightlines, and roadside friction, regardless of what the sign says.<Citation index={7} /> Design speed decoupled from posted speed limit is design speed decoupled from what actually happens on the road. A pattern book that treats posted speed as the safety mechanism, while leaving geometry free to invite something higher, is solving the wrong problem.

## The Commonway System's rule

**Design speed always equals posted speed limit.**

This is CS's foundational speed rule, and every Local, Collector, and Arterial pattern in this book is built to it. It follows FHWA's own self-enforcing roadway framework: the roadway's physical design should make the target speed the comfortable, natural driving speed, not just the legal one.<Citation index={7} /> A CS street is not "20 mph" or "30 mph" because a sign says so. It is that speed because its geometry makes any faster speed feel wrong to drive.

This is not a target. It is not aspirational. Where a CS pattern specifies a speed, that speed is the design speed, the posted speed, and the intended operating speed, all at once, by design.

## Applying the rule, by street type

### Local: 20 mph hard maximum, no exceptions

CS holds Local streets to 20 mph with no exceptions clause, a stricter standard than the Stockholm Declaration's own 30 km/h (≈20 mph) carve-out for areas where motor vehicles and vulnerable road users mix.<Citation index={8} /> The number is not arbitrary. Pedestrian severe-injury risk from a vehicle impact reaches 10 percent at 17.1 mph and death risk reaches 10 percent at 24.1 mph.<Citation index={9} /> Pedestrian survival exceeds 90 percent in collisions at or below 20 mph, and falls below 50 percent at 30 mph and above.<Citation index={10} /> Local street geometry must make 20 mph the comfortable driving speed. No Local pattern in this book is designed to a higher inferred speed than its posted number.

### Collector: 30 mph standard, 35 mph only with rigid separation

CS holds Collectors to 30 mph as the standard maximum. 35 mph is permitted only where bicycle facilities carry rigid, crash-protective separation, a concrete barrier or permanent curb, not flexible delineator posts. This distinction is FHWA's own: flexible delineators and rigid barriers are not treated as equivalent separation.<Citation index={11} /> The 30 mph threshold matches Dutch distributor-road practice, where roads at this speed class require physical separation between cars and bicycles.<Citation index={12} /> It is also a real safety cliff: bicyclist fatality risk in a collision roughly doubles at 30 mph relative to lower speeds.<Citation index={13} /> Seattle's own Streets Illustrated design guidance independently arrives at the same 30 mph threshold.<Citation index={14} />

### Arterial: density-tiered baseline, with two non-stacking modifiers

No existing framework prescribes Arterial design speed the way CS needs it prescribed, so this is original CS synthesis, built from FHWA's density principle, NACTO's speed guidance, Dutch noise policy, and VDOT's access-spacing logic. Every piece is cited below.

**Baseline, set by density tier.** FHWA is explicit that arterial design speed should fall as land-use density rises: an urban collector or arterial passing through a dense area should carry an appreciably lower design speed than the same functional class in a rural setting.<Citation index={15} /> NACTO's own Design Speed guidance goes further: design criteria should sit at or below a street's target speed, and higher speeds are inappropriate on urban streets, including urban arterials, with higher speeds reserved for limited-access freeways and highways.<Citation index={16} /> CS's six density tiers (see [Density Tiers](/guide/density-tiers/)) give this principle a structured baseline:

| Density Tier        | Baseline Arterial Speed |
| ------------------- | ----------------------- |
| Undeveloped / Rural | 55 mph                  |
| Suburban            | 45 mph                  |
| Compact             | 40 mph                  |
| Urban               | 35 mph                  |
| Core                | 30 mph                  |

Core's baseline meets Collector's ceiling by design. At CS's highest density tier, an Arterial's surrounding context is closer to a Collector's than to a rural Arterial's, even though it still carries a through-traffic function.

**Noise modifier: −5 mph.** Where an Arterial segment runs adjacent to noise-sensitive land uses (residential, schools, healthcare), subtract 5 mph from the baseline. This has direct precedent on both sides of the Atlantic. The Netherlands' Noise Pollution Act sets statutory road-noise limits and mandates abatement where they're exceeded,<Citation index={21} /> and the N325 Pleyroute corridor had its speed limit set specifically for noise and environmental reasons under that framework.<Citation index={22} /> In the US, speed reduction is a federally recognized highway noise abatement measure in its own right: FHWA's traffic noise regulation, 23 CFR Part 772, which governs every state DOT's noise policy, lists reducing speed limits among the traffic management measures available to control highway noise, noting that roughly a 20 mph reduction produces a perceptible (5 dBA) decrease.<Citation index={23} /> AASHTO's own environmental guidance repeats the same finding.<Citation index={24} /> CS's 5 mph step is smaller than FHWA's ~20 mph figure for a _perceptible_ reduction because it is one of two contributing modifiers in a cumulative framework, not a standalone noise-abatement measure sized to solve noise on its own.

**"Noise-sensitive adjacency" is a distance, defined the way the Dutch define it, not the way FHWA defines it.** Article 74 of the Dutch Noise Pollution Act gives every road a statutory noise zone, measured from the inside edge of its outermost travel lane on both sides, sized by lane count and by whether the road sits in an urban or rural area:<Citation index={26} />

| Lanes | Urban zone       | Rural zone       |
| ----- | ---------------- | ---------------- |
| 1-2   | 660 ft (200 m)   | 820 ft (250 m)   |
| 3-4   | 1,150 ft (350 m) | 1,310 ft (400 m) |
| 5+    | 1,150 ft (350 m) | 1,970 ft (600 m) |

A noise-sensitive land use inside this zone qualifies for the modifier; one outside it doesn't. Roads posted at 30 km/h and woonerven carry no zone at all under Dutch law, since they're already slow enough that noise isn't the binding constraint,<Citation index={26} /> the same logic behind CS restricting this modifier to Arterials only. CS adopts this table directly, converted to feet and keyed to the Arterial segment's own lane count.

FHWA's approach is not a distance rule at all. Under 23 CFR 772, highway agencies must model predicted noise levels in decibels at specific receptor points using the Traffic Noise Model, and abatement is only triggered once a receptor's predicted level approaches or exceeds the federal Noise Abatement Criteria.<Citation index={23} /> That's a case-by-case standard requiring an acoustic model for each project, not a bright-line rule a pattern-book user can check with a tape measure.

CS deliberately takes the Dutch rule over the FHWA standard here, and the choice has real backing beyond convenience. The foundational law-and-economics treatment of this exact tradeoff concludes that standards are more costly for individuals to interpret when deciding how to act and for an adjudicator to apply after the fact, while rules make outcomes predictable without requiring case-by-case precedent or specialized interpretation each time.<Citation index={27} /> The same conclusion holds specifically for noise regulation: quantitative, rule-based noise ordinances are capable of providing non-discretionary, objective, and predictable standards, while qualitative, discretionary approaches are more prone to inconsistent enforcement and vagueness.<Citation index={28} /> Enforcement research reaches the same conclusion in general terms: rules are cheaper to enforce than standards precisely because they don't require case-specific information to apply.<Citation index={29} /> A pattern book meant to be usable without commissioning an acoustic study for every Arterial segment is exactly the situation this literature describes. CS chooses the version of this rule that produces the same answer every time it's applied.

**Access modifier: −5 mph.** Where local streets tie into the Arterial more frequently than a defined spacing threshold, subtract 5 mph from the baseline. This inverts VDOT's own logic tying minimum intersection spacing to speed class: VDOT requires wider spacing at higher speeds because more conflict points at speed raise crash risk.<Citation index={25} /> CS applies the same relationship in reverse: tighter local-street spacing is itself evidence that the speed should come down.

**The two modifiers do not stack.** If a segment qualifies for both, only the single larger reduction applies, not both added together. This is not an arbitrary simplification. It follows the same logic used across three independent fields that all study what happens when overlapping risk-reduction factors are combined:

- NACTO's City Limits methodology evaluates conflict density and activity level jointly, in a risk matrix, rather than summing them into a single additive number.<Citation index={17} />
- AASHTO's Green Book treats design speed as one of a small set of governing controlling criteria, with deviations handled through a documented design-exception process rather than compounding penalties across every applicable factor.<Citation index={18} />
- FHWA's own Highway Safety Manual guidance on combining multiple Crash Modification Factors cautions that unless countermeasures act completely independently, multiplying several together is likely to overestimate their combined effect, with the risk of overestimation growing as more factors are combined.<Citation index={19} /> The standard correction for exactly this situation is the _dominant effect method_: apply only the single most effective (largest) factor, the simplest and most conservative approach, used when the applicable factors overlap rather than act independently.<Citation index={20} />

CS's noise and access modifiers are not independent, both are proxies for the same underlying thing: how much a road's context, not its through-traffic function, should be pulling its design speed down. Applying the dominant one, not both, follows the same conservative logic transportation safety practice already uses when two risk factors point the same direction.

**Floor: 30 mph, with a documented-exception process.** The baseline minus the applicable modifier never exceeds the Step 1 baseline, and the result is not permitted below 30 mph except through a documented exception, following the same default-plus-documented-exception architecture CS already uses for roundabout-first intersection control and the crash-investigation lifecycle.

### Freeway: governed by existing systems

CS does not set a speed rule for Freeways. An extensive federal and state regulatory system, spanning AASHTO's own Interstate design standards and each state DOT's speed-setting authority, already governs freeway speed comprehensively. CS respects that existing system rather than duplicating or second-guessing it.

## References

1. <span id="ref-1"></span><EvidenceChip tier="legal" /> AASHTO. _A Policy on Geometric Design of Highways and Streets_, 7th ed. Washington, DC: American Association of State Highway and Transportation Officials, 2018.
2. <span id="ref-2"></span><EvidenceChip tier="legal" /> Federal Highway Administration. "Relationship Between Design Speed, Operating Speed, and Posted Speed." Available at: https://www.fhwa.dot.gov/planning/css/resources/speed
3. <span id="ref-3"></span><EvidenceChip tier="evidence" /> Texas Transportation Institute / Federal Highway Administration. _Compatibility of Design Speed and Posted Speed for Texas Highways_. Report FHWA/TX-95/1465-1.
4. <span id="ref-4"></span><EvidenceChip tier="legal" /> Toole, Joseph S. Foreword to _Speed Concepts: Informational Guide_. FHWA-SA-10-001. Washington, DC: Federal Highway Administration, 2009.
5. <span id="ref-5"></span><EvidenceChip tier="legal" /> Federal Highway Administration. Memorandum from E. Dean Carlson establishing the thirteen controlling criteria for design, April 15, 1985, and subsequent guidance on the 2001 AASHTO Green Book redefinition of design speed. Available at: https://www.fhwa.dot.gov/design/standards/151007.cfm
6. <span id="ref-6"></span><EvidenceChip tier="legal" /> Federal Highway Administration. "Chapter 6: Government Roles Related to Traffic Speeds." _Speed Concepts: Informational Guide_. Available at: https://highways.dot.gov/safety/speed-management/speed-concepts-informational-guide/chapter-6-government-roles-related
7. <span id="ref-7"></span><EvidenceChip tier="legal" /> Federal Highway Administration. _Self-Enforcing Roadways: A Guidance Report_. FHWA-HRT-17-098, 2018.
8. <span id="ref-8"></span><EvidenceChip tier="precedent" /> Third Global Ministerial Conference on Road Safety. _Stockholm Declaration_. Stockholm, 2020.
9. <span id="ref-9"></span><EvidenceChip tier="evidence" /> Tefft, Brian C. _Impact Speed and a Pedestrian's Risk of Severe Injury or Death_. Washington, DC: AAA Foundation for Traffic Safety, 2011.
10. <span id="ref-10"></span><EvidenceChip tier="evidence" /> Peden, Margie, et al. _World Report on Road Traffic Injury Prevention_. Geneva: World Health Organization, 2004, as cited by the Federal Highway Administration.
11. <span id="ref-11"></span><EvidenceChip tier="legal" /> Federal Highway Administration. _Separated Bike Lane Planning and Design Guide_.
12. <span id="ref-12"></span><EvidenceChip tier="precedent" /> CROW. Dutch Sustainable Safety design guidance on distributor-road separation requirements.
13. <span id="ref-13"></span><EvidenceChip tier="evidence" /> Federal Highway Administration / National Transportation Safety Board. Bicyclist fatality risk data by impact speed.
14. <span id="ref-14"></span><EvidenceChip tier="precedent" /> Seattle Department of Transportation. _Streets Illustrated_.
15. <span id="ref-15"></span><EvidenceChip tier="legal" /> Federal Highway Administration. "Design Speed." Available at: https://www.fhwa.dot.gov/planning/css/resources/dspeed
16. <span id="ref-16"></span><EvidenceChip tier="precedent" /> National Association of City Transportation Officials. "Design Speed." _Urban Street Design Guide_. Available at: https://nacto.org/publication/urban-street-design-guide/design-controls/design-speed/
17. <span id="ref-17"></span><EvidenceChip tier="precedent" /> National Association of City Transportation Officials. _City Limits: Setting Safe Speed Limits on City Streets_, 2020.
18. <span id="ref-18"></span><EvidenceChip tier="legal" /> AASHTO. _A Policy on Geometric Design of Highways and Streets_, 7th ed., controlling criteria and design exception guidance.
19. <span id="ref-19"></span><EvidenceChip tier="evidence" /> Federal Highway Administration, CMF Clearinghouse. _Combining Multiple CMFs_. Available at: https://www.cmfclearinghouse.fhwa.dot.gov
20. <span id="ref-20"></span><EvidenceChip tier="evidence" /> Texas Department of Transportation. "5.4 Crash Modification Factors (CMFs)," dominant effect method. _Roadway Design Manual_.
21. <span id="ref-21"></span><EvidenceChip tier="legal" /> Netherlands. _Wet geluidhinder_ [Noise Pollution Act].
22. <span id="ref-22"></span><EvidenceChip tier="precedent" /> N325 Pleyroute corridor speed-setting precedent, as documented in Dutch noise policy literature.
23. <span id="ref-23"></span><EvidenceChip tier="legal" /> Federal Highway Administration. 23 CFR Part 772, _Procedures for Abatement of Highway Traffic Noise and Construction Noise_.
24. <span id="ref-24"></span><EvidenceChip tier="precedent" /> AASHTO Center for Environmental Excellence. "Noise Overview." Available at: https://environment.transportation.org/focus-areas/noise/noise-overview/
25. <span id="ref-25"></span><EvidenceChip tier="precedent" /> Virginia Department of Transportation. Intersection and access spacing standards by design speed class.
26. <span id="ref-26"></span><EvidenceChip tier="legal" /> Netherlands. _Wet geluidhinder_ [Noise Pollution Act], Article 74 (statutory noise zone widths by lane count and urban/rural context).
27. <span id="ref-27"></span><EvidenceChip tier="evidence" /> Kaplow, Louis. "Rules Versus Standards: An Economic Analysis." _Duke Law Journal_ 42, no. 3 (1992): 557-629.
28. <span id="ref-28"></span><EvidenceChip tier="evidence" /> Malone, Linda A. _Environmental Regulation of Land Use_, §11.06[2], as summarized in "Guidelines for Drafting Municipal Noise Control Ordinances," FindLaw.
29. <span id="ref-29"></span><EvidenceChip tier="evidence" /> "Enforcement and Learning Under Rules and Standards." Cambridge University Press, 2026.
