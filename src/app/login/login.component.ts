import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { HomeService } from '../home.service';
import { AdminHomeService } from '../admin-home.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogueComponent } from '../confirm-dialogue/confirm-dialogue.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isloggedin:boolean
  showPassword = false;

  constructor(private fb: FormBuilder, private route: Router, private loginService: LoginService, private homeService : HomeService, private adminHomeService: AdminHomeService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.homeService.isUserLoggedIn().subscribe((result:any)=>{
      this.isloggedin=result;
      console.log(this.isloggedin);
      if(this.isloggedin){
        this.route.navigateByUrl('home');
      }
    });
  }
  get f(){
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

  toggleShow() {
    this.showPassword = !this.showPassword;
  }

  onsubmit(){
    const payload = {
      "email" : this.loginForm.value.email,
      "password": this.loginForm.value.password,
    }
    console.log(payload);
    this.loginService.register(payload).subscribe(
      response=>{
        console.log('Success', response);
        if(response=="User Logged In"){
          this.callDialogBox("StudentloggedIn");
        }
        else if(response == "Error thrown dao.InvalidPasswordException: Password is invalid"){
          this.callDialogBox("InvalidPassword");
        }
        else{
          this.callDialogBox("studentNotExist");
        }
      },
      error=>console.log("Error", error)
    );
  }

  callDialogBox(msg){
    this.adminHomeService.dialogbox=msg;
    let dialogRef = this.dialog.open(ConfirmDialogueComponent);
    dialogRef.afterClosed().subscribe(result=>{
      console.log(`Dialog Result : ${result}`);
    })
  }

}
