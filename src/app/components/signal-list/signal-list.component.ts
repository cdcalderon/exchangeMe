import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IZigZagFiboSignal } from 'src/app/shared/models/zigzag-fibo-signal';

@Component({
  selector: 'app-signal-list',
  templateUrl: './signal-list.component.html',
  styleUrls: ['./signal-list.component.scss'],
})
export class SignalListComponent implements OnInit {
  @Input()
  signals: IZigZagFiboSignal[] = [];
  @Output()
  signalSelected = new EventEmitter<IZigZagFiboSignal>();

  constructor() {}

  ngOnInit(): void {}

  selectSignal(signal: IZigZagFiboSignal) {
    this.signalSelected.emit(signal);
  }
}
