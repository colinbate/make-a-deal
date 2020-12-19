import { readable } from "svelte/store";
import { interpret, StateMachine, EventObject, Typestate, InterpreterOptions } from "xstate";

export function useMachine<TContext, TSchema, TEvents extends EventObject, TStates extends Typestate<TContext>>(machine: StateMachine<TContext, TSchema, TEvents, TStates>, opts?: Partial<InterpreterOptions>) {
  const service = interpret(machine, opts);

  const store = readable(machine.initialState, set => {
    service.onTransition(state => {
      if (state.changed) {
        set(state);
      }
    });

    service.start();

    return () => {
      service.stop();
    };
  });

  return {
    state: store,
    send: service.send
  };
}
