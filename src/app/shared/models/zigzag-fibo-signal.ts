import { ISignal } from './ISignal';

export class IZigZagFiboSignal extends ISignal {
  aLow: number;
  aHigh: number;
  bHigh: number;
  bLow: number;
  cLow: number;
  cHigh: number;
  cLowestOpenOrClose: number;
  cHighestOpenOrClose: number;
  aDate: Date;
  bDate: Date;
  cDate: Date;
  zigzagType: string;
}
