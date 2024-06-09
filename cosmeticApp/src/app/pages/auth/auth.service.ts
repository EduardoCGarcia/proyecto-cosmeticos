import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { User, UserResponse } from './usuario';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<UserResponse | null>(null);
  public user$: Observable<UserResponse | null> = this.userSubject.asObservable();

  private AUTH_SERVER = 'http://localhost:3000/api/auth';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.checkToken();
  }

  get userValue(): UserResponse | null {
    return this.userSubject.getValue();
  }

  login(authData: User): Observable<UserResponse | void> {
    return this.http.post<UserResponse>(`${this.AUTH_SERVER}/login`, authData).pipe(
      map((user: UserResponse) => {
        this.saveLocalStorage(user);
        this.userSubject.next(user);
        this.checkToken()
        return user;
      }),
      catchError((error) => this.handleError(error))
    );
  }

  private checkToken(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user: UserResponse = JSON.parse(userData);
      const isExpired = helper.isTokenExpired(user.token);

      if (isExpired) {
        this.logout();
      } else {
        this.userSubject.next(user);
      }
    }
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }

  private saveLocalStorage(user: UserResponse): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'Algo sucedió';
    if (error) {
      errorMessage = `Error: code ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  register(user: User): Observable<UserResponse | void> {
    return this.http.post<UserResponse>(`${this.AUTH_SERVER}/register`, user).pipe(
      map((res: UserResponse) => {
        return res;
      }),
      catchError((error) => this.handleError(error))
    );
  }
}
