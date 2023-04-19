import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginAdminService } from '../login-admin.service';
import { Router } from '@angular/router';
import { AdminHomeService } from '../admin-home.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogueComponent } from '../confirm-dialogue/confirm-dialogue.component';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  isAdminloggedin:boolean
  showPassword = false;
  name:string

  constructor(private fb: FormBuilder, private loginAdminService : LoginAdminService, private route: Router, private adminHomeService: AdminHomeService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.adminHomeService.isAdminLoggedIn().subscribe((result:any)=>{
      this.isAdminloggedin=result;
      console.log(this.isAdminloggedin);
      if(this.isAdminloggedin){
        this.route.navigateByUrl('admin-home');
      }
    });
  }
  get f()
  {
    return this.loginForm.controls;
  }
  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }
  loginForm = this.fb.group({
    email : ['' , [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onsubmit(){
    const payload = {
      "email" : this.loginForm.value.email,
      "password": this.loginForm.value.password,
    }
    console.log(payload);
    this.loginAdminService.register(payload).subscribe(
      response=>{
        if(response == "Admin Logged In"){
          this.callDialogBox("loggedIn");
          this.adminHomeService.name = this.loginForm.value.email;
        }
        else if(response == "Error thrown dao.InvalidPasswordException: Password is invalid"){
          this.callDialogBox("InvalidPassword")
        }
        else{
          this.callDialogBox("NotExist");
        }
      },
      error=>console.log("Error is : ", error)
    );
  }

  callDialogBox(msg){
    this.adminHomeService.dialogbox=msg;
    let dialogRef = this.dialog.open(ConfirmDialogueComponent);
    dialogRef.afterClosed().subscribe(result=>{
      console.log(`Dialog Result : ${result}`);
    })
  }

  signupPage(){
    this.route.navigate(["signupAdmin"]);
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }
  
}
