import { createAction, props } from '@ngrx/store';

export const changeActiveSignals = createAction(
  '[ACTIVE_SIGNALS_CHANGED] ActiveSignalsChanged',
  props<{ activeSignal: string }>()
);
