export interface Case {
  id: number;
  contents: number;
  open: boolean;
  show: boolean;
}
export interface Value {
  amount: number;
  seen: boolean;
}
export interface Round {
  id: number;
  total: number;
  remaining: number;
}
export interface DealContext {
  board: Value[];
  cases: Case[];
  selectedCase: Case | undefined;
  reveal: boolean;
  removed: Case | undefined;
  offer: number | undefined;
  round: Round | undefined;
  winnings: number | undefined;
  grandTotal: number;
}

export type SelectCaseEvent = { type: 'SELECT_CASE'; id: number; };

export type DealEvent = SelectCaseEvent |
{ type: 'SET_NAME'; } |
{ type: 'DEAL'; } |
{ type: 'NO_DEAL'; } |
{ type: 'SWAP_CASE'; } |
{ type: 'NO_SWAP'; } |
{ type: 'NEW_GAME'; };
/*
- Start new game
- Reset cases and board
- Player to pick a case/
- Start round one (6 cases)
  - Player selects cases revealing values on board
- Offer is made
- Player selects deal of no deal
- if deal, show winnings
- if not, round 2
*/
export interface DealStateSchema {
  states: {
    welcome: {};
    'new': {};
    playing: {
      states: {
        chooseCase: {};
        startRound: {};
        eliminateCase: {};
        showCase: {};
        reviewOffer: {};
        finalSwap: {};
        showWinnings: {};
      };
    };
  };
}
