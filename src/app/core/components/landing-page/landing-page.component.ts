import { Component, OnInit } from '@angular/core';
import { ForecastService } from 'src/app/services/forecast.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers'
import * as actions from '../../store/actions/preference.action'
import { Observable, timer, interval } from 'rxjs';
import { DailyWeather, Weather } from '../../models/forecast';
import { concatMap, map, filter } from 'rxjs/operators';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  readonly capeTownCoordinates = "-33.9258385,18.4232197";
  dailyWeather$: Observable<DailyWeather[]>;
  currentWeather$: Observable<Weather>;
  hourlyWeather$: Observable<Weather[]>;
  dayHourlyWeather: Weather[];
  hourlyWeather: Weather[];;
  stateUnit: string;
  date: string;

  MAX_C_TEMP = 25;
  MIN_C_TEMP = 15;
  MAX_F_TEMP = 77;
  MIN_F_TEMP = 59;
  CELCIUS_UNIT = 'C';
  FARENHEIT_UNIT = 'F';


  constructor(private forecastService: ForecastService,
    private store: Store<fromRoot.AppState>) {
    this.dailyWeather$ = this.store.select(fromRoot.getDailyWeather);
    this.currentWeather$ = this.store.select(fromRoot.getCurrentWeather);
    this.store.select(fromRoot.getHourlyWeather)
      .subscribe((weather) => {
        console.dir(weather)
        this.hourlyWeather = weather
      });
    this.store.select(fromRoot.getWeatherUnit).subscribe(unit => {
      this.stateUnit = unit;
    });
  }

  ngOnInit() {
    this.initLoad();
    interval(1000 * 60 * 20).pipe(
      concatMap(_ => this.forecastService.getForecast(this.capeTownCoordinates)),
      map((response => this.store.dispatch(new actions.ResponseLoadedAction(response))))
    ).subscribe()
  }

  initLoad() {
    this.forecastService.getForecast(this.capeTownCoordinates)
      .subscribe(response => this.store.dispatch(new actions.ResponseLoadedAction(response)));
  }

  changeTemperatureUnit(unit: string) {
    if (this.stateUnit !== unit)
      this.store.dispatch(new actions.ChangeTemperatureUnitAction(unit));
    this.filterDayHourlyWeather(this.date)
  }

  filterDayHourlyWeather(date: string) {
    this.date = date
    this.dayHourlyWeather = this.hourlyWeather.filter(forecast => forecast.date === this.date);
  }

  //ToDO Unsubscribe explicitly subscribed observables
}
