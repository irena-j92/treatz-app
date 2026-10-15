export const INTRO = Object.freeze({ reveal: 2400, dissolve: 550, popup: 650 });
export const SPIN = Object.freeze({ duration: 4400, reducedDuration: 500, settle: 350, turns: 5, offset: 135 });
export function readScreen(hash) {
  const value = hash.replace(/^#\/?/, '');
  return ['home', 'profile', 'cashback', 'collection', 'leaderboard', 'challenges', 'deals', 'nearby', 'rewards', 'bill', 'split', 'transfer', 'success'].includes(value) ? value : 'home';
}
export function deviceScale(width, height) {
  const gutter = width > 425 ? 48 : 0;
  return Math.min(1, Math.max(1, width - gutter) / 393, Math.max(1, height - gutter) / 852);
}
export function spinFlow(state, action) {
  if (action === 'spin' && state === 'ready') return 'spinning';
  if (action === 'finish' && state === 'spinning') return 'closing';
  return state;
}
