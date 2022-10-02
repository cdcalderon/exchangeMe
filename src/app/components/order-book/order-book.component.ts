import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from 'src/app/store/app.reducer';

@Component({
  selector: 'app-order-book',
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.scss'],
})
export class OrderBookComponent implements OnInit {
  symbols: string[];
  allOrders$: Observable<any>; // TODO: create interfaces
  constructor(private store: Store<fromStore.AppState>) {
    this.store
      .select(fromStore.getSymbols)
      .subscribe((symbols) => (this.symbols = symbols)); // TODO: use async pipe or unsubscribe OnDestroy

    this.allOrders$ = this.store.select(fromStore.getAllOrdersState);
  }

  ngOnInit(): void {}

  getSellOrderShadow(index: number): string {
    if (8 - index === 0) {
      return '-0';
    } else if (8 - index < 0) {
      return '';
    }

    return '-' + (8 - index) + '0';
  }
}
