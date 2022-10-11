import { ProviderService } from './../../shared/services/provider.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DarkModeService } from 'angular-dark-mode';
import { AppState } from 'src/app/store/app.reducer';
import { EventAggregator } from 'src/app/shared/services/helpers/event-aggregator';
import { filter, map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import _ from 'lodash';
import { ethers } from 'ethers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  darkMode$ = this.darkModeService.darkMode$;
  account = '';
  subs: Subscription = {} as Subscription;
  account$!: Observable<string>;
  provider$!: Observable<ethers.providers.Web3Provider>;

  constructor(
    private darkModeService: DarkModeService,
    private eventAggregator: EventAggregator,
    private providerService: ProviderService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.provider$ = this.eventAggregator.providerConnection;
    this.account$ = this.store.select('provider').pipe(map((p) => p.account));
  }

  onToggle(): void {
    this.darkModeService.toggle();
  }

  loadAccount(provider: ethers.providers.Web3Provider) {
    this.providerService.loadAccount(provider);
  }

  ngOnDestroy(): void {}
}
