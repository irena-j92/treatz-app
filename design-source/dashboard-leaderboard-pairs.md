# Dashboard / Leaderboard paired exports

## Intake and composition
High-resolution mobile SVG design exports. Each 01 is the upper crop, followed immediately by 02. Dashboard:393×(548+476)=393×1024. Leaderboard:393×(313+590)=393×903. Both remain native scrolling HTML inside393×852 frames with pinned existing navigation. No full-screen SVG is used.

## Extraction sheet
- Layout:24px side padding. Dashboard stats at64px; divider105.5; greeting126px; streak210×102; cashback332×102; charity454×66. Lower crop starts548:Challenges heading548, tiles588/704/820, divider687.5/803.5/919.5. Keep established shared transaction history after the supplied content.
- Dashboard stats:XP12480, Level24, upright rocket12, trophy#14. Source positions:bolt24,64,23×30; custard133.371,67.296,20.075×23.408; rocket239.162,66.919,11.431×24 rotated0.826deg; trophy315,67,24². Remove old flame68 from this header.
- Leaderboard:header64×24; league112×24; gold147,151,100²; bronze42,169,80²; silver272,169,80². Filter chips at275×35:80/86/80px widths,6px gaps. Bottom crop starts313; ranking starts333;8rows57px tall; avatarx61,45²; namex122; XP right24px. Current rank14 Christy highlighted, ranks15–21 below.
- Typography:existing Host Grotesk. Stats14/20 semibold; greeting20/26 medium; section18/24 medium; streak/labels16/22 medium; balance24/31 regular; chip14/20; ranking16/22 regular except Christy semibold. Deadline10/14; captions14/20 and remaining12/20.
- Color:cream#FDF9EF; green#005F34; yellow#FEF1A0,stroke#FFDF53; pink#FEC0EC/#FFDDF5,progress#FF8EFB→#FF4BD4; muted#888; borders#E2E2E2. No status strip in these exports.
- Components:streak/cashback/charity16px radius; challenge tiles84²radius12; filterchips35px pill; rankingavatars45²circle, Leo/Ava/Sam gradient rims. Source charity button106×36, chevron-only cap.
- Atmosphere:exact supplied gradients; no new shadows except existing streak milestones. Pixel hashes confirm existing cups, avatars, coin, custard, charity and challenge bitmaps are identical. Reuse them. Extract only differently oriented dashboard rocket.
- Interaction/motion:retain XP/collection/trophy/profile/cashback/challenges/transaction routes and scope filters. Preserve logo pop, first-load wheel, progress fills; add existing element-bounce choreography to Dashboard cards/rows and cups/rankings, with opacity-only reduced motion. No new screens or artificial navigation.

## Verification
Compare both native screens in browser at393×852; verify lower-crop order by scrolling, scope changes, profile/current-level/cashback links, no status strip, intact pinned nav and no broken images. Run TypeScript/Vite build, existing render checks and money/flow tests.
