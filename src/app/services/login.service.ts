import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../login/user';
import { tap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl = 'http://localhost:8080/api/v1/users';
  private tokenKey = 'accessToken';
  username = '';

  constructor(private http: HttpClient) { }

  getUserID(): Observable<number>{
    return this.http.get<number>(this.apiUrl + /userID/ + this.username);
  }

  login(user : User): Observable<any> {
    console.log(user);
    return this.http.post<any>(this.apiUrl + '/login', user)
      .pipe(
        tap(response => {
          if (response && response.token) {
            if(response.token != 'Error'){
              this.username = user.userName;
              localStorage.setItem(this.tokenKey, response.token); // Store the token as string
            }
          }
        })
      );
  }

  registerUser(user: User): Observable<number> {
    return this.http.post<number>(this.apiUrl + '/insert', user);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserName(): string | null {
    return this.username;
  }

  getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
}
