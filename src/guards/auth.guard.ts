import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { SellerService } from '../services/seller.service';

export const authGuard: CanActivateFn = (route, state) => {
  // const window = inject(Window);
  // if (window.localStorage.getItem('seller')) {
  //   return true;
  // }
  const val = inject(SellerService).isSellerAuthenticated;
  console.log('guard val', val.value);
  return val;
};
