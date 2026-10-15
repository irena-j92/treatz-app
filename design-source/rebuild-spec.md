# Treatz: five-screen coded rebuild

The supplied 01–05 SVG exports and treatz-nav.svg are the visual source of truth. Screen layouts, text, cards, lists, progress bars and controls are rebuilt as React/HTML/CSS. Only individual artwork and icon fragments are extracted as self-contained SVGs; no complete screen export is displayed.

## Extraction and reference lock

| Layer | Source measurements and commitments |
|---|---|
| Viewport/layout | User requests 393 × 852. Center on #FFDDF5. Original exports are 393 × 852, 942, 1159, and 865; preserve their natural content layout inside a vertically scrolling viewport. Nav pinned inside device, 90px high. Content horizontal padding 24px, occasional 14px wide lists. |
| Typography | Host Grotesk (existing original font files). Body 14–16px, labels 12–14px, section headings 18px/600, greeting 24px/600, balances 40px/400 and 20px/500, level number 44px. |
| Palette | App #FDF9EF, deep green #005F34, splash/button #FF74F2, pastel pink #FEC0EC, progress #FF8EFB, yellow #FEF1A0 with #FCCF0D border, ink #222222, secondary #888888, borders #E2E2E2, earned #4EA451, badge tile #F3F5F7. |
| Spacing | Home: stats y64, greeting y124, streak y202 height113, balance y339 height120, charity y483 height66, challenges heading y576, challenge rows y605 and735. Profile: title y70, avatar y107, metric cards y203 height120, charity y347, level y432 height149, badges heading y611, badge tiles y642 height100, achievements heading y777 and list y808 height236. Cashback: header height360, coin y111, balance y205, status y263, summary y317 height85, transactions heading y429, rows y462 then61px apart. |
| Components | Cards 20–24px radius; pills fully rounded. Profile metric cards 108 × 120. Avatar pink circles 60px home and80px profile. Streak 12px track. Four badge columns. Original gray merchant-image squares retained. All textual UI is real selectable text. |
| Atmosphere | Flat cream/green/pink surfaces. Original glossy 3D art retained. No invented gradients, noise or decorative page chrome. Wheel's original vector segments, gradient rim, center and prize artwork are extracted together; pointer separate. |
| Behavior | Splash logo fades and pops, splash dissolves after a few seconds. Home mounts, then wheel appears with game-style bounce. Spin Now starts several rotations with deceleration; popup dismisses after spin, no invented reward. Avatar opens Profile; cashback coin card opens Cashback; back buttons restore previous route. Home navigation works; other future destinations clearly marked unavailable. |

## Decisions

- Explicit user references own all visual choices; do not import a new visual style.
- Use CSS transform/opacity animations and native Web Animations for the wheel; reduced-motion settings replace large movements with brief fades.
- Intro plays once per page load; URL hashes support Home, Profile and Cashback and browser back/forward.
- Future tabs and unimplemented secondary actions are visibly disabled, avoiding fabricated flows.
- The wheel is a modal overlay confined to the app. Background content becomes inert and focus is trapped/restored.

## Screens 06–10 extension

Primary references: the user's five new SVG exports. The established palette, Host Grotesk type, 24px padding, pill controls, and 393×852 centered viewport stay authoritative. Only artwork fragments are extracted; cards, tabs, headers, lists, map pins, progress, and merchant controls remain native components.

