import { build } from 'esbuild';
import { readFile, writeFile, unlink } from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('..', import.meta.url));
const output = path.join(root, '.openai/qa-render.mjs');
const result = await build({ stdin: { contents: `
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { HomeScreen, ProfileScreen, CashbackScreen } from './src/screens';
import { Navigation } from './src/components';
import { ChallengesScreen, CollectionScreen, DealsScreen, LeaderboardScreen } from './src/RewardScreens';
import MapScreen, { Rating } from './src/MapScreen';
import WheelPopup from './src/WheelPopup';
import { TransactionsSection, transactions } from './src/transactions';
import { BillScreen, RewardsScreen, SplitScreen, SuccessScreen, TransferScreen } from './src/FinanceScreens';
const noop = () => {};
export const views = {
home: renderToStaticMarkup(<HomeScreen profile={noop} cashback={noop} collection={noop} leaderboard={noop} challenges={noop} onTransaction={noop} />),
profile: renderToStaticMarkup(<ProfileScreen back={noop} cashback={noop} collection={noop} leaderboard={noop} />),
cashback: renderToStaticMarkup(<CashbackScreen back={noop} onTransaction={noop} />),
nav: renderToStaticMarkup(<Navigation screen="home" go={noop} />),
collection: renderToStaticMarkup(<CollectionScreen back={noop} cashback={noop} />),
leaderboard: renderToStaticMarkup(<LeaderboardScreen back={noop} profile={noop} />),
challenges: renderToStaticMarkup(<ChallengesScreen back={noop} />),
deals: renderToStaticMarkup(<DealsScreen back={noop} cashback={noop} map={noop} rewards={noop} />),
map: renderToStaticMarkup(<MapScreen back={noop} />),
rewards: renderToStaticMarkup(<RewardsScreen back={noop} collection={noop} cashback={noop} deals={noop} />),
bill: renderToStaticMarkup(<BillScreen billId="nike" back={noop} split={noop} />),
split: renderToStaticMarkup(<SplitScreen billId="nike" back={noop} transfer={noop} />),
transfer: renderToStaticMarkup(<TransferScreen recipientId="ava" back={noop} submit={noop} />),
success: renderToStaticMarkup(<SuccessScreen receipt={{id:'receipt-one',amountCents:420,recipientId:'ava',billId:'nike',createdAt:'2026-10-15T12:00:00Z'}} home={noop} />),
rating: renderToStaticMarkup(<Rating />),
wheel: renderToStaticMarkup(<WheelPopup close={noop} reducedMotion={false} />),
};
export function checkWiring() {
const calls=[];
function walk(node,visit) { if(!node || typeof node!=='object') return; visit(node); for(const child of React.Children.toArray(node.props?.children)) walk(child,visit); }
walk(TransactionsSection({onOpen:id=>calls.push(id)}),node=>{if(node.props?.className==='transaction-row')node.props.onClick();});
walk(BillScreen({billId:'nike',back:noop,split:()=>calls.push('split')}),node=>{if(node.props?.className==='pink-button split-bill-button')node.props.onClick();});
const nav=Navigation({screen:'home',go:next=>calls.push(next)});
function findText(node,text){if(!node||typeof node!=='object')return;if(node.type==='button' && React.Children.toArray(node.props.children).some(child=>child?.props?.children===text))return node;for(const child of React.Children.toArray(node.props?.children)){const result=findText(child,text);if(result)return result;}}
findText(nav,'Rewards').props.onClick();
findText(nav,'Deals').props.onClick();


return calls;
}
`, resolveDir: root, loader: 'tsx' }, bundle: true, packages: 'external', platform: 'node', format: 'esm', jsx: 'automatic', write: false });
await writeFile(output, result.outputFiles[0].text);
try {
  const { views, checkWiring } = await import(output);
  assert.deepEqual(checkWiring(), ['starbucks','nike','gap','hm','ikea','split','rewards','deals']);
  assert.match(views.home, /Welcome back/);
  assert.match(views.home, /Streak Goal/);
  assert.match(views.profile, /Your Profile/);
  assert.match(views.profile, /Student ID/);
  assert.match(views.cashback, /Recent transactions/);
  const history = markup => markup.match(/<section class="transactions">[\s\S]*?<\/section>/)?.[0];
  assert.ok(history(views.home));
  assert.equal(history(views.home),history(views.cashback));
  assert.match(views.rewards,/Reward Status/);
  assert.match(views.bill,/Nike/);
  assert.match(views.bill,/€32.00/);
  assert.match(views.split,/Send money to Ava/);
  assert.match(views.split,/€6.40/);
  assert.match(views.transfer,/Sending to Ava/);
  assert.match(views.transfer,/€0.00/);
  assert.match(views.transfer,/type="submit"[^>]*disabled=""/);
  assert.match(views.transfer,/aria-live="polite"/);
  assert.match(views.success,/€4.20/);
  assert.match(views.success,/Ava/);
  assert.match(views.success,/Split Bill \(Nike\)/);
  assert.match(views.wheel, /role="dialog"/);
  assert.match(views.wheel, /Spin Now/);
  assert.match(views.collection, /23 \/ 50 collected/);
  assert.match(views.leaderboard, /Golden League/);
  assert.match(views.challenges, /Groceries challenge/);
  assert.match(views.deals, /Search brands or deals/);
  assert.match(views.map, /Show Dunkin/);
  assert.doesNotMatch(views.map, /merchant-sheet/);
  assert.match(views.rating, /4.2 out of 5/);
  assert.equal((views.cashback.match(/class="merchant-placeholder"/g)||[]).length,5);
  assert.match(views.challenges, /data-target-width="199px"/);
  assert.match(views.nav, /aria-current="page"/);
  assert.equal((views.nav.match(/<button/g) || []).length, 4);
  assert.doesNotMatch(views.nav,/Budget/);
  assert.match(views.wheel,/aria-label="Close wheel popup"/);
  assert.equal((views.nav.match(/disabled=""/g) || []).length, 1);
  const markup = Object.values(views).join('');
  assert.doesNotMatch(markup, /\/frames\/|\/(?:0[1-9]|1[0-5])\.svg/);
  const assets = new Set([...markup.matchAll(/(?:src="|url\()(\/art\/[^"()]+\.svg)/g)].map(m => m[1]));
  for (const asset of assets) {
    const svg = await readFile(path.join(root, 'public', asset), 'utf8');
    assert.match(svg, /<svg/);
    assert.doesNotMatch(svg,/data:image\/webp/);
    assert.doesNotMatch(svg, /href="https?:/);
    assert.doesNotMatch(svg, /viewBox="0 0 393 (?:852|942|1159|865)"/);
  }
  const photo = await readFile(path.join(root,'public/art/dunkin-store.webp'));
  assert.equal(photo.toString('ascii',8,12),'WEBP');
  const css = await readFile(path.join(root, 'src/styles.css'),'utf8');
  assert.match(css, /width:393px;height:852px/);
  assert.match(css, /#FFDDF5/);
  assert.match(css, /prefers-reduced-motion/);
  const app = await readFile(path.join(root,'src/App.tsx'),'utf8');
  assert.equal((app.match(/setWheelOpen\(true\)/g)||[]).length,1);
  assert.doesNotMatch(app,/openWheel/);
  assert.match(css,/full-map[^}]*height:852px/);
  assert.match(css,/deals-carousel[^}]*overflow-x:auto/);
  assert.match(css,/map-category-scroll/);
  console.log(`All thirteen screens, wheel, rating and navigation render; shared transactions, bill and navigation callbacks, zero transfer state, receipt details, initial hidden merchant sheet, five logos, ${assets.size} extracted assets and first-load-only wheel verified.`);
} finally { await unlink(output); }
