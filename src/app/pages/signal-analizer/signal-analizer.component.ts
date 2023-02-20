import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';
import { IZigZagFiboSignal } from 'src/app/shared/models/zigzag-fibo-signal';
import { ZigzagFiboWeeklySignalsService } from 'src/app/shared/services/zigzag-fibo-weekly-signals.service';

@Component({
  selector: 'app-signal-analizer',
  templateUrl: './signal-analizer.component.html',
  styleUrls: ['./signal-analizer.component.scss'],
})
export class SignalAnalizerComponent implements OnInit {
  zigZagFibSignalsUp$: Observable<IZigZagFiboSignal[]>;
  defaultSelected = 0;
  selectedSignal: IZigZagFiboSignal;
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

  signalSelected(signal: IZigZagFiboSignal) {
    console.log(signal);
    this.selectedSignal = signal;
  }
}
