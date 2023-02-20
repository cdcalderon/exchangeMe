import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISignal } from 'src/app/shared/models/ISignal';

@Component({
  selector: 'app-signal-list',
  templateUrl: './signal-list.component.html',
  styleUrls: ['./signal-list.component.scss'],
})
export class SignalListComponent implements OnInit {
  @Input()
  signals: ISignal[] = [];
  @Output()
  signalSelected = new EventEmitter<ISignal>();

  constructor() {}

  ngOnInit(): void {}

  selectSignal(signal: ISignal) {
    this.signalSelected.emit(signal);
  }
}
