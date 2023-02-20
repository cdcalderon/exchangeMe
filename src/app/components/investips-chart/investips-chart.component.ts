import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { ISignal } from 'src/app/shared/models/ISignal';
import { IZigZagFiboSignal } from 'src/app/shared/models/zigzag-fibo-signal';
import { AppState } from 'src/app/store/app.reducer';
import * as providerActions from '../../store/provider.actions';

@Component({
  selector: 'app-investips-chart',
  templateUrl: './investips-chart.component.html',
  styleUrls: ['./investips-chart.component.scss'],
})
export class InvestipsChartComponent implements OnInit, OnChanges {
  private _selectedSignal: ISignal;
  activeSignals = 'zigzag';

  @Input()
  set selectedSignal(selectedSignal: ISignal) {
    console.log('selectedSignal chan', selectedSignal);
    this._selectedSignal = selectedSignal || this._selectedSignal;
  }

  get selectedSignal(): ISignal {
    return this._selectedSignal;
  }

  @Input() marksType: string;

  ngOnChanges(changes: SimpleChanges) {}

  constructor(private store: Store<AppState>) {
    this.store
      .select('signals')
      .pipe(map((s) => s.activeSignal))
      .subscribe((activeSignals) => {
        this.activeSignals = activeSignals;
      });
  }

  ngOnInit(): void {
    this.store.dispatch(
      providerActions.loadChart({ chartMode: 'tradingview' })
    );
  }
}
