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
import { StoreModule } from '@ngrx/store';
import { userDatareducer } from '../stores/user/users.reducers';
import { sellerDatareducer } from '../stores/seller/seller.reducers';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'seller-auth', component: SellerAuthComponent },
  { path: 'seller-home', component: SellerHomeComponent, canActivate: [authGuard] },
  { path: 'seller-add-product', component: SellerAddProductComponent, canActivate: [authGuard] },
  { path: 'seller-update-product/:id', component: SellerUpdateProductComponent },
  { path: 'search/:query', component: SearchPageComponent },
  { path: 'details/:id', component: ProductDetailsComponent },
  { path: 'user-auth', component: UserAuthComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  //imports: [RouterModule.forRoot(routes), StoreModule.forRoot({ user: userDatareducer, seller: sellerDatareducer })],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
