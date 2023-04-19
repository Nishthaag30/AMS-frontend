import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AdminHomeService } from '../admin-home.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogueComponent } from '../confirm-dialogue/confirm-dialogue.component';
import { HomeService } from '../home.service';


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  studentList: any;
  isAdminloggedin:boolean
  deleteData:any;

  constructor(private route:Router, private adminHomeService: AdminHomeService, public dialog: MatDialog, private homeService:HomeService) { }

  public async ngOnInit(): Promise<void> {
    this.adminHomeService.isAdminLoggedIn().subscribe((result:any)=>{
      this.isAdminloggedin=result;
      console.log(this.isAdminloggedin);
      if(!this.isAdminloggedin){
        this.route.navigateByUrl('loginAdmin');
      }
    });

    this.studentList = await this.adminHomeService.readAll();
    this.initRefreshSubscription();
  }
  public initRefreshSubscription(){
    this.adminHomeService.studentDeleted.subscribe(async (data:boolean)=>{
      if(data){
        this.studentList = await this.adminHomeService.readAll();
      }
    })
  }

  addStudentbutton(){
    this.route.navigateByUrl('addStudent');
  }

  updateStudent(rollno){
    this.adminHomeService.up_rollno = rollno;
    this.route.navigateByUrl("update-details");
  }


  dashboardPage(){
    this.route.navigateByUrl("admin-home");
  }

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

  dialougeBox(student){
    this.adminHomeService.dialogbox="delete";
    let dialogRef = this.dialog.open(ConfirmDialogueComponent, {
      data:{student}
    });
    this.deleteData= student;
    dialogRef.afterClosed().subscribe(result=>{
      console.log(`Dialog Result : ${result}`);
    })
  }

  reset(){
    this.homeService.directToURL = 'admin-home';
    this.homeService.cancel = 'student-details';
    this.route.navigateByUrl('reset');
  }

}
