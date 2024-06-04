import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserDataState, userDataStore } from '../../../stores/user/users.state';
import { setUserDataFromApi } from '../../../stores/user/users.actions';
import { selectUserData, selectUserModel } from '../../../stores/user/users.selectors';
import { Subscription, catchError, filter } from 'rxjs';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',


})
export class UserAuthComponent implements OnInit {

  showLogin = true;
  authErrorMessage = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store<userDataStore>) { }

  subscription: Subscription[] = [];

  ngOnInit(): void {
    if (localStorage) {
      if (localStorage.getItem('loggedInUser')) {
        this.router.navigate(['/']);
      }
    }
  }

  onUserLogin(loginForm: NgForm) {
    this.store.dispatch(setUserDataFromApi({
      call: this.userService.userLogin(loginForm.value)
    }));
    const sub = this.store.select(selectUserModel).pipe(
      filter((data) => !!data),
      catchError((error) => {
        this.authErrorMessage = "Invalid email or password";
        return error;
      }))
      .subscribe((data) => {
        localStorage.setItem('loggedInUser', JSON.stringify(data));
        this.router.navigate(['/']);
      });
    this.subscription.push(sub);
  }

  onUserSignUp(signUpForm: NgForm) {
    this.store.dispatch(setUserDataFromApi({ call: this.userService.userSignUp(signUpForm.value) }));
    const sub = this.store.select(selectUserModel).pipe(
      filter((data) => !!data),
      catchError((error) => {
        this.authErrorMessage = "Invalid email or password";
        return error;
      }))
      .subscribe((data) => {
        localStorage.setItem('loggedInUser', JSON.stringify(data));
        this.router.navigate(['/']);
      });
    this.subscription.push(sub);
  }

  showUserSignInForm() {
    this.showLogin = true;
  }

  showUserSignUpForm() {
    this.showLogin = false;
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

}
