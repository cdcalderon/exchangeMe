export interface IZigZagFiboSignal {
  id: number;
  symbol: string;
  weekNumber: number;
  activationDirection: string;
  activationPrice: number;
  activationDate: Date;
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
  support?: number;
  resistence?: number;
  selected?: boolean;
  highlighted?: boolean;
  hovered?: boolean;
  signalType: string;
  isPublished: boolean;
}
