import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddStudentService {
  
  addStudentURL = 'http://localhost:8080/addStudent';
  studentSignupURL = 'http://localhost:8080/signup';
  
  constructor(private httpClient : HttpClient) { }
  readAll():Observable<any>{
    return this.httpClient.get(this.addStudentURL);
  }
  sendRequest(userData){
    return this.httpClient.post(this.addStudentURL, userData, { withCredentials : true});
  }
  studentSignup(studentData){
    return this.httpClient.post(this.studentSignupURL, studentData, { withCredentials : true});
  }
}
