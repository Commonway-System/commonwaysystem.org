---
title: "Modal filtering / Low Traffic Neighborhood retrofit"
description: "Installs a scattered set of point closures across a residential area, restricting motor vehicle through-traffic on interior streets while preserving full access for residents, deliveries, and emergency services, and full passage for pedestrians and bicyclists."
patternId: RFT-NET-01
date: 2026-09-03
llms: "Installs a scattered set of point closures across a residential area, restricting motor vehicle through-traffic on interior streets while preserving full local access and full pedestrian/bicycle passage, a Low Traffic Neighborhood."
---

<script>
  import { RetrofitCard, EvidenceChip, Citation } from '$lib/theme/components'
</script>

<RetrofitCard id={fm.patternId} title="Modal filtering / Low Traffic Neighborhood retrofit" scale="network">
Installs a scattered set of point closures across a residential area, restricting motor vehicle through-traffic on interior streets while preserving full access for residents, deliveries, and emergency services, and full passage for pedestrians and bicyclists.
</RetrofitCard>

## Overview

Rather than redesigning any single street, this retrofit changes how an entire area functions by selectively blocking through-driving routes at chosen points. The area's streets remain physically unchanged except at the closures themselves; what changes is which trips are still possible by car. A driver can still reach any address inside the filtered area, but can no longer use it as a shortcut between two points outside it.

## Where this leads: Target patterns

Unlike every Corridor and Intersection strategy, this doesn't produce a different destination pattern, it applies *within* an existing pattern or topology, changing a property (permeability) rather than replacing it. A filtered [Grid](/patterns/network/grid/) (NET-GRD-01) is still a Grid. It changes the network's effective permeability within whatever topology already exists. Grid is the most common context for this retrofit, since a grid's redundant routes are what make filtering possible without stranding any address. At the Local scale, filtered streets typically read as [Bicycle Boulevard / Neighborhood Greenway](/patterns/local-streets/bicycle-boulevard/) (LOC-BBG-12), built using the [Modal Filter / Point Closure](/patterns/elements/modal-filter-point-closure/) (ELM-MFP-44) element at each closure point.

## Applicability and thresholds

Requires enough route redundancy in the underlying network that closing a through-route doesn't strand any address or eliminate emergency access; a Grid or well-connected network is far more amenable to this retrofit than a Dendritic or cul-de-sac-heavy network, where fewer alternate routes exist.

## Evidence and effectiveness

Research on London's outer-borough Low Traffic Neighbourhoods, using the People and Places Survey, documents measurable reductions in car use and increases in active travel following modal filter installation, with over 25,000 modal filters already in place across the UK before 2020.<Citation index={1} /><Citation index={2} />

## Getting it built

Well suited to the early construction spectrum stages. A single filter can be demonstrated with planters, and an area-wide network of filters is commonly piloted before permanent bollards or curb reconstruction, since resident and emergency-service response to the full filtered network is easier to evaluate after living with a temporary version. See [Construction Methodology & The Build Spectrum](/guide/construction-methodology-spectrum/).

## Who can move this

Usually a city transportation or public works department decision, often following resident petition or a council-directed neighborhood traffic study, since the area-wide scope affects many residents at once. See [Legal & Planning Mechanisms](/guide/legal-planning-mechanisms/).

## Related retrofit strategies

[Superblock retrofit](/retrofits/network/superblock-retrofit/) (RFT-NET-02) (a related, more comprehensive area-wide approach that also reallocates the interior street space itself, not just its through-traffic access)

## References

1. <span id="ref-1"></span><EvidenceChip tier="evidence" /> Aldred, R. and Goodman, A., "Low Traffic Neighbourhoods, Car Use, and Active Travel: Evidence from the People and Places Survey of Outer London Active Travel Interventions," *Findings*, 2020.
2. <span id="ref-2"></span><EvidenceChip tier="precedent" /> "Identification of Plausible Low Traffic Neighbourhoods Using Open Data," *ScienceDirect*, definitions of modal filter, permeability, and filtered permeability.
