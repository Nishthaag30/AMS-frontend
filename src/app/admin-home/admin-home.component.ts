import { Component, OnInit } from '@angular/core';
import { AdminHomeService } from '../admin-home.service'; 
import { Router } from '@angular/router';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  isAdminloggedin:boolean
  studentList:any;
  totalStudent=0;
  name:string
  // avgAttendance=0.0;

  constructor(private route: Router, private adminHomeService: AdminHomeService, private homeService:HomeService) { }

  public async ngOnInit(): Promise<void> {
    this.adminHomeService.isAdminLoggedIn().subscribe((result:any)=>{
      this.isAdminloggedin=result;
      console.log(this.isAdminloggedin);
      if(!this.isAdminloggedin){
        this.route.navigateByUrl('loginAdmin');
      }
    });
    this.name = this.adminHomeService.name;
    this.studentList = await this.adminHomeService.readAll();
    this.totalStudent = this.studentList.length;
    // this.averageAttendance();
  }

  // averageAttendance(){
  //   let total=0;
  //   for(let student of this.studentList){
  //     total = total + student.tAttendance;
  //   }
  //   this.avgAttendance = total / this.totalStudent;
  // }

  logout(){
    this.adminHomeService.logoutAdmin().subscribe(
      response=>{
        console.log("SuccessFully Logged Out");
        this.route.navigate(["loginAdmin"]);
      },
      error=>{
        console.log("Error Occurred", error);
      }
    );
  }

  studentPage(){
    this.route.navigateByUrl("student-details");
  }
 
  reset(){
    this.homeService.directToURL = 'admin-home';
    this.homeService.cancel = 'admin-home';
    this.route.navigateByUrl('reset');
  }
}
