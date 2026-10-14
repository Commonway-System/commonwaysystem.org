/**
 * Self-assessment of commonwaysystem.org against the Website Specification
 * checklist (https://specification.website/checklist/). /about/website-audit/
 * renders this file and recalculates every score from it, so editing a row
 * here is the whole job: change its status and note, and bump AUDIT_DATE.
 *
 * Status: pass | partial | fail | na (not applicable) | unchecked (not yet reviewed)
 * Scoring: Required/Avoid = 3, Recommended = 2, Optional = 1. Pass = full
 * points, partial = half, fail = 0. N/A and unchecked rows are left out.
 * For "Avoid" rows, pass means the publication does not do the thing.
 *
 * Notes are reader-facing (they render on the page): plain language, no
 * em-dashes, "the publication" for self-reference (see CLAUDE.md).
 */
export type Tier = 'Required' | 'Recommended' | 'Optional' | 'Avoid'
export type Status = 'pass' | 'partial' | 'fail' | 'na' | 'unchecked'

export interface AuditItem {
  category: string
  name: string
  tier: Tier
  status: Status
  note: string
}

export const AUDIT_DATE = '2026-10-14'
export const CHECKLIST_URL = 'https://specification.website/checklist/'

type Row = [string, Tier, Status, string]

const R = 'Required' as const
const C = 'Recommended' as const
const O = 'Optional' as const
const A = 'Avoid' as const

