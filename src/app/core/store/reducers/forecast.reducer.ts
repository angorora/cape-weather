import { defaultStateFn } from "@ngrx/store";
import { Forecast, Weather, DailyWeather } from '../../models/forecast';
import * as actions from '../actions/preference.action';
import { format } from 'date-fns';
export interface State extends Forecast{
  unit: string;
}

export const defaultState: State = {
    latitude: -33.9258385,
    longitude: 18.4232197,
    timezone: "Africa/Johannesburg",
    unit: "C",
    currentWeather: null,
    hourlyWeather: [],
    dailyWeather: [],
}

export const initialState = defaultState;

export function reducer(initialState: State = defaultState, action:actions.Actions): State{
  switch(action.type){
     case actions.RESPONSELOADED : 
            return { 
                ...initialState,
                dailyWeather: createDailyForecastObject(action.payload.daily.data),
                hourlyWeather: createCurrentOrHourlyForecastObject(action.payload.hourly.data),
                currentWeather: createCurrentForecastObject(action.payload.currently),
            };
     case actions.CHANGE_TEMPERATURE_UNIT : 
            return { 
                ...initialState,
                unit: action.payload,
                dailyWeather: convertDailyTemperature(initialState.dailyWeather,action.payload),
                hourlyWeather: convertHourlyTemperature(initialState.hourlyWeather,action.payload),
                currentWeather: convertCurrentTemperature(initialState.currentWeather,action.payload)
            };
    default:return  {...initialState};

  }
}

function convertTemp(temperature:number, unit: string): number{
   if(unit === "F")
     return  (temperature * (9/5)) + 32;
   if(unit == "C")
     return  (temperature-32) *(5/9);
}

function convertDailyTemperature( dailyWeather: DailyWeather[], unit: string): DailyWeather[]{
    return dailyWeather.map(forecast =>
        ({...forecast,
            temperatureMax: convertTemp(forecast.temperatureMax, unit), 
            temperatureMin: convertTemp(forecast.temperatureMin, unit),
        }));
 }

 function convertHourlyTemperature( hourlyWeather: Weather[], unit: string): Weather[]{
    return hourlyWeather.map(forecast =>
        ({
            ...forecast, temperature: convertTemp(forecast.temperature, unit)
        }));
 }
 function convertCurrentTemperature( hourlyWeather: Weather, unit: string): Weather{
  return {...hourlyWeather, temperature: convertTemp(hourlyWeather.temperature, unit) }
 }
function createDailyForecastObject(responseObject: any): DailyWeather[]{
    if(Array.isArray(responseObject)){
       return  responseObject.map(forecast =>
            ({
                time: getTimeFromUnixTimestamp(forecast.time), 
                date: getDateFromUnixTimestamp(forecast.time),
                summary: forecast.summary,
                icon: forecast.icon,
                temperatureMin: convertTemp(forecast.temperatureMin, "C"),
                temperatureMax: convertTemp(forecast.temperatureMax, "C"),
            }));
    }
    else return [];
}

function createCurrentOrHourlyForecastObject(responseObject: any): Weather[]{
    if(Array.isArray(responseObject)){
        return  responseObject.map(forecast =>
             ({
                 time: getTimeFromUnixTimestamp(forecast.time), 
                 date: getDateFromUnixTimestamp(forecast.time),
                 summary: forecast.summary,
                 icon: forecast.icon,
                 temperature: convertTemp(forecast.temperature, "C"),
              }));
     }
     else return [];
}

function createCurrentForecastObject(responseObject: any): Weather{
    
    return {
             time: getTimeFromUnixTimestamp(responseObject.time), 
             date: getDateFromUnixTimestamp(responseObject.time),
             summary: responseObject.summary,
             icon: responseObject.icon,
             temperature: convertTemp(responseObject.temperature, "C"),
          };
}

function getLocalDate(unixTimeStamp: number){
   return new Date(unixTimeStamp * 1000)
}

function getTimeFromUnixTimestamp(unixTimeStamp: number): string{
    const localDate = getLocalDate(unixTimeStamp);
    return format(localDate,"HH:00");
}

function getDateFromUnixTimestamp(unixTimeStamp: number): string{
    const localDate = getLocalDate(unixTimeStamp);
    return format(localDate,"iii dd MMM yyyy");
}

export const getCurrentWeather = (state: State):Weather => state.currentWeather;
export const getDailyWeather = (state: State):DailyWeather[] => state.dailyWeather;
export const getHourlyWeather = (state: State):Weather[] => state.hourlyWeather;
export const getWeatherUnit = (state: State) => state.unit;



