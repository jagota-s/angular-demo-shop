import { Injectable, model } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { setSellerData, setSellerDataFromApi } from './seller.actions';

@Injectable()
export class SellerEffects {

  constructor(
    private actions$: Actions) { }

  public setStore$ = createEffect(() => this.actions$.pipe(
    ofType(setSellerDataFromApi),
    switchMap((action) =>
      action.call.pipe(
        map((data) => {
          console.log("data", data);
          return setSellerData({ model: data });
        })
      )
    )
  ));
}