const sections: Record<string, Row[]> = {
  'Foundations': [
    ['The HTML doctype', R, 'pass', 'Every prerendered page starts with <!doctype html>.'],
    ['The lang attribute on <html>', R, 'pass', 'lang="en" on every page.'],
    ['<meta charset>', R, 'pass', 'UTF-8, declared first in <head>.'],
    ['<meta viewport>', R, 'pass', 'width=device-width, initial-scale=1 on every page. Zoom is never disabled.'],
    ['The <title> element', R, 'pass', 'One title per page, "Page title · Commonway System", from each page\'s frontmatter.'],
    ['<meta name="description">', C, 'pass', 'Every page has a description from its frontmatter, also used for Open Graph and search engines.'],
    ['Canonical URL (rel="canonical")', C, 'pass', 'Every page names its own trailing-slash address as canonical. The text-only copies point back to the full page.'],
    ['Favicons and app icons', C, 'pass', 'SVG favicon, a favicon.ico fallback (16, 32 and 48 px), an Apple touch icon, and 192, 512 and maskable icons in the web manifest, all from the Commonway mark.'],
    ['<meta name="theme-color">', C, 'pass', 'Paper (#fdfaf3) in light mode and ink (#141414) in dark mode.'],
    ['<meta name="color-scheme">', C, 'pass', 'light dark, so browser-drawn controls and scrollbars match either theme.'],
    ['Open Graph protocol', C, 'pass', 'og:title, description, url, type, site_name, locale and image (with alt text) on every page, plus Twitter card tags. Pages with an illustration use it; the rest share a 1200 x 630 Commonway card.'],
    ['Feed discovery with rel="alternate"', C, 'pass', 'The Blog feed (/rss.xml) is linked from every page\'s <head> and from the Link header.'],
    ['Feed content hygiene', C, 'pass', 'RSS 2.0 with absolute links, permalink GUIDs, publication dates, descriptions and a self link, built from the same list as the Blog index.'],
    ['Popover API', C, 'pass', 'The Display settings ("Aa") panel is a popover: it sits in the top layer and closes on Escape or a click outside, with focus returned to its button, all handled by the browser.'],
    ['WebSub: push notification for feeds', O, 'na', 'The Blog posts rarely; a hub adds nothing.'],
    ['CSS anchor positioning', C, 'pass', 'The Display settings panel lines up with its button using anchor-name and anchor(), and flips sideways if it would run off-screen. A progressive enhancement: other browsers place it below the navbar.'],
    ['Balanced text wrapping', C, 'pass', 'text-wrap: balance on headings and captions, pretty on paragraphs and list items.'],
    ['CSS container queries', C, 'pass', 'The author photo block on The Commonway System page stacks according to its own width, not the window\'s.'],
    ['Invoker commands', O, 'pass', 'The Aa button opens the Display settings popover with commandfor and command="toggle-popover". Browsers without invoker commands use a small click handler instead.'],
    ['_for-sale DNS records', O, 'na', 'The domain is not for sale.'],
  ],
  'SEO': [
    ['robots.txt', C, 'pass', 'Served at /robots.txt with a Sitemap line. Only the search index\'s data files are disallowed.'],
    ['XML sitemaps', C, 'partial', 'Generated at /sitemap.xml from every page at build time. Every <lastmod> is the build date rather than each page\'s own last change, which makes it a weak freshness signal.'],
    ['Sitemap index files', C, 'na', 'About 170 URLs, far below the 50,000 a single sitemap can hold.'],
    ['Image and video sitemap extensions', O, 'pass', 'The sitemap lists each page\'s featured illustration with the image extension. The publication hosts no video.'],
    ['URL structure', C, 'pass', 'Lowercase, hyphenated, readable, organized by section (/patterns/collectors/default/), always with a trailing slash.'],
    ['Redirects (301/302/308)', R, 'pass', 'Live: http:// and www. go to https://commonwaysystem.org/ with 301s, addresses without a trailing slash 301 to the slash form, and the retired Commercial Arterial page 301s to Stroad. http://www. takes two hops.'],
    ['Server-side rendering', C, 'pass', 'Every page is prerendered to complete static HTML at build time.'],
    ['Soft 404s', A, 'pass', 'Live: unknown addresses return a real 404 status.'],
    ['Meta robots and X-Robots-Tag', R, 'pass', 'Every page states its robots rule: index, follow (with max-image-preview:large) for content pages, noindex for search, the error page and the text-only copies. Markdown copies carry X-Robots-Tag: noindex.'],
    ['Heading hierarchy', R, 'pass', 'One h1 per page and no skipped levels, checked with axe on all 165 pages in the 2026.09.26 accessibility audit.'],
    ['Internal linking', C, 'pass', 'A sidebar per section, Related patterns and Retrofit path links on pattern pages, previous/next links, a Site Map, and descriptive link text throughout. No orphan pages: the build warns if a page is missing from the navigation.'],
    ['Structured data (JSON-LD)', C, 'pass', 'Organization and WebSite on every page; TechArticle (with the Pattern ID as identifier), CollectionPage, AboutPage, Blog and BlogPosting per page type; author markup.'],
    ['Breadcrumbs', C, 'pass', 'BreadcrumbList structured data on every page below the homepage, built from the sidebar.'],
    ['IndexNow', O, 'pass', 'Cloudflare Crawler Hints is on (2026.10.14). It sends IndexNow notifications to participating search engines (Bing, Yandex and others) when pages change, and hosts the key itself.'],
  ],
  'Accessibility': [
    ['Colour contrast', R, 'pass', 'axe-core reported no contrast failures on all 165 pages in light and dark mode, desktop and phone width (2026.09.26 audit). New pieces since then (search, Display settings, cookie notice, this page) were scanned the same way. Ratios are computed, not eyeballed, and recorded in the Brand Guide.'],
    ['Automatic contrasting colour', O, 'fail', 'contrast-color() is not used; every text color is chosen and checked by hand.'],
    ['Forced colours mode', C, 'partial', 'Badges, chips, cards and pills get outlines when Windows High Contrast (forced colors) replaces their fills; color swatches keep their true colors. Not yet tested in a real forced-colors session.'],
    ['Image alt text', R, 'pass', 'Every image has alt text, or alt="" when it is decorative and a text label carries its meaning.'],
    ['Form labels', R, 'pass', 'The search box, Media filters and every Display setting have visible, programmatically tied labels.'],
    ['Keyboard navigation', R, 'partial', 'Every control is a real link, button or input in a logical order, menus and dialogs close with Escape, and search has Ctrl/Cmd+K. A full keyboard-only walkthrough by a person has not been done yet.'],
    ['Visible focus indicators', R, 'pass', 'A teal focus ring on every interactive element (well above 3:1 on both themes), plus an optional thicker yellow ring in Display settings.'],
    ['Focus not obscured', C, 'pass', 'scroll-padding keeps focused elements clear of the sticky navbar, the phone "On this page" bar and the cookie notice.'],
    ['Skip links', R, 'pass', '"Skip to main content" is the first focusable element on every page and moves focus into <main>.'],
    ['The inert attribute', C, 'pass', 'The search dialog is a modal <dialog>, which makes the rest of the page inert. On phones, the page behind the open menu drawer is marked inert.'],
    ['Semantic HTML and landmarks', R, 'pass', 'header, labelled nav and aside regions, main and footer navigation on every page.'],
    ['ARIA: first rule of ARIA', C, 'pass', 'Native elements first (button, details, dialog, popover); ARIA only for names and states. axe ARIA checks pass.'],
    ['Descriptive link text', R, 'pass', 'Links name their destination; no "click here". External links add "(opens in new tab)" for screen readers.'],
    ['Empty links and buttons', A, 'pass', 'No unnamed links or buttons (axe link-name and button-name pass); icon-only buttons have labels.'],
    ['Accessible form errors', R, 'na', 'The publication has no forms that submit or can fail validation.'],
    ['Status messages', C, 'pass', 'Search result counts are announced through a status region.'],
    ['Accessible authentication', C, 'na', 'No accounts or sign-in.'],
    ['Redundant entry', C, 'na', 'No multi-step processes.'],
    ['Consistent help', C, 'pass', 'Every page\'s footer links to Report a Problem, the Site Map and the policies, in the same order.'],
    ['Document and parts language', R, 'pass', 'English throughout, declared on <html>.'],
    ['Reduced motion', R, 'pass', 'Under prefers-reduced-motion the hero is still, page transitions are skipped and smooth scrolling is off. The hero animation also has a Pause button for everyone.'],
    ['Accessibility overlays', A, 'pass', 'No overlay widget. Display settings are built into the publication and change its own CSS.'],
    ['Captions and transcripts', R, 'na', 'The publication hosts no audio or video. The Media Gallery links out to each creator\'s own page.'],
    ['Accessible data tables', R, 'pass', 'Tables use real header cells; the guidance tables also have row headers. Wide tables scroll inside their own box instead of changing the table\'s display.'],
    ['Touch target size', R, 'pass', 'Targets are at least 24 x 24 CSS pixels; citation badges keep a small look with a 24px hit area.'],
    ['Dragging movements', C, 'na', 'Nothing on the publication needs dragging.'],
    ['Hidden until found', C, 'pass', 'Collapsed content uses native <details>, which browsers open for find-in-page. Simplified view opens every one.'],
    ['Mobile-friendly form inputs', C, 'pass', 'The search box is type="search" with enterkeyhint="search" and no autocorrect.'],
    ['Native interactive elements', C, 'pass', 'Every control is a real <button>, <a>, <input>, <details> or <dialog>.'],
    ['CSS state and relational selectors', C, 'pass', ':has(), :focus-visible and :focus-within style the Display settings and search controls by state.'],
  ],
  'Security': [
    ['HTTPS and TLS', R, 'pass', 'Live: TLS through Cloudflare (Full strict to Netlify), and every http:// address redirects to https://.'],
    ['HSTS (Strict-Transport-Security)', R, 'pass', 'max-age=31536000 with includeSubDomains (includeSubDomains added in this release). Not on the browser preload list.'],
    ['Mixed content and upgrade-insecure-requests', C, 'pass', 'Pages load nothing over http://, and the Content Security Policy includes upgrade-insecure-requests.'],
    ['Content Security Policy (CSP)', C, 'partial', 'A CSP limits scripts, images and connections to the publication itself plus two named outside sources (Google Analytics after consent and Cloudflare\'s Web Analytics beacon), with frame-ancestors, object-src \'none\' and base-uri. It still allows inline scripts, which the static framework output needs.'],
    ['Reporting API (Reporting-Endpoints)', C, 'fail', 'No reporting endpoint. Cloudflare adds its own network-error reporting, which reports to Cloudflare, not to the publication.'],
    ['/.well-known/security.txt', C, 'pass', 'Published with an email contact, the Report a Problem page, an expiry date and a canonical address. The expiry (2027-10-01) needs renewing each year.'],
    ['X-Content-Type-Options: nosniff', R, 'pass', 'Sent on every response.'],
    ['Clickjacking protection (frame-ancestors / X-Frame-Options)', R, 'pass', 'CSP frame-ancestors \'self\' and X-Frame-Options: SAMEORIGIN.'],
    ['Fetch Metadata request headers', C, 'na', 'A static publication with no server code to read them.'],
    ['Cross-origin isolation (COOP / COEP / CORP)', C, 'pass', 'Cross-Origin-Opener-Policy and Cross-Origin-Resource-Policy are same-origin, and Cross-Origin-Embedder-Policy is credentialless, so pages are cross-origin isolated. Checked on a local build with the real headers: search, every image and Google Analytics after Accept still load. The Cloudflare beacon is added at the edge, so it can only be confirmed live.'],
    ['Referrer-Policy', C, 'pass', 'strict-origin-when-cross-origin.'],
    ['Permissions-Policy', C, 'pass', 'Camera, microphone, location, payment, USB, motion sensors and ad-interest features are all off.'],
    ['Subresource Integrity (SRI)', C, 'na', 'No third-party script or stylesheet tags in the HTML. Google Analytics is added by script only after consent, and Google changes that file without notice, so it can\'t be pinned with a hash.'],
    ['Digest Fields (Content-Digest, Repr-Digest and Unencoded-Digest)', O, 'fail', 'Not used.'],
    ['Trusted Types', C, 'fail', 'Not enforced.'],
    ['X-XSS-Protection', A, 'pass', 'Not sent.'],
    ['Cookie attributes: Secure, HttpOnly, SameSite', R, 'pass', 'The publication sets no cookies of its own. Google Analytics sets its cookies only after consent, with SameSite=Lax and Secure, and they are deleted if consent is withdrawn. Settings live in the browser\'s local storage.'],
    ['Clear-Site-Data', O, 'na', 'No accounts, so no sign-out.'],
    ['DNS CAA records', C, 'pass', 'Live since 2026.10.14: CAA records limit certificates to the authorities Cloudflare uses (Let\'s Encrypt, Google Trust Services, SSL.com, Sectigo, DigiCert), for the domain and wildcards. Let\'s Encrypt also covers Netlify\'s certificate behind Cloudflare.'],
    ['DNSSEC', O, 'pass', 'Live since 2026.10.14: the zone is signed by Cloudflare and the DS record is published at the .org registry, so validating resolvers return authenticated answers (the ad flag).'],
  ],
  'Well-Known URIs': [
    ['Well-known URIs', C, 'pass', 'security.txt, gpc.json, api-catalog, traffic-advice, tdmrep.json, ai-catalog.json and the Agent Skills index are published under /.well-known/.'],
    ['/.well-known/change-password', O, 'na', 'No accounts.'],
    ['/.well-known/webauthn', O, 'na', 'No passkeys.'],
    ['/.well-known/openid-configuration', O, 'na', 'Not an identity provider.'],
    ['/.well-known/oauth-authorization-server', O, 'na', 'Not an OAuth server.'],
    ['/.well-known/oauth-protected-resource', O, 'na', 'No protected API.'],
    ['/.well-known/gpc.json', O, 'pass', 'Published, and the cookie notice treats a Global Privacy Control signal as Decline.'],
    ['/.well-known/api-catalog', C, 'pass', 'A linkset listing the sitemap, the Blog feed, the llms files, the Agent Skills index, the AI Catalog, the OKF bundle and the schemamap. The publication has no APIs of its own.'],
    ['/.well-known/webfinger', O, 'na', 'Not a federated service.'],
    ['/.well-known/apple-app-site-association', O, 'na', 'No iOS app.'],
    ['/.well-known/assetlinks.json', O, 'na', 'No Android app.'],
    ['/.well-known/nodeinfo', O, 'na', 'Not a federated service.'],
    ['/.well-known/traffic-advice', O, 'pass', 'Published, allowing privacy-preserving prefetch proxies.'],
  ],
  'Agent Readiness': [
    ['Agent readiness', C, 'pass', 'Stable URLs, JSON-LD (also per page as .jsonld), the llms files, a Markdown copy of every page, an OKF bundle, an Agent Skill, an AI Catalog, explicit AI-crawler rules and discovery Link headers are all in place.'],
    ['/llms.txt', C, 'pass', 'Generated from every page\'s frontmatter, grouped by section, each link pointing at the page\'s Markdown copy.'],
    ['/llms-full.txt', O, 'pass', 'The whole guidebook as one Markdown file, regenerated on every build.'],
    ['Per-page Markdown source endpoints', C, 'pass', 'Every page is also available as Markdown at its address plus .md (for example /patterns/collectors/default.md and /index.md), advertised with <link rel="alternate" type="text/markdown">.'],
    ['robots.txt for AI crawlers', C, 'pass', 'AI crawlers (GPTBot, ClaudeBot, Google-Extended, PerplexityBot, CCBot and others) are named and allowed. The guidebook is public, and being learned from and cited is part of its purpose.'],
    ['Content Signals in robots.txt', O, 'pass', 'search=yes, ai-input=yes, ai-train=yes.'],
    ['TDM reservation (TDMRep)', O, 'pass', '/.well-known/tdmrep.json states that no text and data mining rights are reserved, matching ai-train=yes.'],
    ['Web Bot Auth: verifiable bot identity', O, 'na', 'The publication runs no bots.'],
    ['auth.md: agent registration instructions', O, 'na', 'No accounts or agent-facing API.'],
    ['Stable URLs', R, 'pass', 'Addresses don\'t change once published; a retired page gets a 301 to its replacement, and Pattern IDs are never reused.'],
    ['Structured data for agents', C, 'pass', 'Typed JSON-LD on every page, including each pattern\'s Pattern ID.'],
    ['Machine-readable formats', C, 'pass', 'Markdown and JSON-LD copies of every page, text-only copies, an OKF bundle, sitemap.xml with images, schemamap.xml, an RSS feed, the llms files and an Agent Skill.'],
    ['HTTP Link headers for discovery', C, 'pass', 'Every response carries Link headers for the sitemap, feed, llms.txt, api-catalog, AI Catalog and Agent Skills index.'],
    ['MCP and tool discovery', O, 'na', 'No tools to expose.'],
    ['A2A agent cards', O, 'na', 'No agents.'],
    ['Agent Skills discovery', C, 'pass', '/.well-known/agent-skills/index.json lists one skill (commonway-system/SKILL.md), with a sha256 digest computed at build time. It explains the Pattern ID scheme, statuses and evidence tiers, and where to read each page.'],
    ['DNS for AI Discovery (DNS-AID)', O, 'pass', 'Live since 2026.10.14: an HTTPS record at _index._agents.commonwaysystem.org (priority 1, target commonwaysystem.org, alpn h3,h2, port 443), signed with DNSSEC and validated by public resolvers. No _mcp or _a2a records, since the publication runs neither.'],
    ['Agentic Resource Discovery (ARD)', O, 'pass', '/.well-known/ai-catalog.json lists the two agent resources the publication actually has, the Agent Skill and the OKF bundle, each with representative queries. Found through an Agentmap line in robots.txt and a rel="ai-catalog" Link header. There is no MCP server or agent to list.'],
    ['NLWeb: conversational interface discovery', O, 'na', 'No conversational endpoint.'],
    ['WebMCP: browser-native tools for agents', O, 'na', 'No in-page tools for agents.'],
    ['Open Knowledge Format (OKF) bundle', O, 'pass', 'The whole guidebook as an OKF v0.2 bundle, regenerated every build: one concept per page with typed front matter (patterns carry their Pattern ID and status), each page\'s references as sources with their evidence tier, one mirrored concept per cited work (about 300), folder indexes and a change log. Browsable at /okf/index.md or as one download, /okf.tar.gz; linked from llms.txt, the AI Catalog and the api-catalog.'],
    ['Schemamap: discoverable JSON-LD endpoints per resource', O, 'pass', 'Every page\'s structured data is also published on its own at its address plus .jsonld (for example /patterns/collectors/default.jsonld), identical to what the page embeds, and indexed with its schema.org types in /schemamap.xml. Each page links to both from its <head>.'],
  ],
  'Performance': [
    ['Core Web Vitals (LCP, INP, CLS)', R, 'pass', 'Lighthouse lab test on the live publication (mobile, simulated slow 4G, two runs each, 2026.10.14) on the homepage, a pattern page, Design Speed and this page: LCP 1.0 to 1.3 s, CLS 0.03 to 0.09, no blocking time, performance scores 98 to 100. Before this release the same pages measured LCP 3.6 to 4.9 s. Lab data only; no field (Chrome UX Report) data yet.'],
    ['Image optimisation', R, 'pass', 'Images are served as WebP at the size they\'re shown: 160 and 480 px copies for cards and search results, 768 and 1280 px copies through srcset for the Foundations diagrams (a fifth of the original PNGs\' weight). Images carry width and height or an aspect ratio, so nothing shifts as they load. Full-size PNG originals are only used for social previews.'],
    ['Lazy loading images, iframes, and video', C, 'pass', 'Card, gallery and diagram images use loading="lazy" and decoding="async". The homepage hero is a canvas, so no image competes for first paint.'],
    ['Preload, prefetch, preconnect', C, 'pass', 'Module preloads for each page\'s code, data preloading on hover, and Speculation Rules prefetch. Everything on the critical path is same-origin, so no preconnect is needed.'],
    ['103 Early Hints', O, 'pass', 'Early Hints is on in Cloudflare (2026.10.14). Cloudflare sends a 103 response from the preload and preconnect Link headers it has seen for a page; the publication\'s critical files are all same-origin and fingerprinted, so there is little to hint today.'],
    ['Cache-Control headers', R, 'pass', 'Fingerprinted code and styles are cached for a year as immutable; images for a month; HTML is revalidated on every visit so updates show at once.'],
    ['Vary: the cache key contract', C, 'pass', 'Live: Vary: Accept-Encoding on compressed responses.'],
    ['Conditional requests (ETag, Last-Modified, 304)', C, 'partial', 'Static files carry ETags. HTML pages come through Cloudflare without an ETag or Last-Modified, so they always return in full.'],
    ['No-Vary-Search response header', C, 'pass', 'No-Vary-Search: params, since a query string never changes a static page. A prefetched /search/ or /media/ page is reused whatever its query.'],
    ['Compression (gzip, brotli, zstd)', R, 'pass', 'Live: Brotli for HTML, CSS, JavaScript and text.'],
    ['Web font loading', C, 'pass', 'All fonts are self-hosted variable files with font-display: swap and per-language subsets. The three optional reading fonts only download if a reader picks one.'],
    ['Critical CSS and render-blocking resources', C, 'pass', 'Every page\'s styles are inlined into its HTML, so no stylesheet request blocks first paint; Lighthouse reports no render-blocking resources. Fonts load without blocking text (font-display: swap).'],
    ['Script loading: defer, async, module', C, 'pass', 'All code loads as ES modules (deferred by default). The one small inline script applies saved display settings before first paint, on purpose.'],
    ['HTTP/2 and HTTP/3', C, 'pass', 'Live: HTTP/2, with HTTP/3 advertised.'],
    ['HTTP/1.1 workarounds: sharding, sprites, and bundling', A, 'pass', 'No domain sharding or image sprites; code is split per page.'],
    ['Speculation Rules', C, 'pass', 'Same-site links are prefetched on moderate intent (hover or pointer-down). Markdown copies, text-only pages and the search index are excluded.'],
    ['Resource hints overview', C, 'pass', 'Module preloads and Speculation Rules only; nothing is hinted that a page doesn\'t use.'],
    ['View Transitions', O, 'pass', 'Moving between pages cross-fades with the View Transitions API. Skipped under reduced motion and in Simplified view.'],
    ['Back/forward cache (BFCache)', C, 'pass', 'No unload handlers and no Cache-Control: no-store, so pages are eligible. Not confirmed in a browser\'s BFCache test panel.'],
    ['Visibility-aware rendering', O, 'pass', 'The homepage hero animation stops drawing while it is scrolled out of view or the tab is hidden.'],
    ['CSS containment', O, 'fail', 'Not used.'],
    ['Scroll-driven animations', O, 'fail', 'Not used.'],
    ['Scrollbar gutter', C, 'pass', 'scrollbar-gutter: stable on <html>, so pages don\'t shift when a scrollbar appears.'],
    ['Dynamic viewport units (dvh, svh, lvh)', C, 'pass', 'The Display settings panel sizes itself with dvh (100vh as a fallback), so mobile toolbars don\'t cut it off.'],
    ['Compression Dictionary Transport', O, 'fail', 'Not used.'],
    ['Server-Timing header', O, 'na', 'No server code to time.'],
  ],
  'Privacy': [
    ['Privacy policy', R, 'pass', 'The Privacy Policy is linked from every page\'s footer and names every service involved.'],
    ['Cookie consent', R, 'pass', 'Google Analytics loads only after a reader chooses Accept. Accept and Decline look the same, nothing is pre-selected, and the footer\'s "Cookie settings" reopens the choice.'],
    ['Global Privacy Control (GPC)', C, 'pass', 'A GPC signal counts as Decline unless the reader opts in from Cookie settings.'],
    ['Third-party scripts and privacy', C, 'partial', 'Google Analytics loads only after consent. Cloudflare adds its cookieless Web Analytics beacon to every page. Fonts, channel icons and preview images are all hosted by the publication itself. Both outside services are named in the Privacy Policy.'],
    ['Storage Access API', O, 'na', 'No embedded cross-site content that needs cookies.'],
    ['Privacy-respecting analytics', C, 'pass', 'Cloudflare Web Analytics gives cookieless, aggregate page counts for every visitor; Google Analytics, which uses cookies, runs only for readers who accept it.'],
    ['Data minimisation', C, 'pass', 'No accounts, forms or tracking beyond consented analytics. Search runs in the browser and sends nothing anywhere. Settings stay in the reader\'s browser.'],
  ],
  'Resilience': [
    ['Custom error pages (404, 500)', R, 'pass', 'A custom "Page not found" page with the normal navigation, a search link and links to every section, served with a real 404 status. It needs JavaScript to show its content; without it the navigation still appears.'],
    ['Maintenance pages and 503', C, 'na', 'Static hosting with atomic deploys: there is never a maintenance window.'],
    ['Graceful degradation when JavaScript fails', C, 'pass', 'Every page\'s content, navigation and links are in the prerendered HTML. Search, Display settings and filters need JavaScript, and every page has a text-only copy.'],
    ['Offline support and service workers', O, 'fail', 'No service worker.'],
    ['Web app manifest', C, 'pass', 'manifest.webmanifest with name, description, colors and icons, including a maskable one.'],
    ['Monitoring and uptime', C, 'fail', 'No external uptime monitoring yet.'],
    ['Deprecation and Sunset', O, 'na', 'No API.'],
    ['Redirect-By header', C, 'pass', 'Live since 2026.10.14: every redirect carries Redirect-By: Netlify (http:// to https://, www. to the bare domain, missing trailing slashes, and retired pages). Netlify issues the redirects but can\'t add headers to them, so a Cloudflare response header rule adds it to 301, 302, 307 and 308 responses.'],
  ],
  'Internationalisation': [
    ['International URL structure', C, 'na', 'English only.'],
    ['hreflang for language and regional URLs', C, 'na', 'English only.'],
    ['Localised page metadata', C, 'na', 'English only.'],
    ['hreflang in XML sitemaps', O, 'na', 'English only.'],
    ['Avoid automatic IP-based language redirects', A, 'pass', 'No such redirects.'],
    ['lang attribute on inline content', R, 'pass', 'No passages in other languages. Dutch terms such as "woonerf" are loanwords used in English.'],
    ['translate attribute for untranslatable content', O, 'pass', 'Pattern IDs, Retrofit Strategy IDs and the Commonway System name in the footer are marked translate="no", so a translated page keeps them intact.'],
    ['Language switcher', C, 'na', 'English only.'],
    ['RTL and bidirectional text', C, 'na', 'No right-to-left content.'],
    ['Writing modes and CJK line breaking', O, 'na', 'No vertical or CJK text.'],
    ['Locale-aware content', C, 'pass', 'Dates are written out ("October 14, 2026") and speeds are in mph, matching the US guidance the publication cites.'],
    ['Plural rules and grammatical number', C, 'pass', 'Generated counts use the right form ("1 result", "2 results").'],
    ['Internationalised Domain Names (IDN)', O, 'na', 'ASCII domain.'],
  ],
}

export const items: AuditItem[] = Object.entries(sections).flatMap(([category, rows]) =>
  rows.map(([name, tier, status, note]) => ({ category, name, tier, status, note })),
)

export const categories = Object.keys(sections)

const weight: Record<Tier, number> = { Required: 3, Avoid: 3, Recommended: 2, Optional: 1 }
const credit: Record<Status, number | null> = { pass: 1, partial: 0.5, fail: 0, na: null, unchecked: null }

export interface Score {
  earned: number
  possible: number
  percent: number
  counts: Record<Status, number>
  total: number
}

export function score(list: AuditItem[]): Score {
  const counts: Record<Status, number> = { pass: 0, partial: 0, fail: 0, na: 0, unchecked: 0 }
  let earned = 0
  let possible = 0
  for (const i of list) {
    counts[i.status]++
    const c = credit[i.status]
    if (c === null)
      continue
    earned += c * weight[i.tier]
    possible += weight[i.tier]
  }
  return { earned, possible, percent: possible ? (earned / possible) * 100 : 0, counts, total: list.length }
}
