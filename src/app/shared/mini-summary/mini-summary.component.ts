import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mini-summary',
  templateUrl: './mini-summary.component.html',
  styleUrls: ['./mini-summary.component.css']
})
export class MiniSummaryComponent implements OnInit {
 hours = [6,7,8,9,10,11,12];
  constructor() { }

  ngOnInit() {
  }

}
