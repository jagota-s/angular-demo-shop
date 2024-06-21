import { Injectable, model } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { setProductData, setProductDataFromApi, addProductData, addProductDataFromApi, updateProductDataFromApi, updateProuctData, deleteProduct, deleteProductFromApi } from './product.actions';
import { ProductsService } from '../../services/products.service';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {

  constructor(
    private actions$: Actions,
    private productService: ProductsService) { }

  public setStore$ = createEffect(() => this.actions$.pipe(
    ofType(setProductDataFromApi),
    switchMap((action) =>
      action.call.pipe(
        map((data) => {
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
          return addProductData({ model: data });
        })
      )
    )));

  public updateProduct$ = createEffect(() => this.actions$.pipe(
    ofType(updateProductDataFromApi),
    switchMap((action) =>
      action.call.pipe(
        map((data) => {
          return updateProuctData({ model: data });
        })
      )
    )));

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProductFromApi),
      switchMap(action =>
        this.productService.deleteProduct(action.id).pipe(
          map(() => deleteProduct({ id: action.id })),
          catchError(error => {
            return of({ type: 'DELETE_PRODUCT_ERROR', error: error }); // Example error handling
          })
        )
      )
    )
  );
}