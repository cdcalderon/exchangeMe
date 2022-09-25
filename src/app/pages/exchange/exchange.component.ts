import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ethers } from 'ethers';
import { ResolvedContracts } from 'src/app/shared/models/resolvedContracts';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
})
export class ExchangeComponent implements OnInit {
  provider: ethers.providers.Web3Provider;
  contracts: ResolvedContracts;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.contracts = data['contractResolver'];
      //this.provider = data as ethers.providers.Web3Provider;
    });
  }
}
