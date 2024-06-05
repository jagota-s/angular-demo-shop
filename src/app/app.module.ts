import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/common/header/header.component';
import { HomeComponent } from '../components/home/home.component';
import { SellerAuthComponent } from '../components/seller/seller-auth/seller-auth.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SellerHomeComponent } from '../components/seller/seller-home/seller-home.component';
import { SellerAddProductComponent } from '../components/seller/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from '../components/seller/seller-update-product/seller-update-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchPageComponent } from '../components/search-page/search-page.component';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';
import { UserAuthComponent } from '../components/user/user-auth/user-auth.component';
import { FooterComponent } from '../components/common/footer/footer.component';
import { StoreModule } from '@ngrx/store';
import { userDatareducer } from '../stores/user/users.reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '../stores/user/users.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { USER_DATA_STORE_NAME } from '../stores/user/users.state';
import { SELLER_DATA_STORE_NAME } from '../stores/seller/seller.state';
import { sellerDatareducer } from '../stores/seller/seller.reducers';
import { SellerEffects } from '../stores/seller/sellers.effects';
import { PRODUCT_DATA_STORE_NAME } from '../stores/product/product.state';
import { productDataReducerFeatures, productDatareducer } from '../stores/product/product.reducers';
import { ProductEffects } from '../stores/product/product.effects';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SellerAuthComponent,
    SellerHomeComponent,
    SellerAddProductComponent,
    SellerUpdateProductComponent,
    SearchPageComponent,
    ProductDetailsComponent,
    UserAuthComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    StoreModule.forRoot({
      [USER_DATA_STORE_NAME]: userDatareducer,
      [SELLER_DATA_STORE_NAME]: sellerDatareducer,
      [PRODUCT_DATA_STORE_NAME]: productDatareducer
    }),
    EffectsModule.forRoot([UserEffects, SellerEffects, ProductEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: false }),
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
