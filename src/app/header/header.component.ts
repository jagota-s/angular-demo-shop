import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fileURLToPath } from 'node:url';
import { UserType } from '../../models/userTypes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  menutype = UserType.Default;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menutype = UserType.Seller;
        } else {
          this.menutype = UserType.Default;
        }
      }
    })
  }

  onSellerLogout() {
    localStorage.removeItem('seller');
  }

  logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }

  get sellerName() {
    const val = JSON.parse(localStorage.getItem('seller')!).name;
    return val;
  }

}
