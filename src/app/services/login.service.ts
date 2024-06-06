import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../login/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) { }

  getUserID(userName: string, password: string): Observable<number>{
    console.log('got user ' + userName);
    return this.http.get<number>(this.apiUrl + /userID/ + userName, {
      params: new HttpParams()
      .set('userPassword', password)
    });
  }

  registerUser(user: User): Observable<number> {
    return this.http.post<number>(this.apiUrl + '/insert', user);
  }
}
