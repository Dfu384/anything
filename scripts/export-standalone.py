"""After npm run build, produce a single-file version for local play."""
from pathlib import Path
import base64
import re

root = Path(__file__).resolve().parent.parent
html = (root / 'dist/index.html').read_text()
for match in list(re.finditer(r'<script[^>]+src="([^"]+)"[^>]*></script>', html)):
    js = (root / 'dist' / match.group(1).lstrip('/')).read_text()
    for name in ['fruit', 'baboon', 'building']:
        data = base64.b64encode((root / f'public/media/{name}.jpg').read_bytes()).decode()
        js = js.replace(f'/media/{name}.jpg', 'data:image/jpeg;base64,' + data)
    html = html.replace(match.group(0), '<script type="module">' + js.replace('</script', '<\\/script') + '</script>')
for match in list(re.finditer(r'<link[^>]+href="([^"]+\.css)"[^>]*>', html)):
    css = (root / 'dist' / match.group(1).lstrip('/')).read_text()
    html = html.replace(match.group(0), '<style>' + css + '</style>')
(root / 'PLAY.html').write_text(html)
print('Created PLAY.html')
