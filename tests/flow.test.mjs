import test from 'node:test';
import assert from 'node:assert/strict';
import { deviceScale, readScreen, spinFlow, SPIN } from '../src/flow.mjs';
test('a spin cannot start twice or finish before starting', () => {
  assert.equal(spinFlow('ready', 'finish'), 'ready');
  const spinning = spinFlow('ready', 'spin');
  assert.equal(spinning, 'spinning');
  assert.equal(spinFlow(spinning, 'spin'), 'spinning');
  const closing = spinFlow(spinning, 'finish');
  assert.equal(closing, 'closing');
  assert.equal(spinFlow(closing, 'spin'), 'closing');
  assert.ok(SPIN.turns >= 3);
});
test('supported routes resolve and legacy routes safely return Home', () => {
  for (const screen of ['home', 'profile', 'cashback', 'collection', 'leaderboard', 'challenges', 'deals', 'nearby', 'rewards', 'bill', 'split', 'transfer', 'success']) {
    assert.equal(readScreen(`#${screen}`), screen);
    assert.equal(readScreen(`#/${screen}`), screen);
  }
  for (const hash of ['', '#spin', '#cards', '#<script>']) assert.equal(readScreen(hash), 'home');
});
test('393×852 app fits small windows without changing proportions or enlarging', () => {
  for (const [width, height] of [[1440,900],[393,852],[320,568],[390,600],[800,500]]) {
    const scale = deviceScale(width,height);
    assert.ok(scale > 0 && scale <= 1);
    assert.ok(393*scale <= width && 852*scale <= height);
    assert.ok(Math.abs((393*scale)/(852*scale)-393/852)<1e-12);
  }
  assert.equal(deviceScale(1440,900),1);
  assert.equal(deviceScale(393,852),1);
});
