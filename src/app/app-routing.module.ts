import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeComponent } from './pages/exchange/exchange.component';
import { ContractsResolver } from './shared/services/resolvers/contracts-resolver';

const routes: Routes = [
  {
    path: '',
    component: ExchangeComponent,
    resolve: {
      contractResolver: ContractsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
