import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ethers } from 'ethers';
import { Observable } from 'rxjs';
import { ResolvedContracts } from 'src/app/shared/models/resolvedContracts';
import { AppState } from 'src/app/store/app.reducer';
import { DarkModeService } from 'angular-dark-mode';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
})
export class ExchangeComponent implements OnInit {
  provider: ethers.providers.Web3Provider;
  transferInProgress$: Observable<boolean>;
  darkMode$ = this.darkModeService.darkMode$;

  @Input() contracts: ResolvedContracts;
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private darkModeService: DarkModeService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.contracts = data['contractResolver'];
    });

    this.transferInProgress$ = this.store.select(
      'exchange',
      'transferInProgress'
    );
  }
}
