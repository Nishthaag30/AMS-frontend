import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AdminHomeService } from '../admin-home.service';
import { HomeService } from '../home.service';


@Component({
  selector: 'app-confirm-dialogue',
  templateUrl: './confirm-dialogue.component.html',
  styleUrls: ['./confirm-dialogue.component.css']
})
export class ConfirmDialogueComponent implements OnInit {
  dialogFor:string
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private route: Router, public dialogRef : MatDialogRef<ConfirmDialogueComponent>, private adminHomeService : AdminHomeService, private homeService: HomeService) { }

  ngOnInit(): void {
    this.dialogFor = this.adminHomeService.dialogbox;
    console.log("Dialog REferral to : ", this.dialogFor);
  }
  deleteStudent(student){
    this.adminHomeService.deleteStudentHttpRequest(student.rollNo).subscribe(
      response=>{
        console.log('SucessFully deleted', response);
        this.adminHomeService.studentDeleted.next(true);
        this.route.navigateByUrl('student-details');
      },
      error=>console.log("Error occured", error)
    );
  }
  clickBtn(status){
    if(status){
      this.deleteStudent(this.data.student);
      console.log("OK");
    }
    else{
      console.log("no");
      this.route.navigateByUrl('student-details');
    }
    this.dialogRef.close();
  }

  okLogin(){
    this.dialogRef.close();
    this.route.navigate(["admin-home"]);
  }
  okStdLogin(){
    this.dialogRef.close();
    this.route.navigate(["home"]);    
  }

  okBtn(){
    this.dialogRef.close();
  }
  
  okSignin(){
    this.dialogRef.close();
    this.route.navigate(["loginAdmin"]);
  }
  
  okadd(){
    this.dialogRef.close();
    this.route.navigateByUrl('student-details');
  }

  markAttendance(studentData){
    this.homeService.markAttendanceRequest(studentData).subscribe(
      (response:any)=>{
        console.log('Success', response);
        this.homeService.marked.next(true);
      },
      error=> console.log("Error Occured", error)
    );
  }

  markBtn(status){
    if(status){
      this.markAttendance(this.data.userData);
      console.log("OK");
    }
    else{
      console.log("no");
    }
    this.dialogRef.close();
  }

}
