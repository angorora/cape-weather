import { Injectable } from '@angular/core';
import * as fromForecast from '../reducers/forecast.reducer'
import { Store } from '@ngrx/store';
import * as forecastActions from "../actions/preference.action"
import { Effect, Actions, ofType } from '@ngrx/effects';
@Injectable()
export class FieldEffects {
    constructor(
        private store: Store<fromForecast.State>,
        private actions: Actions
          ) {}

    // to be removed
    // @Effect()
    // $initialLoad = this.actions.pipe(ofType<forecastActions.ResponseLoadedAction>(forecastActions.RESPONSELOADED))
}