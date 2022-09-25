import { ProviderService } from './../../shared/services/provider.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DarkModeService } from 'angular-dark-mode';
import { AppState } from 'src/app/store/app.reducer';
import { EventAggregator } from 'src/app/shared/services/helpers/event-aggregator';
import { filter, map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import _ from 'lodash';

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

  constructor(
    private darkModeService: DarkModeService,
    private eventAggregator: EventAggregator,
    private providerService: ProviderService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.subs = this.eventAggregator.providerConnection
      .pipe(filter((provider) => !_.isEmpty(provider)))
      .subscribe((provider) => this.providerService.loadAccount(provider));

    this.account$ = this.store.select('provider').pipe(map((p) => p.account));
  }

  onToggle(): void {
    this.darkModeService.toggle();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
