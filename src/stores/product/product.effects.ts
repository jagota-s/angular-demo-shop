import { Injectable, model } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { setProductData, setProductDataFromApi, addProductData, addProductDataFromApi } from './product.actions';

@Injectable()
export class ProductEffects {

  constructor(
    private actions$: Actions) { }

  public setStore$ = createEffect(() => this.actions$.pipe(
    ofType(setProductDataFromApi),
    switchMap((action) =>
      action.call.pipe(
        map((data) => {
          //console.log("data", data);
          return setProductData({ model: data });
        })
      )
    )
  ));

  public addProductData$ = createEffect(() => this.actions$.pipe(
    ofType(addProductDataFromApi),
    switchMap((action) =>
      action.call.pipe(
        map((data) => {
          console.log("data from api", data);
          return addProductData({ model: data });
        })
      )
    )));
}