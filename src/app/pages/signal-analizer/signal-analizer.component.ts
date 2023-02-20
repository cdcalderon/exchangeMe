import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';
import { ISignal } from 'src/app/shared/models/ISignal';
import { ThreeArrowSignal } from 'src/app/shared/models/three-arrow-signal';
import { IZigZagFiboSignal } from 'src/app/shared/models/zigzag-fibo-signal';
import { ZigzagFiboWeeklySignalsService } from 'src/app/shared/services/zigzag-fibo-weekly-signals.service';

@Component({
  selector: 'app-signal-analizer',
  templateUrl: './signal-analizer.component.html',
  styleUrls: ['./signal-analizer.component.scss'],
})
export class SignalAnalizerComponent implements OnInit {
  zigZagFibSignalsUp$: Observable<IZigZagFiboSignal[]>;
  threeGreenArrowsSignals$: Observable<ThreeArrowSignal[]>;
  defaultSelected = 0;
  selectedSignal: ISignal;
  loading = false;
  constructor(private zigzagSignalService: ZigzagFiboWeeklySignalsService) {}

  ngOnInit(): void {
    this.getSignals();
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
}
