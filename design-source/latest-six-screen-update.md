# Latest six-screen update — 24 October

The six supplied SVGs are high-resolution393px-wide mobile design exports. Rebuild UI in React/CSS; extract only individual illustrations and the rotating wheel. Existing routes, transactions, shared cashback and transfer logic remain.

| Screen | Size | Layout and changes |
|---|---|---|
| Splash Screen(3) |393×852|pink#FF74F2; centered173×60 white/green Treatz logo at110,398; no device status strip or outer corner rounding|
| Wheel Of Fortune |393×852|green#005F34→#00C56C background; title24/31 at130px; spinning disc about367² at12,256; fixed pink pointer; sectors now coins, bolts, rocket boosts and FAIL; Spin Now46,716300×56 with pink horizontal gradient; retain accessible X|
| Cashback |393×865|same345px gradient header;70×80 coin at161.5,111;32/42 amount;150×30 expiry at121.5,251;350×80 totals at19,305; five transactions at449+61n. Remove status strip; retain merchant logos and shared balance|
| Challenges(2) |393×920|274px gradient hero, grocery card24,163345×87, cart273,11384²; daily tile24,34484²; weekly tiles24,496 and612; title copy sits8px below tile top, progress36px below tile top. No status strip|
| Rewards(1) |393×1215|existing Deals browsing layout with Rewards heading; green hero0–486; top cards24,217165×215; active boosts24,548156²;2X chips use miniature rocket instead of clock; brand grid starts773. No status strip|
| Collection(1) |393×929|header at64; chips110×35: All, Pastry, Cake, Bite-sized, Mystery; no collected-total line. Pastry header168, tiles204/294/384; four78px columns with11px horizontal and12px vertical gaps.6 pastry illustrations,6 locked tiles. Cake header485, tiles521/611/701,10 locked tiles. Display source counters6/10 and0/8. No status strip|

Shared: Host Grotesk; cream#FDF9EF, green#005F34, pink#FEC0EC/#FF8EFB, muted#888,1px#E2E2E2 borders, card16px corners, tile12px corners. Source geometry takes precedence over defaults. The shared functional cashback stays66.12, matching133.11 received minus66.99 redeemed, as established in the previous update.

Motion: preserve original logo-pop keyframes and dissolve, bouncy game-pop wheel entrance, pointer ticks, five-turn ease-out spin and dismissal, bottom-sheet rise and animated progress fills. Restore staggered card/tile entrances on screen changes with a short overshoot and settle; no layout animation or repeated perpetual bounce. Reduced-motion uses short opacity reveals and immediate progress fills.
