# Merchant and Profile paired exports

## Intake / layout
High-resolution Figma mobile SVG crops, 01 above02. Merchant447+405=852px. The upper map remains visible above a bottom sheet at447px; closed state keeps the full-height map. Profile571+593=1164px, scrolling behind pinned navigation. Native HTML/CSS controls, text and layout; isolated existing artwork only.

## Extraction sheet
- Merchant:map393×474 plus existing map continuation below; black30% map tint. Search24,110,345×45. Categorychips24,167 with35px height,80/82/80/100px widths and5px gaps. Chevron back at18,64. Merchant pins retain source positions. No status strip.
- Sheet:top447,height405,radius16top. Photo393×150 with20% black treatment. Deadline16,16,68×24. Three32px circular action controls top16, right17/58.6/100.2. Existing close/drag/Escape, bookmark/share and Activate behavior retained.
- Merchant perks:local24,174,133.837×35 and163.337,174,140×35; source24deg rocket~16.837×22.145 and coin24²,14px labels. Dunkin’20/26 atlocal222; type16/22; hours16/22. Rating4.2(128), four filled stars plus20% fifth; buttons24,319,281×56 and313,319,56², direction icon inside.
- Profile:green gradient to280; PageHeader64×24, chevronback. Avatar24,107,80²,pink1pxborder; image56². Christy21/27, StudentID14/20,8px gap. Levelcard24,211,345×102; progress44,259,158×12; 720/1000XP. Charity24,333,345×66. Metrics24/142/260,419,108×120,50²art; values18/24, labels14/20. Keep cashback shared with account state instead of disconnected24.80 sample.
- Lower Profile crop begins571:Monthly badges header569×24 (crop starts2px into line box); badgecontainer607×100; artx44/129/218/299,50² at622/622/621/621. Achievements heading735×24, list773×230,3rows76px;45×46art, titles16/22, descriptions12/18, earned14/20 and20px check circles; third row3/5splits.
- Palette:cream#FDF9EF, green#005F34→#00C56C, yellow#FEF1A0 and#FFDF53border, pink#FEC0EC→#FFDCF5, progressgreen, muted#888, line#E2E2E2, Open/Earned#4EA451.
- Assets:hash analysis confirmed all avatar/metric/badge/achievement/map/brand/perk bitmaps unchanged. Storefront is same photo and exact crop as existing optimized asset. Reuse existing lossless SVG assets; no new extraction needed.
- Motion / interaction:original logo pop and wheel unchanged; preserve progress fills, sheet rise and bouncy entrances, reduce to opacity fades for reduced motion. Profile level/cashback/trophy routes remain; map search/filtering and close/activate/save/share remain interactive. No navigation on full-screen map.

## Validation target
Compare upper and lower crops through native scrolling at393×852, map-only→Dunkin’ sheet→close flow, perk/activation/bookmark toggles, Profile routes, progress fills, no broken images. Build, existing render/flow/money checks, then publish and synchronize all latest source to irena-j92/treatz-app/main.
