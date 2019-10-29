import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  hours = [6,7,8,9,10,11,12];
  constructor() { }

  ngOnInit() {
  }

}
