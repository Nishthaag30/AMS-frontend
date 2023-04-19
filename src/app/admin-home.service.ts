import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminHomeService {
  getStudentListURL = 'http://localhost:8080/getAllStudents';
  deleteStudentURl = 'http://localhost:8080/deleteStudent';
  logoutURL = 'http://localhost:8080/logout';
  isAdminLoggedInURL = 'http://localhost:8080/isAdminLoggedIn';
  getStudentURL = 'http://localhost:8080/getStudentByRollNo';
  updateStudentURl= 'http://localhost:8080/updateStudent';
  updateAttendanceURL= 'http://localhost:8080/updateAttendance';
  getAllAttendanceURL = 'http://localhost:8080/getAllAttendances';

  public studentDeleted: Subject<boolean>;
  up_rollno: any
  dialogbox:string
  name:string
  
  constructor(private httpClient: HttpClient) {
    this.studentDeleted = new Subject<boolean>();
  }

  public async readAll() : Promise<any>{
    return this.httpClient.get(this.getStudentListURL).toPromise();
  }

  deleteStudentHttpRequest(rollNo){
    console.log(rollNo);
    return this.httpClient.delete(this.deleteStudentURl+`/${rollNo}`);
  }

  logoutAdmin(){
    return this.httpClient.get(this.logoutURL, {withCredentials:true});
  }

  isAdminLoggedIn(){
    return this.httpClient.get(this.isAdminLoggedInURL, {withCredentials:true});
  }

  getStudentData(rollNo): Observable<any> {
    return this.httpClient.get(this.getStudentURL + `/${rollNo}`);
  }

  getAllAttendances(rollNo): Observable <any>{
    return this.httpClient.get(this.getAllAttendanceURL+`/${rollNo}`, {withCredentials:true});
  }

  updateStudent(userData): Observable<any>{
    console.log("userData : ", userData);
    return this.httpClient.put(this.updateStudentURl, userData, {withCredentials:true});
  }

  updateAttendance(datesData){
    console.log( " Dates data : " + datesData );
    return this.httpClient.put(this.updateAttendanceURL, datesData, {withCredentials:true});
  }

  
}
