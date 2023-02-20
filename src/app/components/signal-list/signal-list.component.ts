import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-signal-list',
  templateUrl: './signal-list.component.html',
  styleUrls: ['./signal-list.component.scss'],
})
export class SignalListComponent implements OnInit {
  @Input()
  signals = [];

  constructor() {}

  ngOnInit(): void {}
}
