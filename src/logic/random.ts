import type { Case, Value } from './types';

const MAX_INT = 2147483647;
const CHARSET = 'abcdefghijkmnpqrstuvwxyz-ABCDEFGHJKLMNPQRSTUVWXYZ_23456789';
const CLEN = CHARSET.length;
const DEFAULT_ID_LENGTH = 5;

function rand() {
  const a = new Uint32Array(1);
  window.crypto.getRandomValues(a);
  return (a[0] & MAX_INT) / MAX_INT;
}

export function randInt(maxExclusive: number) {
  return Math.floor(rand() * maxExclusive);
}

function shuffle<T>(original: T[]) {
  const array = [...original];
  for (let i = array.length - 1; i > 0; i--) {
    let j = randInt(i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


const allValues = [
  0.01,
  1,
  5,
  10,
  25,
  50,
  75,
  100,
  200,
  300,
  400,
  500,
  750,
  1000,
  5000,
  10000,
  25000,
  50000,
  75000,
  100000,
  200000,
  300000,
  400000,
  500000,
  750000,
  1000000,
];

export function getNewBoard() {
  return allValues.map(amount => ({ amount, seen: false }));
}

export function getNewCases() {
  const randomized = shuffle(allValues);
  const cases: Case[] = [];
  for (let ii = 1; ii <= 26; ii += 1) {
    cases.push({
      id: ii,
      contents: randomized[ii - 1],
      open: false,
      show: true
    });
  }
  return cases;
}

export function calculateOffer(board: Value[]) {
  let count = 0;
  const sum = board.reduce((p, c) => p + (!c.seen && (count += 1) ? c.amount : 0), 0);
  const offer = Math.floor(sum / count);
  return (offer > 2500 ? (Math.round(offer / 1000) * 1000) : (offer > 75 ? Math.round(offer / 100) * 100 : offer));
}

const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0, minimumFractionDigits: 0 });
const smallfmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
export function asMoney(x: number) {
  return x < 1 ? smallfmt.format(x) : fmt.format(x);
}

export function shortId(len = DEFAULT_ID_LENGTH) {
  let out = '';
  while (len) {
    const r = rand() * CLEN;
    out += CHARSET.charAt(r);
    len -= 1;
  }
  return out;
}
