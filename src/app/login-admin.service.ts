import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginAdminService {
  loginAdminURL = 'http://localhost:8080/loginAdmin';
  
  constructor(private httpClient: HttpClient) { }
  readAll(): Observable<any> {
    return this.httpClient.get(this.loginAdminURL);
  }
  register(userData){
    return this.httpClient.post(this.loginAdminURL, userData,{ withCredentials: true });
  }
}
