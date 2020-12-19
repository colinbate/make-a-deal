import { assign, MachineOptions } from 'xstate';
import type { DealContext, SelectCaseEvent } from './types';
import { getNewBoard, getNewCases, calculateOffer } from './random';

const resetGame = assign<DealContext>({
  board: () => getNewBoard(),
  cases: () => getNewCases(),
  selectedCase: undefined,
  offer: undefined,
  round: undefined,
  removed: undefined,
  winnings: undefined,
});

const chooseCase = assign<DealContext, SelectCaseEvent>({
  selectedCase: (ctx, ev) => ctx.cases.find(c => c.id === ev.id),
  cases: (ctx, ev) => {
    const which = ctx.cases.findIndex(c => c.id === ev.id);
    ctx.cases[which].open = true;
    ctx.cases[which].show = false;
    return ctx.cases;
  }
});

const setupRound = assign<DealContext>({
  round: ctx => {
    if (ctx.round == null) {
      return {
        id: 1,
        total: 6,
        remaining: 6
      };
    } else {
      return {
        id: ctx.round.id + 1,
        total: Math.max(ctx.round.total - 1, 1),
        remaining: Math.max(ctx.round.total - 1, 1)
      };
    }
  },
  cases: ctx => {
    ctx.cases.forEach(c => {
      if (c.open) {
        c.show = false;
      }
    });
    return ctx.cases;
  }
});

const removeCase = assign<DealContext, SelectCaseEvent>({
  board: (ctx, ev) => {
    const which = ctx.cases.findIndex(c => c.id === ev.id);
    const val = ctx.cases[which].contents;
    const item = ctx.board.find(b => b.amount === val);
    item.seen = true;
    return ctx.board;
  },
  cases: (ctx, ev) => {
    const which = ctx.cases.findIndex(c => c.id === ev.id);
    ctx.cases[which].open = true;
    return ctx.cases;
  },
  removed: (ctx, ev) => {
    const which = ctx.cases.find(c => c.id === ev.id);
    return which;
  },
  round: ctx => {
    ctx.round.remaining -= 1;
    return ctx.round;
  }
});

const makeOffer = assign<DealContext>({
  offer: ctx => calculateOffer(ctx.board)
});

const takeDeal = assign<DealContext>({
  winnings: ctx => ctx.offer
});

const swapCases = assign<DealContext>({
  winnings: ctx => ctx.cases.find(c => !c.open).contents
});

const checkCase = assign<DealContext>({
  winnings: ctx => ctx.selectedCase.contents
});

const roundOver = (ctx: DealContext) => ctx.round.remaining === 0;

const roundsRemain = (ctx: DealContext) => ctx.cases.reduce((p, c) => p + (c.open ? 0 : 1), 0) > 1;

export const options: Partial<MachineOptions<DealContext, any>> = {
  actions: {
    resetGame,
    chooseCase,
    setupRound,
    removeCase,
    makeOffer,
    takeDeal,
    swapCases,
    checkCase,
  },
  guards: {
    roundOver,
    roundsRemain,
  }
};