import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { SellerAuthComponent } from '../components/seller/seller-auth/seller-auth.component';
import { SellerHomeComponent } from '../components/seller/seller-home/seller-home.component';
import { authGuard } from './../guards/auth.guard';
import { SellerAddProductComponent } from '../components/seller/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from '../components/seller/seller-update-product/seller-update-product.component';
import { SearchPageComponent } from '../components/search-page/search-page.component';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';
import { UserAuthComponent } from '../components/user/user-auth/user-auth.component';
import { CartComponent } from '../components/user/cart/cart.component';
import { CheckoutComponent } from '../components/user/checkout/checkout.component';
import { OrderListComponent } from '../components/user/order-list/order-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'seller-auth', component: SellerAuthComponent },
  { path: 'seller-home', component: SellerHomeComponent, canActivate: [authGuard] },
  { path: 'seller-add-product', component: SellerAddProductComponent, canActivate: [authGuard] },
  { path: 'seller-update-product/:id', component: SellerUpdateProductComponent },
  { path: 'search/:query', component: SearchPageComponent },
  { path: 'details/:id', component: ProductDetailsComponent },
  { path: 'user-auth', component: UserAuthComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order-list', component: OrderListComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
