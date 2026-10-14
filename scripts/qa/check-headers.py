# Flags any header that two matching static/_headers rules both set for the
# same built file. Netlify joins such headers into one comma list, which is
# invalid for Content-Type, CORS and similar. Also shows which rules set
# Cache-Control for a few sample paths. Run after `pnpm run build`:
#   python3 scripts/qa/check-headers.py
import os, re

rules, cur = [], None
for line in open('static/_headers'):
    if not line.strip() or line.strip().startswith('#'):
        continue
    if not line[0].isspace():
        cur = [line.strip(), []]
        rules.append(cur)
    else:
        cur[1].append(line.split(':', 1)[0].strip().lower())

def match(pat, path):
    return re.fullmatch(re.escape(pat).replace(r'\*', '.*'), path) is not None

dups = {}
for d, _, files in os.walk('build'):
    for f in files:
        path = '/' + os.path.relpath(os.path.join(d, f), 'build')
        seen = {}
        for pat, headers in rules:
            if match(pat, path):
                for h in headers:
                    seen[h] = seen.get(h, 0) + 1
        for h, n in seen.items():
            if n > 1:
                dups.setdefault(h, set()).add(path)

print('Headers set twice:', {h: (len(v), sorted(v)[:3]) for h, v in dups.items()} or 'none')
for path in ['/patterns/collectors/default/index.html', '/patterns/thumbs/loc-aly-02-alley-480.webp', '/_app/immutable/x.js']:
    print(path, '-> Cache-Control from', [p for p, hs in rules if match(p, path) and 'cache-control' in hs])
