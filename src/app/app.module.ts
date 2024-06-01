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
import { FooterComponent } from '../components/common/footer/footer.component'

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
    NgbModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
