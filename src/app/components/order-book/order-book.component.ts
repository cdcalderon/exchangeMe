import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-order-book',
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.scss'],
})
export class OrderBookComponent implements OnInit {
  symbols: string[];
  constructor(private store: Store<AppState>) {
    this.store
      .select('token', 'symbols')
      .subscribe((symbols) => (this.symbols = symbols));
  }

  ngOnInit(): void {}
}
