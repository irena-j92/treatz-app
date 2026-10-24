# Treatz — coded mobile prototype

React 19 + TypeScript + Vite + Tailwind CSS v4. Screens 01–15 are rebuilt from the user's SVG exports. Layouts, text, controls, cards, lists, grids, map pins, and progress bars are HTML/CSS components. Original artwork is extracted into `public/art`; whole screen SVGs are never embedded.

## Run

```sh
npm install
npm run dev
npm test
node scripts/check-render.mjs
npm run build
```

## 24 October visual update

The eight new SVG exports update the splash, Dashboard, Profile, Cashback, Challenges, Leaderboard, deals browsing page (titled Rewards), and Merchant Search. Green gradient headers, native status bars, the new splash logo, three illustrated challenges, the reordered Profile, and a horizontal Active boosts carousel match the exports. Only isolated artwork/photos are reused. The generated achievement concept is not included.

The new coherent starting cashback is €66.12, with €133.11 received and €66.99 redeemed. This resolves conflicting amounts in the source exports. Session state uses v2 for this baseline. The expiry reads 15 Oct 2027. Dashboard retains its transaction list below the three challenges. The existing Rewards navigation still opens Reward Status first; Deals opens the refreshed browsing page.

## Latest six-screen revision

The latest Splash, Wheel Of Fortune, Cashback, Challenges, Rewards browsing, and Collection SVGs replace their earlier versions. These clean exports omit the device status strip and square off the canvas. The wheel has rocket boosts and a FAIL sector while retaining its X, five-turn spin, and automatic dismissal. Collection now shows six new pastries and the Pastry/Cake/Bite-sized/Mystery filters, with the tile counts and counters from the reference. Active boost chips use the provided miniature rocket.

The original logo pop, splash dissolve, game-style wheel bounce, pointer ticks, progress fills and sheet rise are retained. New screen cards and Collection tiles use short staggered overshoot-and-settle entrances, with reduced-motion alternatives.

## Routes and interactions

- Root URL: splash fades/pops, dissolves, Home appears, then the wheel popup bounces in. Spin Now turns the wheel five times and dismisses it; no reward screen is invented. The wheel appears only in this initial-load flow. No button reopens it. The X button or Escape dismisses it, including during a spin.
- Home avatar → Profile; current level → Collection (06); trophy → Leaderboard (07); challenge rows/See all → Challenges (08).
- Profile's cashback card → Cashback (05); level card → Collection; trophy → Leaderboard. Back returns to the originating screen.
- Rewards navigation → Reward Status (11). Separate Deals navigation → Deals (10); deal cards → Reward Status. Top deals scroll horizontally with touch, trackpad and arrow keys. Dot buttons select cards. See all controls use a chevron without a shaft.
- Deals search → Nearby (09). The original map artwork covers the full viewport and starts without a merchant sheet. Dunkin's circle opens the sheet from the bottom. Close, Escape, or a downward handle gesture dismisses it. Categories scroll horizontally and filter merchant markers; the search filters merchant names.
- Dunkin details: literal requested 4⅕-star rating shown as 4.2/5 (128 ratings), 3D-style rocket and Use 2x boosts, coin and 4% Cashback, activation state, save state, and a directions link.
- Progress bars animate from 2px to the supplied progress when first visible after loading, and respect reduced motion.
- Home and Cashback show the same five transactions. Each opens its own Bill Overview (12), which links to Bill Splitter (13). Friend avatars open Transfer (14); Continue opens the selected friend.
- Transfer starts at €0.00 with a cursor. Typing or the custom keypad updates Remaining Cashback immediately. Zero, overdrafts, extra decimal places, and repeated submissions are blocked. A valid submission deducts exact integer cents and opens Success (15) with the actual amount and recipient. Share Receipt uses native sharing when available, otherwise downloads a text receipt.
- Cashback balance and redeemed total are shared across screens and preserved in this tab’s session storage; drafts do not change the balance.
- Cashback transaction tiles have logos on white backgrounds. Analytics and other not-yet-supplied flows remain disabled. The four navigation tabs are Home, Analytics, Rewards, and Deals.

The viewport is **393 × 852**, centered on **#FFDDF5**. Long content scrolls above the pinned 90px navigation. Nearby, Bill Splitter, Transfer, and Success are full-screen, as in their supplied exports. Smaller windows proportionally scale the viewport to fit. URL hashes: `#home`, `#profile`, `#cashback`, `#collection`, `#leaderboard`, `#challenges`, `#deals`, `#nearby`, `#rewards`, `#bill`, `#split`, `#transfer`, `#success`. Refresh the root URL to replay the intro. All activation, boost, and transfer states are prototype-only; no money moves.

## Artwork and accessibility

Original artwork retains vector geometry and source raster detail. SVG-embedded bitmaps use lossless PNG for broad renderer compatibility. The merchant photo is optimized at four times its displayed dimensions as a separate lossless WebP. Nav icons, treats, avatars, trophies, merchant logos, and deal photos are extracted from the supplied exports. Starbucks and IKEA marks are from Simple Icons 11.15.0 (CC0); GAP's public-domain text mark is reconstructed in vector form. The rocket is a custom glossy vector illustration. See `design-source/rebuild-spec.md` for exact sources and measurements.

Keyboard-accessible buttons, visible focus rings, descriptive labels, inert background and focus containment for the initial wheel, focus restoration for the merchant sheet, and reduced-motion alternatives are included.

## Validation

TypeScript/production build; route/spin/viewport and exact-cent financial state tests; server-rendered screens and navigation; transaction/bill/Rewards/Deals callback wiring; matching Home/Cashback history; zero transfer state and actual receipt data; initially hidden merchant sheet; five transaction logos; asset encoding and availability. Live interactive browser QA is available for the October 24 update; Dashboard, Profile, Cashback, Challenges, Leaderboard, deals/boost scrolling, Merchant Search, splash/wheel, and the transfer journey are checked against the exports. Prior versions remain in Git history.

Dashboard and Leaderboard now follow the paired SVG revision: each01 crop is placed above02 in one continuous native scrolling screen. The Dashboard stats showXP,Level24,12boosts andrank14; existing routes and shared transactions remain. The Leaderboard retains scope filters and current-user profile access. Both screens omit the device status strip and preserve bouncy entrances, with opacity-only reduced motion.

Merchant and Profile also follow their paired SVG exports: Merchant01+02 compose the852px map/sheet view; Profile01+02 form1164px of scrolling content. The merchant sheet includes the original rocket and coin perk artwork, fractional4.2-star rating, directions, bookmark, boost and activation controls. Profile typography, metric cards, badges and achievements match the latest crops. These screens omit the device status strip and preserve bounce/progress/sheet motion with reduced-motion support. Cashback remains one shared account balance across screens.
