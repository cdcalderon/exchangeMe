import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ethers } from 'ethers';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
})
export class ExchangeComponent implements OnInit {
  provider: ethers.providers.Web3Provider;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      console.log('TOKKKKKKKKKKKKKKKKKKKKKKKKKK ', data);
      //this.provider = data as ethers.providers.Web3Provider;
    });
  }
}
