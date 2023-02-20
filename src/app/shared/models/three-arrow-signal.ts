import { ISignal } from './ISignal';

export class ThreeArrowSignal extends ISignal {
  low: number;
  high: number;
  open: number;
  close: number;
  signalIdentifier: string;
}
