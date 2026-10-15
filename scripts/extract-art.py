from lxml import etree as E
from pathlib import Path
from copy import deepcopy
import re,json
import sys
src=Path(sys.argv[1])
out=Path(__file__).resolve().parents[1]/'public/art';out.mkdir(exist_ok=True)
ns='http://www.w3.org/2000/svg'
def save(screen,name,indices,box):
 root=E.parse(str(src/(screen+'.svg'))).getroot();ids={e.get('id'):e for e in root.iter() if e.get('id')}; used=set()
 nodes=[deepcopy(root[i]) for i in indices]
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
 for n in nodes:r.append(n)
 E.ElementTree(r).write(str(out/(name+'.svg')),encoding='utf-8',xml_declaration=False)
 print(name,(out/(name+'.svg')).stat().st_size)
save('01','logo',[1,2,3],(110,398,173,60))
save('02','wheel',[*range(1,26),*range(27,30),31,*range(36,42)],(12,257,367,367))
save('02','wheel-pointer',[32,33,34],(166,234,60,76))
for screen,name,index,box in [
 ('03','coin-stack',13,(50,359,70,80)),('03','avatar',18,(318,127,42,42)),('03','donate',28,(25,484,60,60)),
 ('03','bolt',32,(24,64,30,30)),('03','flame',34,(116,64,30,30)),('03','trophy',36,(168,67,24,24)),('03','custard-small',38,(233,67,22,24)),
 ('03','cart',40,(24,605,84,84)),('04','coin',45,(171,217,50,50)),('04','badge-rookie',48,(40,658,50,50)),
 ('04','badge-skilled',50,(130,658,50,50)),('04','badge-expert',49,(218,658,50,50)),('04','badge-mastermind',23,(303,658,50,50)),
 ('04','achievement-loyalty',65,(28,820,54,55)),('04','achievement-challenge',64,(28,900,54,54)),('04','achievement-split',66,(28,978,54,54)),
 ('04','custard',67,(271,446,70,81)),('04','profile-bolt',57,(53,216,50,50)),('04','profile-trophy',40,(289,216,50,50)),
 ]:save(screen,name,[index],box)
for name,indices,box in [('home',[3],(39,25,27,27)),('budget',[5,6,7,8],(126,25,27,27)),('analytics',[10,11],(221,25,27,27)),('rewards',[13],(320,24,27,27))]:save('treatz-nav','nav-'+name,indices,box)
