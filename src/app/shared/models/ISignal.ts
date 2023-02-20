export class ISignal {
  id: number;
  symbol: string;
  weekNumber: number;
  activationDirection: string;
  activationPrice: number;
  activationDate: Date;
  support?: number;
  resistence?: number;
  selected?: boolean;
  highlighted?: boolean;
  hovered?: boolean;
  signalType: string;
  isPublished?: boolean;
}
