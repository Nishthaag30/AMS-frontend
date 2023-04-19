import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddStudentService } from '../add-student.service';
import { AdminHomeService } from '../admin-home.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogueComponent } from '../confirm-dialogue/confirm-dialogue.component';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  isAdminloggedin:boolean
  minDate: Date;
  maxDate: Date;

  constructor(private fb: FormBuilder, private route : Router, private addStudentService : AddStudentService, private adminHomeService : AdminHomeService, private datePipe: DatePipe, public dialog: MatDialog) {
    const currYear = new Date().getFullYear();
    this.minDate = new Date(currYear - 25, 0, 1);
    this.maxDate = new Date(currYear-15, 11, 31);
   }

  ngOnInit(): void {
    this.adminHomeService.isAdminLoggedIn().subscribe((result:any)=>{
      this.isAdminloggedin=result;
      console.log(this.isAdminloggedin);
      if(!this.isAdminloggedin){
        this.route.navigateByUrl('loginAdmin');
      }
    });

  }
  get f()
  {
    return this.addStudentForm.controls;
  }
  get mobile(){
    return this.addStudentForm.get('mobile');
  }
  get name(){
    return this.addStudentForm.get('name');
  }
  get DOB(){
    return this.addStudentForm.get('DOB');
  }
  get address(){
    return this.addStudentForm.get('address');
  }
  get email(){
    return this.addStudentForm.get('email');
  }

  addStudentForm = this.fb.group({
      name : ['', Validators.required],
      DOB : ['', Validators.required],
      mobile : ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email : ['', [Validators.required, Validators.email]],
      address : ['', Validators.required]
  });
  onSubmit(){
    let dob = this.addStudentForm.value.DOB;
    dob = this.datePipe.transform(dob, 'yyyy-MM-dd');
    const payload = {
      "name" : this.addStudentForm.value.name,
      "DOB" : dob,
      "mobile" : this.addStudentForm.value.mobile,
      "email" : this.addStudentForm.value.email,
      "address" : this.addStudentForm.value.address
    }

    const studentSignupData = {
      "email" : this.addStudentForm.value.email,
      "password": this.addStudentForm.value.mobile
    }
    this.addStudentService.sendRequest(payload).subscribe(
      response=>{
        console.log('Success', response);
        this.addStudentService.studentSignup(studentSignupData).subscribe(
          response=>{
            this.callDialogBox("addStudent");
            console.log("Student added for Signup", response);
          },
          error=>console.log('Error', error)
        )
      },
      error=>{
        this.callDialogBox("EmailExist");
        console.log("Error", error);
      }
    );
  }

  callDialogBox(msg){
    this.adminHomeService.dialogbox=msg;
    let dialogRef = this.dialog.open(ConfirmDialogueComponent);
    dialogRef.afterClosed().subscribe(result=>{
      console.log(`Dialog Result : ${result}`);
    })
  }

  cancelbtn(){
    this.route.navigateByUrl('student-details')
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
}
