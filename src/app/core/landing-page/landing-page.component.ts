import { Component, OnInit } from '@angular/core';
import { ForecastService } from 'src/app/services/forecast.service';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  public hours = [6,7,8,9,10,11,12];
  private  readonly capeTownCoordinates = "-33.9258385,18.4232197";
  result: any;
  constructor(private forecastService: ForecastService) { }

  ngOnInit() {
    this.forecastService.getForecast(this.capeTownCoordinates)
                        .subscribe(res=>{
                          this.result = res;
                          console.dir(this.result);
                        });
  }

}
