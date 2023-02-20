import { IPaginationMetadata } from './pagination-matadata';
import { IZigZagFiboSignal } from './zigzag-fibo-signal';

export interface PagedSignalList {
  metadata: IPaginationMetadata;
  signals: IZigZagFiboSignal[];
}
