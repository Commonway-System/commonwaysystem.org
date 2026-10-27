# Tribal agencies not yet added: blocked or unreachable

From the 2026-10-26 tribal transportation research (see `src/lib/data/agencies/us/*-tribal.ts`). These tribes probably have a roads or transportation office, but their own site could not be read without getting past a bot check or an invalid certificate, so no entry was added. Nothing here was bypassed. Add one with `/add-agency` once a way to read the page is found, or paste the page text.

## Bot check or 403
- Native Village of Kotzebue (kotzebueira.org): Transportation Director and roads resources page per search results; 403 in fetch and the Browser pane.
- Nome Eskimo Community (necalaska.org): 403.
- Swinomish Indian Tribal Community (swinomish-nsn.gov): 403; a transportation plan exists per search results.
- Mohegan Tribe (mohegan.nsn.us): 403.
- Koi Nation (koinationsonoma.com): 403.
- Havasupai Tribe (havasupai-nsn.gov): 403.
- San Manuel Band / Yuhaaviatam (sanmanuel-nsn.gov): 403.
- Quartz Valley Indian Community (qvir.com): Cloudflare bot check.
- Ute Mountain Ute Tribe (utemountainutetribe.com): Sucuri bot check.
- Chitimacha Tribe (chitimacha.gov): Sucuri challenge; a Public Works page exists (pwinfo@chitimacha.gov, 337-923-9126) but doesn't say whether it covers roads.
- Nottawaseppi Huron Band of the Potawatomi (nhbp-nsn.gov): 403.
- Miccosukee Tribe (miccosukee.com): 403.
- Kodiak Area Native Association (kanaweb.org redirects to kodiakhealthcare.org): 403.
- Bridgeport Indian Colony: Cloudflare check.

## Certificate error or server error
- Ohkay Owingeh (ohkay.org/roads-and-transportation/): expired certificate; a Road Crew sits under Planning per search results, Public Works 505-852-4400.
- Eastern Band of Cherokee Indians (ebci.com): expired certificate; "Tribal Construction & Road Maintenance" page at ebci.com/?p=6407 per search results.
- Pechanga Band (pechanga-nsn.gov): HTTP 500; Facilities and Public Works page covers roads per search results.
- Tunica-Biloxi Tribe (tunica.org): certificate mismatch.
- Monacan Indian Nation (monacannation.com): certificate error.
- Berry Creek Rancheria (berrycreekrancheria.com): certificate mismatch.
- Craig Tribal Association (craigtribe.org): certificate mismatch.
- Cabazon Band (cabazonindians.com): TLS error.
- Houlton Band of Maliseet (maliseets.com): certificate mismatch.
- Middletown Rancheria: HTTP 525.
- Cook Inlet Tribal Council (citci.org): HTTP 526.
- Upper Sioux Community: HTTP 526 on one attempt (a later attempt worked).
- Catawba Indian Nation (catawbaindian.net): connection timeout; catawba.com works but shows only a transit program. A Department of Transportation (CINDOT) is described in a search snippet.
- Mississippi Band of Choctaw (choctaw.org): a directory PDF could not be read and may list a Tribal Roads office.
- Tazlina (tazlina.org): HTTP 500; runs its own road maintenance and plowing per third-party sources.

## No official site found
Oglala Sioux Tribe (a Transportation department phone, (605) 867-5376, appears only in old federal material), Crow Creek, Little Shell, Chippewa Cree, Tonawanda Seneca, Tuscarora, Unkechauge, Passamaquoddy Pleasant Point, Jicarilla Apache (roads program documented only by FHWA), Yomba, Tonto Apache, Moapa, Skull Valley, and many Alaska villages and California rancherias. Also several Oklahoma tribes (Loyal Shawnee, Ottawa, Thlopthlocco, Euchee, Kialegee, Kickapoo, Seneca-Cayuga redirect).

## Left out on purpose (not a block)
Offices that don't clearly cover roads: Cocopah and Las Vegas Paiute public works, Pascua Yaqui (only a manager's phone), Hannahville, Oneida Nation (WI), Prairie Island, Chitimacha Public Works, Sauk-Suiattle Transit, Catawba transit, Seldovia ferry, Ninilchik BUMPS bus, Kenaitze (Kahtnu Area Transit) and Gulkana (Soaring Eagle Transit), Northfork Tribal Transit, CSKT transit, Turtle Mountain transit. Add any of these if transit-only offices should include one with a verified contact.
