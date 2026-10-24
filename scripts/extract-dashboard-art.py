"""Extract the isolated Dashboard header rocket from the two-part SVG revision.

Usage: python scripts/extract-dashboard-art.py /absolute/path/to/svg-uploads
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

# The remaining artwork is pixel-identical to the already extracted assets.
# Preserve the source rocket's nearly-upright rotation inside its exact bounds.
a = math.radians(0.825788)
x, y, w, h = 239.162, 66.9189, 11.4311, 24
box = (x - h * math.sin(a), y, w * math.cos(a) + h * math.sin(a), w * math.sin(a) + h * math.cos(a))
save('Dashboard 01', 'dashboard-rocket', [(0, 36)], box)
