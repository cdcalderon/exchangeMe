import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, Observable, tap } from 'rxjs';
import { ISignal } from 'src/app/shared/models/ISignal';
import { ThreeArrowSignal } from 'src/app/shared/models/three-arrow-signal';
import { IZigZagFiboSignal } from 'src/app/shared/models/zigzag-fibo-signal';
import { ZigzagFiboWeeklySignalsService } from 'src/app/shared/services/zigzag-fibo-weekly-signals.service';
import { AppState } from 'src/app/store/app.reducer';
import * as signalActions from '../../store/signals.actions';

@Component({
  selector: 'app-signal-analizer',
  templateUrl: './signal-analizer.component.html',
  styleUrls: ['./signal-analizer.component.scss'],
})
export class SignalAnalizerComponent implements OnInit {
  zigZagFibSignalsUp$: Observable<IZigZagFiboSignal[]>;
  threeGreenArrowsSignals$: Observable<ThreeArrowSignal[]>;
  selectedSignals$: Observable<ISignal[]>;

  defaultSelected = 0;
  selectedSignal: ISignal;
  loading = false;
  activeSignal = 'zigzag';
  constructor(
    private zigzagSignalService: ZigzagFiboWeeklySignalsService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store
      .select('signals')
      .pipe(map((s) => s.activeSignal))
      .subscribe((activeSignal) => {
        this.activeSignal = activeSignal;
        if (this.activeSignal === 'zigzag') {
          this.getSignals();
        } else {
          this.getThreeArrowSignals();
        }
      });
  }

  getSignals() {
    this.loading = true;
    this.zigZagFibSignalsUp$ = this.zigzagSignalService
      .getWeeklyZigZagFibPremiumSignalByDateRange(null, null)
      .pipe(
        filter((signals) => signals != null),
        map(
          (response) =>
            response.signals.filter((s) => s.activationDirection === 'UP')
          // .map((s, i) => {
          //   s.id = i + 1;
          //   s.highlighted = false;
          //   return s;
          // })
        ),
        tap((result) => {
          console.log(JSON.stringify(result, null, '\t'));
          this.loading = false;
        })
      );
  }

  getThreeArrowSignals() {
    this.loading = true;
    this.threeGreenArrowsSignals$ = this.zigzagSignalService
      .getThreeGreenArrowSignals(null, null)
      .pipe(
        filter((signals) => signals != null),
        tap((result) => {
          console.log(JSON.stringify(result, null, '\t'));
          this.loading = false;
        })
      );
  }

  signalSelected(signal: ISignal) {
    console.log(signal);
    this.selectedSignal = signal;
  }

  changeActiveSignal(selectedSignals: string) {
    this.store.dispatch(
      signalActions.changeActiveSignals({ activeSignal: selectedSignals })
    );
  }
}
