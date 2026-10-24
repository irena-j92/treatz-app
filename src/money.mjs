export const INITIAL_CASHBACK = 6612;
export const TOTAL_RECEIVED = 13311;
export const initialAccount = { balanceCents: INITIAL_CASHBACK, redeemedCents: 6699, receipts: [] };

export function validDraft(value) {
  return typeof value === 'string' && /^\d{0,7}(?:\.\d{0,2})?$/.test(value);
}
export function parseTransferAmount(value) {
  if (!validDraft(value)) return null;
  const [whole = '', fraction = ''] = value.split('.');
  return Number(whole || 0) * 100 + Number(fraction.padEnd(2, '0') || 0);
}
export function editAmount(draft, key) {
  if (key === 'delete') return draft.slice(0, -1);
  if (key === '.') return draft.includes('.') ? draft : `${draft || '0'}.`;
  if (!/^\d$/.test(key)) return draft;
  const next = draft === '0' ? key : draft + key;
  return validDraft(next) ? next : draft;
}
export function formatMoney(cents) {
  return `${cents < 0 ? '-' : ''}€${(Math.abs(cents) / 100).toFixed(2)}`;
}
export function splitCents(total, count) {
  if (!Number.isSafeInteger(total) || total < 0 || !Number.isInteger(count) || count < 1) return [];
  const base = Math.floor(total / count), remainder = total % count;
  return Array.from({ length: count }, (_, index) => base + (index < remainder ? 1 : 0));
}
export function accountReducer(state, action) {
  if (action.type !== 'transfer') return state;
  const { amountCents, id, recipientId, billId, createdAt } = action;
  if (!Number.isSafeInteger(amountCents) || amountCents <= 0 || amountCents > state.balanceCents ||
      typeof id !== 'string' || !id || state.receipts.some(receipt => receipt.id === id) ||
      !['mia','leo','ava','noah','tina','sam'].includes(recipientId) ||
      !['starbucks','nike','gap','hm','ikea'].includes(billId) || typeof createdAt !== 'string' || !Number.isFinite(Date.parse(createdAt))) return state;
  return {
    balanceCents: state.balanceCents - amountCents,
    redeemedCents: state.redeemedCents + amountCents,
    receipts: [...state.receipts, { id, amountCents, recipientId, billId, createdAt }],
  };
}
export function validateAccount(value) {
  if (!value || !Number.isSafeInteger(value.balanceCents) || !Number.isSafeInteger(value.redeemedCents) ||
      value.balanceCents < 0 || value.balanceCents > INITIAL_CASHBACK ||
      value.balanceCents + value.redeemedCents !== TOTAL_RECEIVED || !Array.isArray(value.receipts) || value.receipts.length > INITIAL_CASHBACK) return initialAccount;
  let replay = initialAccount;
  for (const receipt of value.receipts) {
    if (!receipt || typeof receipt !== 'object') return initialAccount;
    const next = accountReducer(replay, { ...receipt, type: 'transfer' });
    if (next === replay) return initialAccount;
    replay = next;
  }
  return replay.balanceCents === value.balanceCents && replay.redeemedCents === value.redeemedCents ? replay : initialAccount;
}

export function newReceiptId(cryptoApi = globalThis.crypto) {
  if (typeof cryptoApi.randomUUID === 'function') return cryptoApi.randomUUID();
  return Array.from(cryptoApi.getRandomValues(new Uint8Array(16)), byte => byte.toString(16).padStart(2, '0')).join('');
}
