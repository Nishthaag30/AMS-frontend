import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { AdminHomeService } from '../admin-home.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogueComponent } from '../confirm-dialogue/confirm-dialogue.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isloggedin:boolean
  studentData:any
  data:any
  marked : boolean = false;
  
  constructor(private homeService : HomeService, private route: Router, private adminHomeService: AdminHomeService, private dialog:MatDialog) { 
    
  }

  ngOnInit() {
    this.checkUserLogin();
    this.getData();
    this.checkMarked();
    console.log("isMArked : ", this.marked);
  }
  
  checkUserLogin(){
    this.homeService.isUserLoggedIn().subscribe((result:any)=>{
      this.isloggedin=result;
      console.log(this.isloggedin);
      if(!this.isloggedin){
        this.route.navigateByUrl('login');
      }else{
        this.getData();
        this.checkMarked();
        this.homeService.marked.next(true);
      }
    });
  }

  public async getData(): Promise<void>{
    this.studentData = await this.homeService.getCurrentData();
    console.log("Student Data : ",this.studentData);
    this.initReferesh();
  }

  public initReferesh(){
    this.homeService.marked.subscribe(async (data:any)=>{
      if(data){
        this.checkMarked();
      }
    })
  }
  
  checkMarked(){
    this.homeService.getAllAttendances(this.studentData?.rollNo).subscribe((result:any)=>{
      var d = new Date();
      let now = formatDate(d,'yyyy-MM-dd','en_US');
      console.log(now);
      for(let x of result){
        if(x.datePresent === now){
          this.marked = true;
          console.log("marked", this.marked);
          return;
        }
      }
    })
    console.log("marked value: ", this.marked);
  }
  
  logout(){
    this.homeService.logoutUser().subscribe(
      response=>{
        console.log("SuccessFully Logged Out");
        this.route.navigate(["login"]);
      },
      error=>{
        console.log("Error Occurred", error);
      }
    );
  }

  markAttendance(){
    this.adminHomeService.dialogbox="markPresent";
    let userData = this.studentData;
    console.log("Userdata transeferred = ", userData);
    let dialogRef = this.dialog.open(ConfirmDialogueComponent, {
      data:{userData}
    });
    dialogRef.afterClosed().subscribe(result=>{
      console.log(`Dialog Result : ${result}`);
    })
  }

  attendancePage(){
    this.homeService.rollNo = this.studentData.rollNo;
    this.homeService.name = this.studentData.name;
    this.route.navigateByUrl('viewAttendance');
  }

  reset(){
    this.homeService.directToURL = 'home';
    this.homeService.cancel = 'home';
    this.route.navigateByUrl('reset');
  }
}

