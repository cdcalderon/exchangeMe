import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from 'src/app/store/app.reducer';

@Component({
  selector: 'app-history-order',
  templateUrl: './history-order.component.html',
  styleUrls: ['./history-order.component.scss'],
})
export class HistoryOrderComponent implements OnInit {
  myOpenOrders$: Observable<any>; // TODO: create interfaces
  myFilledOrders$: Observable<any>; // TODO: create interfaces
  symbols$: Observable<string[]>;
  constructor(private store: Store<fromStore.AppState>) {}

  ngOnInit(): void {
    this.symbols$ = this.store.select(fromStore.getSymbolsSelector);
    this.myOpenOrders$ = this.store.select(fromStore.myOpenOrdersSelector);
    this.myFilledOrders$ = this.store.select(fromStore.myFilledOrdersSelector);
  }
}
