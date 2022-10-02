import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from 'src/app/store/app.reducer';

@Component({
  selector: 'app-market-history',
  templateUrl: './market-history.component.html',
  styleUrls: ['./market-history.component.scss'],
})
export class MarketHistoryComponent implements OnInit {
  filledOrders$: Observable<any>; // TODO: create interfaces
  symbols$: Observable<string[]>;
  constructor(private store: Store<fromStore.AppState>) {}

  ngOnInit(): void {
    this.filledOrders$ = this.store.select(fromStore.filledOrdersSelector);
    this.symbols$ = this.store.select(fromStore.getSymbolsSelector);
  }
}
