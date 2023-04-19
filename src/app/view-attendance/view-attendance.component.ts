import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.css']
})
export class ViewAttendanceComponent implements OnInit {
  isloggedin:boolean
  rollNo:any
  attendanceList:any
  dates:any
  name:string
  constructor(private homeService: HomeService, private route: Router) { 
    this.isUserLoggedIn();
    this.name = homeService.name
  }
  
  ngOnInit(): void {
  }
  
  isUserLoggedIn(){
    this.homeService.isUserLoggedIn().subscribe((result:any)=>{
      this.isloggedin=result;
      console.log(this.isloggedin);
      if(!this.isloggedin){
        this.route.navigateByUrl('login');
      }
      else{
        this.rollNo = this.homeService.rollNo;
        if(this.rollNo == undefined){
          this.route.navigateByUrl('home');
        }
        this.callforData();
      }
    });
  }

  callforData(){
    this.homeService.getAllAttendances(this.rollNo).subscribe((result:any)=>{
      this.attendanceList = result;
      console.log(this.attendanceList);
      this.getDatesData();
    });
  }

  getDatesData(){
    let sevenDaysAgo: Date = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000);
    var now = new Date();
    var dates = [];
    for (var d = new Date(sevenDaysAgo); d <= now; d.setDate(d.getDate() + 1)) {
      let date1 = formatDate(d,'yyyy-MM-dd','en_US');
      dates.push(date1);
    }
    this.dates = dates;
  }

  isPresent(d):boolean{
    if(this.attendanceList == null)
      return false;
    for (let attendance of this.attendanceList){
      if(d === attendance.datePresent)
        return true;
    }
    return false;
  }

  logout(){
    this.homeService.logoutUser().subscribe(
      response=>{
        console.log("SuccessFully Logged Out");
        this.route.navigate(["login"]);
      },
      error=>{
        console.log("Error Occurred",error);
      }
    );
  }

  dashboard(){
    this.route.navigateByUrl('home');
  }

  reset(){
    this.homeService.directToURL = 'home';
    this.homeService.cancel = 'viewAttendance';
    this.route.navigateByUrl('reset');
  }
}
