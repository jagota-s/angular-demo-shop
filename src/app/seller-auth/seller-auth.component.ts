import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent {

  showSignInForm = true;
  isLoginError = false;

  constructor(private sellerService: SellerService) { }

  ngOnInit() {
    this.sellerService.reloadSellerData();
  }

  onSellerLogin(sellerSignInForm: NgForm) {
    this.sellerService.userLogin(sellerSignInForm.value);
    this.sellerService.isLoginError.subscribe((value) => {
      this.isLoginError = value;
    })
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
