import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  logoutURL = 'http://localhost:8080/logout';
  isLoggedInURL = 'http://localhost:8080/isLoggedIn';
  markAttendanceURL='http://localhost:8080/markAttendance';
  getStudentURL='http://localhost:8080/getStudent';
  getAllAttendanceURL = 'http://localhost:8080/getAllAttendances';
  resetURL = 'http://localhost:8080/reset';

  public marked: Subject<boolean>;
  rollNo:number
  directToURL:string
  cancel:string
  name:string

  constructor(private httpClient: HttpClient) {
    this.marked = new Subject<boolean>();
  }

  markAttendanceRequest(userData){
    return this.httpClient.post(this.markAttendanceURL,userData, {withCredentials:true});
  }

  isUserLoggedIn(){
    return this.httpClient.get(this.isLoggedInURL, {withCredentials:true});
  }

  logoutUser(){
    return this.httpClient.get(this.logoutURL, {withCredentials:true});
  }

  public async getCurrentData(): Promise<any>{
    console.log("geeting data");
    return this.httpClient.get(this.getStudentURL, {withCredentials:true}).toPromise();
  }

  getAllAttendances(rollNo): Observable <any>{
    console.log(rollNo);
    return this.httpClient.get(this.getAllAttendanceURL+`/${rollNo}`, {withCredentials:true});
  }

  resetPassword(userData){
    console.log("Data : " + userData);
    return this.httpClient.put(this.resetURL, userData, {withCredentials:true});
  }

}
