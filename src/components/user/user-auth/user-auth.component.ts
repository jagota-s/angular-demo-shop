import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent implements OnInit {

  showLogin = true;
  authErrorMessage = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('loggedInUser')) {
      this.router.navigate(['/']);
    }
  }

  onUserLogin(loginForm: NgForm) {
    this.userService.userLogin(loginForm.value).subscribe((response) => {
      localStorage.setItem('loggedInUser', JSON.stringify(response));
      this.router.navigate(['/']);
    });
  }

  onUserSignUp(signUpForm: NgForm) {
    this.userService.userSignUp(signUpForm.value).subscribe((response) => {
      if (response) {
        localStorage.setItem('loggedInUser', JSON.stringify(response));
        this.router.navigate(['/']);
      }
    })
  }

  showUserSignInForm() {
    this.showLogin = true;
  }

  showUserSignUpForm() {
    this.showLogin = false;
  }

}
