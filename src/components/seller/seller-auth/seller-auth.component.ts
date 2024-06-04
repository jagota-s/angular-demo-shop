import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SellerService } from '../../../services/seller.service';
import { SellerDataStore } from '../../../stores/seller/seller.state';
import { Store } from '@ngrx/store';
import { setSellerDataFromApi } from '../../../stores/seller/seller.actions';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent {

  showSignInForm = true;
  isLoginError = false;

  constructor(private sellerService: SellerService, private store: Store<SellerDataStore>) { }

  ngOnInit() {
    this.sellerService.reloadSellerData();
  }

  onSellerLogin(sellerSignInForm: NgForm) {

    // this.sellerService.userLogin(sellerSignInForm.value);
    // this.sellerService.isLoginError.subscribe((value) => {
    //   this.isLoginError = value;
    // })

    const sub = this.store.dispatch(setSellerDataFromApi({ call: this.sellerService.userLogin(sellerSignInForm.value) }));
    //this.store.dispatch(setUserDataFromApi({ call: this.userService.userSignUp(signUpForm.value) }));
  }

  onSellerSignUp(sellerSignUpForm: NgForm) {
    console.log(sellerSignUpForm.value);
    this.sellerService.userSignUp(sellerSignUpForm.value);
  }

  showSellerSignInForm() {
    this.showSignInForm = true;
  }

  showSellerSignUpForm() {
    this.showSignInForm = false;
  }
}
