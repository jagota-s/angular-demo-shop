import { Injectable, model } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { debug } from 'console';
import { setUserDataFromApi, setUserData } from './users.actions';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions) { }

  public setStore$ = createEffect(() => this.actions$.pipe(
    ofType(setUserDataFromApi),
    switchMap((action) =>
      action.call.pipe(
        map((data) => {
          return setUserData({ model: data });
        })
      )
    )
  ));
}