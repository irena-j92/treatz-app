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

TypeScript/production build; route/spin/viewport and exact-cent financial state tests; server-rendered screens and navigation; transaction/bill/Rewards/Deals callback wiring; matching Home/Cashback history; zero transfer state and actual receipt data; initially hidden merchant sheet; five transaction logos; asset encoding and availability. Live interactive browser/screenshot QA is unavailable in this managed environment. Prior versions remain in Git history.
