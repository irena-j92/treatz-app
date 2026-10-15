from lxml import etree as E
from pathlib import Path
from copy import deepcopy
import re,sys
src=Path(sys.argv[1]);out=Path(__file__).resolve().parents[1]/'public/art';ns='http://www.w3.org/2000/svg';cache={}
def save(screen,name,indices,box,group=False):
 if screen not in cache:cache[screen]=E.parse(str(src/(screen+'.svg')),E.XMLParser(huge_tree=True)).getroot()
 root=cache[screen];parent=root[0] if group else root;ids={e.get('id'):e for e in root.iter() if e.get('id')};used=set();nodes=[deepcopy(parent[i]) for i in indices]
 def refs(e):
  for node in e.iter():
   for v in node.attrib.values():
    yield from re.findall(r'url\(#([^)]*)\)',v)
    if v.startswith('#'):yield v[1:]
 pending=[i for n in nodes for i in refs(n)]
 while pending:
  id=pending.pop()
  if id in used or id not in ids:continue
  used.add(id);pending.extend(refs(ids[id]))
 r=E.Element('{'+ns+'}svg',nsmap={None:ns,'xlink':'http://www.w3.org/1999/xlink'},viewBox=' '.join(map(str,box)),width=str(box[2]),height=str(box[3]),fill='none')
 if used:
  defs=E.SubElement(r,'{'+ns+'}defs')
  for id in sorted(used):defs.append(deepcopy(ids[id]))
 for node in nodes:r.append(node)
 E.ElementTree(r).write(str(out/(name+'.svg')),encoding='utf-8')
 print(name)
for name,i,box in [('treat-caramel',40,(34.39,258.726,56.68,34.92)),('treat-muffin',42,(123.185,253.286,57.09,43)),('treat-custard',44,(212.924,246.352,56.85,57.82)),('treat-cake',56,(34.39,341.28,56.48,53.47)),('treat-candy',58,(301.719,246.446,56.44,56.68))]:save('06',name,[i],box,True)
for name,i,box in [('cup-gold',62,(147,112,100,100)),('cup-bronze',64,(42,130,80,80)),('cup-silver',65,(272,130,80,80)),('avatar-mia',41,(66,389,34,34)),('avatar-leo',44,(66.5,445.5,34,34)),('avatar-ava',47,(68,504,32,32)),('avatar-noah',61,(66,560,34,34)),('avatar-tina',49,(63.5,613.5,40,40)),('avatar-sam',52,(66,676,34,29)),('avatar-max',59,(67,732,32,32))]:save('07',name,[i],box)
save('08','grocery-cart',[10],(269,99,84,84))
save('09','map-base',[1],(0,0,393,474),True)
save('09','dunkin-store',[3],(0,444,393,150),True)
save('09','brand-burgerking',[35,36,37],(305,344,27,30),True)
for name,i,box in [('deal-nike',9,(24,220,165,125)),('deal-smeg',14,(201,220,165,125)),('deal-third',26,(378,220,165,125)),('brand-nike',16,(37.5,317.5,51,51)),('brand-smeg',19,(214.5,317.5,51,51)),('brand-shell',46,(35.1731,555.127,57.4623,53.5548)),('brand-ubereats',51,(125.699,555.301,53.2058,53.2058)),('brand-dunkin',56,(214.096,577.104,53.2058,9.60198)),('brand-hm',61,(302.491,564.348,53.21,35.1131)),('brand-zara',66,(37,706.913,52,21.8833)),('brand-doordash',71,(120.8,686.655,62.4,62.4)),('brand-tacobell',76,(219.16,691.772,43.68,52.1658)),('brand-seveneleven',81,(293.08,697.087,73.84,41.535))]:save('10',name,[i],box,True)

save('06','question-mark',[46],(143,351,24,29),True)
