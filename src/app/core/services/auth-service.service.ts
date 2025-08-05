import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../shared/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  isLoggedIn = new BehaviorSubject<boolean>(
    localStorage.getItem('userToken') ? true : false
  );

  signUp(registerObj: any): Observable<any> {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      registerObj
    );
  }
  login(user: any): Observable<any> {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      user
    );
  }
  logOut() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
    this.isLoggedIn.next(false);
  }

  forgotPassword(email: any): Observable<any> {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
      email
    );
  }
  verifyResetCode(code: any): Observable<any> {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
      code
    );
  }

  resetPassword(user: any): Observable<any> {
    return this.httpClient.put(
      'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
      user
    );
  }
  getUserData() {
    const token = localStorage.getItem('userToken');
    if (token) {
      const user: User = jwtDecode(token);
      return user;
    } else {
      return null;
    }
  }

  openLoginModal() {
    return true;
  }
}
