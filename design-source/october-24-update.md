# 24 October SVG update — extraction sheet

Eight high-resolution mobile SVG exports, intrinsic width 393. The app viewport remains393×852; taller screens scroll above the pinned existing navigation. Native HTML/CSS recreates UI; only isolated illustrations, logos and photos are extracted. Generated badge concepts are excluded.

## Shared seven-layer extraction

- Layout: one393px column,24px side gutters,345px cards,24px frame corners. Status strip at24px; screen header at64px. Persistent four-tab navigation remains.
- Typography: existing Host Grotesk; header16/24 regular; section18/24 medium; card16/22 medium; body14/20; metadata12/18. Home greeting20/26; Profile name24/31; Cashback amount32/42.
- Palette: cream#FDF9EF; green#005F34→#00C56C; yellow#FEF1A0 with#FFDF53 strokes; pink#FEC0EC→#FFDCF5; progress#FF8EFB→#FF4BD4; black#222; muted#888; borders#E2E2E2.
- Spacing:24px section gaps,16px artwork/text gaps,16px card corners,12px image-tile corners. Measured coordinates below override defaults.
- Components: pill controls,84px challenge artwork tiles,45px transaction logos,45px leaderboard avatars,100px monthly badge strip. Flat surfaces with subtle1px strokes.
- Atmosphere: glossy source3D illustrations, green gradient headers, cream canvas, dimensional splash logo. No added generated artwork.
- Interaction/motion: keep initial splash fade/pop and wheel with X; fill progress from2px on appearance; horizontal deal, boost and category scrolling; map initially closed and bottom sheet enters on Dunkin; retain all existing bill/split/transfer and receipt logic. Reduced-motion alternatives remain.

## Screens and anchors

| Export | Classification and sections | Measured anchors in pixels |
|---|---|---|
| Splash Screen,393×852 | pink single screen, status bar and centered logo | logo110,398173×60; status24,24 |
| Dashboard,393×1020 | stats, greeting/avatar, streak, cashback, charity,3 challenges | stats24,64345×42 with bottom rule; avatar309,12660²; streak24,210345×102; balance24,332345×102; charity24,454345×66; challenges tiles24,584/700/81684² |
| Profile,393×1162 | gradient identity, overlapping level, charity, metrics, badges, achievements | gradient0–280; identity24,10780px; level24,211345×102; charity24,333345×66; metrics24,419108×120; badges24,605345×100; achievements24,771345×231 |
| Cashback,393×865 | gradient header/amount/expiry, overlapping totals, transactions | header0–345; coin161.5,11170×80; expiry121.5,251150×30; totals19,305350×80; transaction logos24,449/510/571/632/69345² |
| Challenges,393×920 | gradient grocery card, daily and weekly lists | header0–274; grocery24,163345×87; cart273,11384²; daily tile24,34484²; weekly tiles24,496/61284² |
| Leaderboard,393×900 | title, league/time, trophies, scope pills,8 rows | league24,112; gold147,151100²; bronze42,16980²; silver272,16980²; tabs24,27535h; rows330+57n |
| Rewards,393×1215 | gradient deal browsing, active boosts carousel, brand grid | existing Deals route visual updated; green0–486; search24,110345×45; deal cards24/201/378,217165×215; active boosts24/192/360,548156² with90px photos; brand grid starts24,773 |
| Merchant Search,393×852 | map/search/categories/markers, conditional bottom sheet | search24,110345×45; categories16735h; map extends to full852 height when sheet closed; sheet starts447, photo150h; perks24/154,621125×35; Activate24,766281×56 |

The Rewards export is the existing deals-browsing layout (formerly10). Apply its design there; Rewards navigation still opens Reward Status11 first, and deal/boost cards lead there. Keep the shared transaction list below Dashboard challenges, preserving the previously requested transaction access even though it extends beyond the new Dashboard export.

Cashback source figures conflict: Dashboard66.12, totals133.11−66.99=66.12, while Profile/Cashback hero still24.80. Use a single coherent initial66.12 balance everywhere,133.11 received,66.99 redeemed, and the supplied15Oct2027 expiry. Version the prototype session state to match this baseline.

## Final verification and implementation notes

Browser checks covered all updated layouts, horizontal deal/boost scrolling, full map and conditional sheet, filtering, activation, level navigation, shared cashback, and Starbucks→Split Bill→Ava→4.20→Success. Overdraft100.00 is disabled; remaining balance becomes61.92 and the actual receipt shows4.20/Ava. The HTTP preview exposed a pre-existing randomUUID secure-context issue; receipt IDs now use getRandomValues as a fallback. Eight logic tests and all server-rendered views pass.

The map keeps the exact source scale above the sheet. A native SVG continuation with matching roads, parks, trees, and river extends the background to852px when closed, with a40px blended join. No screenshot or whole-frame SVG is used as a screen.
