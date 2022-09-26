import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ethers } from 'ethers';
import { Observable } from 'rxjs';
import { ResolvedContracts } from 'src/app/shared/models/resolvedContracts';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
})
export class ExchangeComponent implements OnInit {
  provider: ethers.providers.Web3Provider;
  contracts: ResolvedContracts;
  transferInProgress$: Observable<boolean>;
  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.contracts = data['contractResolver'];
      //this.provider = data as ethers.providers.Web3Provider;
    });

    this.transferInProgress$ = this.store.select(
      'exchange',
      'transferInProgress'
    );
  }
}
