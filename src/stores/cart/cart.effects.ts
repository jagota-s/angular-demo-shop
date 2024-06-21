import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addToCart, addToCartFromApi, updateCart, updateCartFromApi } from './cart.action';
import { map, switchMap } from 'rxjs/operators'; // Ensure you import from 'rxjs/operators'

@Injectable()
export class CartEffects {
  constructor(private actions$: Actions) { }


  public setCart$ = createEffect(() => this.actions$.pipe(
    ofType(addToCartFromApi),
    switchMap((action) =>
      action.call.pipe(
        map((data) => {
          console.log("data", data);
          return addToCart({ model: data });
        })
      )
    ))
  );

  public updateCart$ = createEffect(() => this.actions$.pipe(
    ofType(updateCartFromApi),
    switchMap((action) =>
      action.call.pipe(
        map((data) => {
          console.log("data", data);
          return updateCart({ model: data });
        })
      )
    ))
  );


}