"""After npm run build, produce a single-file version for local play."""
from pathlib import Path
import base64
import re

root = Path(__file__).resolve().parent.parent
html = (root / 'dist/index.html').read_text()
for match in list(re.finditer(r'<script[^>]+src="([^"]+)"[^>]*></script>', html)):
    js = (root / 'dist' / match.group(1).lstrip('/')).read_text()
    paths = sorted(set(re.findall(r'/media/(?:angles/[a-z0-9]+/[0-9]+\.jpg|videos/(?:classic/)?[a-zA-Z0-9_-]+\.(?:mp4|webm|jpg|png))', js)))
    for path in paths:
        data = base64.b64encode((root / 'public' / path.lstrip('/')).read_bytes()).decode()
        mime={'.mp4':'video/mp4','.webm':'video/webm','.jpg':'image/jpeg','.png':'image/png'}[Path(path).suffix]
        js = js.replace(path, 'data:'+mime+';base64,' + data)
    html = html.replace(match.group(0), '<script type="module">' + js.replace('</script', '<\\/script') + '</script>')
for match in list(re.finditer(r'<link[^>]+href="([^"]+\.css)"[^>]*>', html)):
    css = (root / 'dist' / match.group(1).lstrip('/')).read_text()
    html = html.replace(match.group(0), '<style>' + css + '</style>')
(root / 'PLAY.html').write_text(html)
print('Created PLAY.html')
