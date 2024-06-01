import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent implements OnInit {

  showLogin = true;
  authErrorMessage = '';

  constructor() { }

  ngOnInit(): void {
  }

  onUserLogin(loginForm: NgForm) {
  }

  onUserSignUp(signUpForm: NgForm) {
  }

  showUserSignInForm() {
    this.showLogin = true;
  }

  showUserSignUpForm() {
    this.showLogin = false;
  }

}
