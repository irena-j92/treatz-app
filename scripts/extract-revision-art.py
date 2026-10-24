"""Extract isolated wheel, pastries, and boost art from revised SVG exports.

Usage: python scripts/extract-revision-art.py /absolute/path/to/svg-uploads
"""
from pathlib import Path
from copy import deepcopy
from io import BytesIO
import base64
import math
import re
import sys
from lxml import etree as E
from PIL import Image

SOURCE = Path(sys.argv[1])
OUTPUT = Path(__file__).resolve().parents[1] / 'public/art'
NS = 'http://www.w3.org/2000/svg'
XLINK = 'http://www.w3.org/1999/xlink'
CACHE = {}
BITMAP_CACHE = {}

def load(name):
    if name not in CACHE:
        CACHE[name] = E.parse(str(SOURCE / (name + '.svg')), E.XMLParser(huge_tree=True)).getroot()
    return CACHE[name]

def refs(node):
    for descendant in node.iter():
        for value in descendant.attrib.values():
            yield from re.findall(r'url\(#([^)]*)\)', value)
            if value.startswith('#'):
                yield value[1:]

def save(source, name, selections, box):
    root = load(source)
    ids = {node.get('id'): node for node in root.iter() if node.get('id')}
    nodes = []
    for selection in selections:
        node = root
        for index in selection:
            node = node[index]
        nodes.append(deepcopy(node))
    used = set()
    pending = [identifier for node in nodes for identifier in refs(node)]
    while pending:
        identifier = pending.pop()
        if identifier in used or identifier not in ids:
            continue
        used.add(identifier)
        pending.extend(refs(ids[identifier]))
    result = E.Element('{' + NS + '}svg', nsmap={None: NS, 'xlink': XLINK},
                       viewBox=' '.join(map(str, box)), width=str(box[2]), height=str(box[3]), fill='none')
    selected_ids = {node.get('id') for selected in nodes for node in selected.iter() if node.get('id')}
    if used - selected_ids:
        defs = E.SubElement(result, '{' + NS + '}defs')
        for identifier in sorted(used - selected_ids):
            defs.append(deepcopy(ids[identifier]))
    result.extend(nodes)
    for image in result.findall('.//{' + NS + '}image'):
        key = '{' + XLINK + '}href' if image.get('{' + XLINK + '}href') else 'href'
        href = image.get(key)
        if not href or not href.startswith('data:image/'):
            continue
        if href not in BITMAP_CACHE:
            bitmap = Image.open(BytesIO(base64.b64decode(href.split(',', 1)[1]))).convert('RGBA')
            data = BytesIO()
            bitmap.save(data, format='PNG', optimize=True, compress_level=9)
            BITMAP_CACHE[href] = 'data:image/png;base64,' + base64.b64encode(data.getvalue()).decode()
        image.set(key, BITMAP_CACHE[href])
    OUTPUT.mkdir(parents=True, exist_ok=True)
    destination = OUTPUT / (name + '.svg')
    E.ElementTree(result).write(str(destination), encoding='utf-8')
    print(name, box, destination.stat().st_size, flush=True)

wheel_indices = [*range(1, 29), 30, 31, 32, 34, *range(39, 46)]
save('Wheel Of Fortune', 'wheel-updated', [(i,) for i in wheel_indices], (12, 256, 367, 367))
save('Wheel Of Fortune', 'wheel-pointer-updated', [(35,), (36,), (37,)], (166, 234, 60, 76))
for name, index, box in [
    ('waffle', 66, (37, 222, 52, 42.5875)),
    ('sandwich', 65, (124, 227, 56, 29.1979)),
    ('custard', 42, (219.884, 216.883, 42.232, 50.2342)),
    ('candy', 44, (306.5, 222, 45, 41.4878)),
    ('pie', 22, (38, 312, 47.2, 42.3)),
    ('tart', 37, (127, 312, 50, 42)),
]:
    save('Collection(1)', 'pastry-' + name, [(0, index)], box)
# Bound the source rectangle after its 24-degree rotation, preserving the angle.
a = math.radians(24)
x, y, w, h = 139.83, 631.356, 5.71555, 12
box = (x - h * math.sin(a), y, w * math.cos(a) + h * math.sin(a), w * math.sin(a) + h * math.cos(a))
save('Rewards(1)', 'boost-rocket', [(0, 6)], box)
