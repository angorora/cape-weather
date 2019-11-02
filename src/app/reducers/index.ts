import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as fromForecast from '../core/store/reducers/forecast.reducer'
import { environment } from '../../environments/environment';

export interface AppState {
  forecast: fromForecast.State
}

export const reducers: ActionReducerMap<AppState> = {
    forecast: fromForecast.reducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const selectForecast = (state: AppState) => state.forecast
export const getDailyWeather = createSelector(selectForecast, (state: fromForecast.State) => {
  return state.dailyWeather;
}); 
export const getHourlyWeather = createSelector(selectForecast, fromForecast.getHourlyWeather); 
export const getCurrentWeather = createSelector(selectForecast, fromForecast.getCurrentWeather); 
export const getWeatherUnit = createSelector(selectForecast, fromForecast.getWeatherUnit);
