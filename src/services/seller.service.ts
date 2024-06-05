import { Injectable } from '@angular/core';
import { Seller, SellerLogin } from '../models/seller';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerAuthenticated = new BehaviorSubject<boolean>(true);
  isLoginError = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  reloadSellerData() {
    const seller = localStorage.getItem('loggedInSeller')!;
    if (seller) {
      this.isSellerAuthenticated.next(true);
      this.router.navigate(['/seller-home']);
    }
  }

  userSignUp(sellerData: Seller) {
    return this.http.post<Seller>('http://localhost:3000/sellers', sellerData);
  }


  userLogin(loginData: SellerLogin) {
    const url = `http://localhost:3000/sellers?email=${loginData.email}&password=${loginData.password}`;
    return this.http.get<Seller>(url, { observe: 'body' });
  }
}
