import { Machine } from 'xstate';
import type { DealContext, DealStateSchema, DealEvent } from './types';

export const dealMachine = Machine<DealContext, DealStateSchema, DealEvent>({
  id: 'make-a-deal',
  context: {
    board: [],
    cases: [],
    selectedCase: undefined,
    removed: undefined,
    offer: undefined,
    round: undefined,
    winnings: undefined,
  },
  on: {
    SET_NAME: {
      actions: ['rename', 'saveNames']
    }
  },
  initial: 'welcome',
  states: {
    'welcome': {
      entry: ['resetGame'],
      on: {
        NEW_GAME: 'playing.chooseCase',
      }
    },
    'new': {
      entry: ['resetGame'],
      on: {
        NEW_GAME: 'playing.chooseCase',
      }
    },
    playing: {
      initial: 'chooseCase',
      states: {
        chooseCase: {
          on: {
            SELECT_CASE: {
              actions: ['chooseCase'],
              target: 'startRound',
            }
          }
        },
        startRound: {
          entry: ['setupRound'],
          always: {
            target: 'eliminateCase'
          }
        },
        eliminateCase: {
          on: {
            SELECT_CASE: {
              actions: ['removeCase'],
              target: 'showCase'
            }
          }
        },
        showCase: {
          after: {
            3000: [
              {
                actions: ['makeOffer'],
                target: 'reviewOffer',
                cond: 'roundOver'
              },
              {
                target: 'eliminateCase'
              }
            ]
          }
        },
        reviewOffer: {
          on: {
            DEAL: {
              actions: ['takeDeal'],
              target: 'showWinnings'
            },
            NO_DEAL: [
              {
                target: 'startRound',
                cond: 'roundsRemain'
              },
              {
                target: 'finalSwap'
              }
            ]
          }
        },
        finalSwap: {
          on: {
            SWAP_CASE: {
              actions: ['swapCases'],
              target: 'showWinnings'
            },
            NO_SWAP: {
              actions: ['checkCase'],
              target: 'showWinnings'
            }
          }
        },
        showWinnings: {
          type: 'final'
        },
      },
      on: {
        NEW_GAME: 'new'
      }
    }
  }
});
