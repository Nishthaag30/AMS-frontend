import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupAsAdminService {

  signupAdminURL = 'http://localhost:8080/signup-asAdmin'

  constructor(private httpClient: HttpClient) { }
  readAll(): Observable<any> {
    return this.httpClient.get(this.signupAdminURL);
  }
  register(userData){
    return this.httpClient.post(this.signupAdminURL, userData,{ withCredentials: true });
  }
}
