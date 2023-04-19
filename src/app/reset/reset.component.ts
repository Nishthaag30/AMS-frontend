import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../home.service';
import { AdminHomeService } from '../admin-home.service';
import { FormBuilder, Validators } from '@angular/forms';
import { resetMatchpassword } from '../customValidation/password.validator';
import { ConfirmDialogueComponent } from '../confirm-dialogue/confirm-dialogue.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  isAdminloggedin:boolean
  isloggedin:boolean
  showOld=false;
  showNew=false;
  showConfirm=false;
  homeURL:string
  cancelURL:string

  constructor(private route:Router, private homeService: HomeService, private adminHomeService:AdminHomeService, private fb: FormBuilder, private dialog : MatDialog) { }

  ngOnInit(): void {
    this.homeURL= this.homeService.directToURL;
    this.cancelURL = this.homeService.cancel;
    console.log("home URL : ", this.homeURL);
    console.log("cancel URL : ", this.cancelURL);
    if(this.homeURL == undefined)
      this.route.navigateByUrl(this.cancelURL);
    else if(this.homeURL=='home'){
      this.checkUserLogin();
    }
    else if(this.homeURL == 'admin-home')
      this.checkAdminLogin();
  }

  checkAdminLogin(){
    this.adminHomeService.isAdminLoggedIn().subscribe((result:any)=>{
      this.isAdminloggedin=result;
      console.log(this.isAdminloggedin);
      if(!this.isAdminloggedin){
        this.route.navigateByUrl('loginAdmin');
      }
    });
  }

  checkUserLogin(){
    this.homeService.isUserLoggedIn().subscribe((result:any)=>{
      this.isloggedin=result;
      console.log(this.isloggedin);
      if(!this.isloggedin){
        this.route.navigateByUrl('login');
      }
    });
  }
  toggleold() {
    this.showOld = !this.showOld;
  }
  togglenew() {
    this.showNew = !this.showNew;
  }
  toggleconfirm() {
    this.showConfirm = !this.showConfirm;
  }

  get f(){
    return this.resetForm.controls;
  }
  get oldPassword(){
    return this.resetForm.get('oldPassword');
  }
  get newPassword(){
    return this.resetForm.get('newPassword');
  }
  get cpassword(){
    return this.resetForm.get('cpassword');
  }

  resetForm = this.fb.group({
    oldPassword : ['', Validators.required],
    newPassword : ['', [Validators.required, Validators.minLength(8)]],
    cpassword : ['', Validators.required]
  },{
    validators:resetMatchpassword
  })

  onSubmit(){
    const payload = {
      "email": this.resetForm.value.oldPassword,
      "password" : this.resetForm.value.newPassword
    }
    console.log(payload);
    this.homeService.resetPassword(payload).subscribe(
      response=>{
        if(response=="Error Occured : java.lang.Exception: Invalid Password"){
          this.callDialogBox("InvalidPassword");
        }else{
          this.callDialogBox("PasswordChanged");
          this.route.navigateByUrl(this.cancelURL);
        }
      }
    )
  }

  callDialogBox(msg){
    this.adminHomeService.dialogbox=msg;
    let dialogRef = this.dialog.open(ConfirmDialogueComponent);
    dialogRef.afterClosed().subscribe(result=>{
      console.log(`Dialog Result : ${result}`);
    })
  }

  cancelBtn(){
    this.route.navigateByUrl(this.cancelURL)
  }

}
