import { Injectable } from '@angular/core';
import { Seller, SellerLogin } from '../../models/seller';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerAuthenticated = new BehaviorSubject<boolean>(false);
  isLoginError = new Subject<boolean>();

  // npx json-server db.json
  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(sellerData: Seller) {
    const result = this.http.post('http://localhost:3000/sellers', sellerData, { observe: 'response' })
      .subscribe(response => {
        if (response) {
          this.isSellerAuthenticated.next(true);
          localStorage.setItem('seller', JSON.stringify(response.body));
          this.router.navigate(['/seller-home']);
        }
      });
  }

  reloadSellerData() {
    const seller = localStorage.getItem('seller')!;
    if (seller) {
      this.isSellerAuthenticated.next(true);
      this.router.navigate(['/seller-home']);
    }
  }

  userLogin(loginData: SellerLogin): void {
    const url = `http://localhost:3000/sellers?email=${loginData.email}&password=${loginData.password}`;
    this.http.get<Seller[]>(url, { observe: 'body' })
      .pipe(
        map(body => body || []), // Ensure body is an array
        catchError((error: HttpErrorResponse) => {
          console.error('Login error', error);
          this.isLoginError.next(true);
          return of([]); // Return an empty array on error
        })
      )
      .subscribe(body => {
        if (body.length > 0) {
          console.log("value", body);
          this.isSellerAuthenticated.next(true);
          localStorage.setItem('seller', JSON.stringify(body[0])); // Store only the first seller object
          this.router.navigate(['/seller-home']);
        } else {
          this.isLoginError.next(true);
        }
      });
  }
}
