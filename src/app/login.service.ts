import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginURL = 'http://localhost:8080/login';
  
  constructor(private httpClient: HttpClient) { }
  readAll(): Observable<any> {
    return this.httpClient.get(this.loginURL);
  }
  register(userData){
    return this.httpClient.post(this.loginURL, userData,{ withCredentials: true });
  }
}
