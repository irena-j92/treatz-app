import test from 'node:test';
import assert from 'node:assert/strict';
import { accountReducer, editAmount, formatMoney, initialAccount, parseTransferAmount, splitCents, TOTAL_RECEIVED, validateAccount, validDraft } from '../src/money.mjs';
const action = (overrides = {}) => ({ type:'transfer', id:'receipt-one', amountCents:420, recipientId:'ava', billId:'starbucks', createdAt:'2026-10-15T12:00:00.000Z', ...overrides });
test('physical typing and keypad entry parse euros as exact integer cents', () => {
  for (const [draft,cents] of [['',0],['.',0],['0.00',0],['4.2',420],['24.80',2480],['0.01',1],['9999999.99',999999999]]) assert.equal(parseTransferAmount(draft),cents);
  for (const draft of ['-1','1.001','1e2','Infinity','foo','10000000','4..2']) { assert.equal(validDraft(draft),false); assert.equal(parseTransferAmount(draft),null); }
  let draft = '';
  for(const key of ['0','.','0','1']) draft = editAmount(draft,key);
  assert.equal(draft,'0.01');
  assert.equal(editAmount(draft,'2'),draft);
  assert.equal(editAmount(draft,'.'),draft);
  assert.equal(editAmount(draft,'delete'),'0.0');
  assert.equal(editAmount('','delete'),'');
  assert.equal(formatMoney(2480-420),'€20.60');
  assert.equal(formatMoney(-1),'-€0.01');
});
test('only a valid committed transfer changes balance and receipt', () => {
  const next = accountReducer(initialAccount,action());
  assert.equal(initialAccount.balanceCents,2480);
  assert.equal(next.balanceCents,2060);
  assert.equal(next.redeemedCents,10420);
  assert.equal(next.balanceCents+next.redeemedCents,TOTAL_RECEIVED);
  assert.deepEqual(next.receipts,[{id:'receipt-one',amountCents:420,recipientId:'ava',billId:'starbucks',createdAt:'2026-10-15T12:00:00.000Z'}]);
  assert.equal(accountReducer(next,action()),next);
  for(const overrides of [{amountCents:0},{amountCents:-1},{amountCents:2481},{amountCents:4.2},{amountCents:NaN},{id:''},{recipientId:'unknown'},{billId:'unknown'},{createdAt:'invalid'}]) assert.equal(accountReducer(initialAccount,action(overrides)),initialAccount);
  const empty = accountReducer(initialAccount,action({amountCents:2480}));
  assert.equal(empty.balanceCents,0);
  assert.equal(accountReducer(empty,action({id:'second',amountCents:1})),empty);
});
test('multiple transfers conserve cents and persisted sessions are replay validated', () => {
  const one = accountReducer(initialAccount,action({amountCents:1}));
  const two = accountReducer(one,action({id:'second',amountCents:2479,recipientId:'leo',billId:'nike'}));
  assert.equal(two.balanceCents,0);
  assert.deepEqual(validateAccount(JSON.parse(JSON.stringify(two))),two);
  for (const corrupt of [null,{}, { ...two,balanceCents:1 }, { ...two,receipts:[] }, { ...two,receipts:[...two.receipts,two.receipts[0]] }, {...two,receipts:[null]}]) assert.equal(validateAccount(corrupt),initialAccount);
});
test('split amounts preserve the whole bill, including remainder cents', () => {
  assert.deepEqual(splitCents(2750,5),[550,550,550,550,550]);
  assert.deepEqual(splitCents(1001,5),[201,200,200,200,200]);
  assert.equal(splitCents(3201,5).reduce((sum,part)=>sum+part,0),3201);
  assert.deepEqual(splitCents(100,0),[]);
});
