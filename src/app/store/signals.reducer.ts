import { Action, createReducer, on } from '@ngrx/store';
import { changeActiveSignals } from './signals.actions';

export interface SgnalsState {
  activeSignal: string;
}

export const initialState: SgnalsState = {
  activeSignal: 'zigzag',
};

export const signalsReducer = createReducer(
  initialState,
  on(changeActiveSignals, (state, { activeSignal }) => ({
    ...state,
    activeSignal,
  }))
);
