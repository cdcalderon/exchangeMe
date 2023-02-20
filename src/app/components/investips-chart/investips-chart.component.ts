import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { IZigZagFiboSignal } from 'src/app/shared/models/zigzag-fibo-signal';
import { AppState } from 'src/app/store/app.reducer';
import * as providerActions from '../../store/provider.actions';

@Component({
  selector: 'app-investips-chart',
  templateUrl: './investips-chart.component.html',
  styleUrls: ['./investips-chart.component.scss'],
})
export class InvestipsChartComponent implements OnInit, OnChanges {
  private _selectedZigZagSignal: IZigZagFiboSignal;

  @Input()
  set selectedZigZagSignal(selectedZigZagSignal: IZigZagFiboSignal) {
    this._selectedZigZagSignal =
      selectedZigZagSignal || this._selectedZigZagSignal;
  }

  get selectedZigZagSignal(): IZigZagFiboSignal {
    return this._selectedZigZagSignal;
  }

  @Input() marksType: string;

  ngOnChanges(changes: SimpleChanges) {}

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(
      providerActions.loadChart({ chartMode: 'tradingview' })
    );
  }
}
