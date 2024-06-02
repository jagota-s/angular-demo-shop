import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  userSignUp(userData: User) {
    return this.http.post('http://localhost:3000/users', userData);
  }

  userLogin(loginData: User) {
    return this.http.get<User>(`http://localhost:3000/users?email=${loginData.email}&password=${loginData.password}`);
  }
}
