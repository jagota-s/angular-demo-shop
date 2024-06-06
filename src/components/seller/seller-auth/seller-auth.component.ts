import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SellerService } from '../../../services/seller.service';
import { SellerDataStore } from '../../../stores/seller/seller.state';
import { Store } from '@ngrx/store';
import { setSellerDataFromApi } from '../../../stores/seller/seller.actions';
import { Subscription, catchError, filter } from 'rxjs';
import { selectSellerModel } from '../../../stores/seller/seller.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent implements OnInit, OnDestroy {

  showSignInForm = true;
  isLoginError = false;
  errorMessages = '';
  subscription: Subscription[] = [];

  constructor(private sellerService: SellerService, private store: Store<SellerDataStore>, private router: Router) { }

  ngOnInit() {
    this.sellerService.reloadSellerData();
  }

  onSellerLogin(sellerSignInForm: NgForm) {
    this.store.dispatch(setSellerDataFromApi({ call: this.sellerService.userLogin(sellerSignInForm.value) }));
    const sub = this.store.select(selectSellerModel).pipe(
      filter((data) => !!data)
    ).subscribe((data) => {
      localStorage.setItem('loggedInSeller', JSON.stringify(data));
      this.router.navigate(['/seller-home']);
    });
    this.subscription.push(sub);
  }

  onSellerSignUp(sellerSignUpForm: NgForm) {
    console.log(sellerSignUpForm.value);
    this.store.dispatch(setSellerDataFromApi({ call: this.sellerService.userSignUp(sellerSignUpForm.value) }));
    const sub = this.store.select(selectSellerModel).pipe(
      filter((data) => !!data)
    ).subscribe((data) => {
      localStorage.setItem('loggedInSeller', JSON.stringify(data));
      this.router.navigate(['/seller-home']);
    });
    this.subscription.push(sub);
  }

  showSellerSignInForm() {
    this.showSignInForm = true;
  }

  showSellerSignUpForm() {
    this.showSignInForm = false;
  }
  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
