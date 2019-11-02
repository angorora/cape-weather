export interface Forecast{
  latitude?: number;
  longitude?: number;
  timezone: string;
  currentWeather: Weather;
  hourlyWeather: Weather[];
  dailyWeather: DailyWeather[];
}

export class Weather{
    date: string;
    time?: string;
    summary: string;
    icon?: string
    temperature:number;
}
export class DailyWeather{
    date: string;
    summary: string;
    icon?: string
    temperatureMin:number;
    temperatureMax:number;
}