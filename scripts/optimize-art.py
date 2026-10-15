from lxml import etree as E
from pathlib import Path
from PIL import Image
from io import BytesIO
import base64,hashlib
cache={}
for p in (Path(__file__).resolve().parents[1]/'public/art').glob('*.svg'):
 r=E.parse(str(p),E.XMLParser(huge_tree=True));changed=False
 for e in r.findall('.//{http://www.w3.org/2000/svg}image'):
  k='{http://www.w3.org/1999/xlink}href' if e.get('{http://www.w3.org/1999/xlink}href') else 'href';h=e.get(k)
  if not h:continue
  digest=hashlib.sha256(h.encode()).hexdigest()
  if digest not in cache:
   im=Image.open(BytesIO(base64.b64decode(h.split(',')[1]))).convert('RGBA');out=BytesIO();im.save(out,format='PNG',optimize=True,compress_level=9);cache[digest]='data:image/png;base64,'+base64.b64encode(out.getvalue()).decode()
  e.set(k,cache[digest]);changed=True
 if changed:r.write(str(p),encoding='utf-8')
 print(p.name,p.stat().st_size)