| Screen | Extraction and behavior |
|---|---|
| 06 Collection | Cream, title y70 with cashback balance top-right. Count y114. Horizontally scrollable 40px category chips y140. Two Bakery sections with 4-column grids of 78px pink treat tiles; first grid y237, second y556. Original five treats, remaining question marks. Home level and Profile level lead here. |
| 07 Leaderboard | Title y70; bronze/gold/silver trophy artwork y130/112/130. Golden League/time y231; 100×40 tab pills y264. Highlighted current-user row y320, then 57px list rows, original avatars and XP. Trophy controls lead here. |
| 08 Challenges | Green header to y278; title y71; reward and deadline y108/131; cart x269,y99; yellow groceries card x24,y167,345×87. Weekly label y307 and row y342; Daily label y461; rows y496,609,723. All progress fills animate from ~2px to supplied completion on first visibility. |
| 09 Nearby map | Map fills the entire 852px viewport with the original map artwork covering its container. Search x24,y112; horizontal category chips y172; merchant circles are actual buttons. Start without merchant sheet. Dunkin selection opens a 408px bottom sheet with original photo and a slide from bottom. Rating replaced by 4⅕ stars and 4.2 (128). Rocket/Use 2x boosts and Coin/4% Cashback pills; directions button uses navigation icon. |
| 10 Deals | Green top section to y491. Search y112 opens Nearby. Horizontal 165×215 top-deal cards y220, 12px gaps; photo height125, overlapping 51px brand logos; slide indicators. Brand grid starts y542. See all uses a chevron without shaft. Rewards nav opens this screen. |

Wheel access is removed from all controls; it only appears in the initial root-load intro. Progress animations use IntersectionObserver once per mounted bar and respect reduced motion. The original Home streak/Level bars keep their green fill; pink fills animate on challenge bars.

Transactions 05 use white logo tiles. Nike and H&M come from supplied SVG artwork; Starbucks/IKEA use Simple Icons 11.15.0 (https://github.com/simple-icons/simple-icons/tree/11.15.0, CC0). GAP: vector text-mark reconstruction in its navy/white treatment, using the public-domain mark at https://commons.wikimedia.org/wiki/File:Gap_logo.svg as reference.

## Screens 11–15 and transfer logic

Reference lock: the supplied 11–15 exports, the existing Host Grotesk fonts, cream/green/pink/yellow tokens, and 393×852 centered canvas. Reuse the matching original custard, coin and friend artwork already extracted, rather than duplicate raster data.

| Screen | Measured layout and behavior |
|---|---|
| 11 Rewards | Green header 246px, title y71, yellow level x18,y133,357×95. Active boosts heading y275; pink Starbucks card y304,345×95; yellow Nike y407,345×85. Green balance y506 height126. Recommended deal cards y690,165×165. Rewards nav now leads here. |
| 12 Bill Overview | Green header height352; title y71, merchant logo x157,y112,80×80; merchant name y219; amount y259; completed/date y313. White summary cards x24/x209,y376,160×83; detail rows y513/550/587. Split Bill x24,y688,345×56. Merchant/amount/points come from the clicked shared transaction. |
| 13 Bill Splitter | Green header289; search y112,345×48; Recent y189; friend icons y220,45×45. Splitters y318; rows from349,57px high. Continue x24,y772,345×56. Ava's icon leads directly to Transfer; other friends work too. Search filters the same source friend list. Equal cent shares conserve the selected bill's amount. |
| 14 Transfer | Green header262; available cashback top-right; avatar x163,y106,68×68; recipient y193; amount in green with pink caret around y309; Paying with bar y374; keypad y438,3×4,63px keys. Starts €0.00. Remaining cashback previews available minus typed amount. A matching 44px Transfer button is added at bottom (absent in export), with the remaining bar moved up12px to fit. Full-screen; nav hidden to preserve controls. |
| 15 Success | Green check circle x163,y107,68px; Success y203; subtitle y243; receipt rows y327/363/400/437. Yellow pending split card y519,height72; white Home y621,height56; Share Receipt y689,height56. Amount, recipient, merchant/type, and transaction ID are from the committed transfer. |

Navigation has five tabs: Home, Budget (future), Analytics (future), Rewards (11), Deals (10). Deals cards link to Reward Status (11), and recommended rewards link back to Deals. The wheel remains initial-load only. Home now includes the same shared merchant transaction list as Cashback 05, with identical row order and values.

Accounting uses integer cents. Typing only previews; a valid positive submit deducts once, increases redeemed cashback, saves the receipt, and navigates to Success. Invalid amounts and overdrafts cannot submit; duplicate transaction IDs and rapid duplicate submissions are rejected. Available cashback updates across Home, Profile, Cashback, page headers, Rewards and Transfer. Session storage survives refresh and is validated by replaying committed receipts. All transfers are simulated within this prototype.
