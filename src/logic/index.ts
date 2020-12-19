import { dealMachine } from './deal-machine';
import { useMachine } from './use-machine';
import { options } from './actions';
import type { DealContext, DealEvent, DealStateSchema } from './types';
import type { Typestate } from 'xstate';

// const names = JSON.parse((window && window.localStorage.getItem('YAHTZEE_NAMES')) || 'null');
const { state, send } = useMachine<DealContext, DealStateSchema, DealEvent, Typestate<DealContext>>(dealMachine.withConfig(options).withContext({
  ...dealMachine.context
}), {
  devTools: true
});

export { state, send };
