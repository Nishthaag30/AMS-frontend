import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupAsAdminService } from '../signup-as-admin.service';
import { AdminHomeService } from '../admin-home.service';
import { matchpassword } from '../customValidation/matchpassword.validator';
import { ConfirmDialogueComponent } from '../confirm-dialogue/confirm-dialogue.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-signup-as-admin',
  templateUrl: './signup-as-admin.component.html',
  styleUrls: ['./signup-as-admin.component.css']
})
export class SignupAsAdminComponent implements OnInit {
  isAdminloggedin:boolean
  showPassword = false;
  showCpaswword = false;
  constructor(private fb: FormBuilder, private signupAdService: SignupAsAdminService, private route : Router, private adminHomeService: AdminHomeService, private dialog:MatDialog) { }

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
    return this.signupAdForm.controls;
  }
  get email(){
    return this.signupAdForm.get('email');
  }
  get password(){
    return this.signupAdForm.get('password');
  }
  get cpassword(){
    return this.signupAdForm.get('cpassword');
  }

  signupAdForm = this.fb.group({
    email : ['' , [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    cpassword:['', Validators.required]
  },{
    validators: matchpassword
  }
  );

  toggleShow() {
    this.showPassword = !this.showPassword;
  }
  toggleCShow(){
    this.showCpaswword = !this.showCpaswword;
  }

  onsubmit(){
    const payload = {
      "email" : this.signupAdForm.value.email,
      "password": this.signupAdForm.value.password,
    }
    console.log(payload);
    this.signupAdService.register(payload).subscribe(
      response=>{
        console.log('Success', response);
        if(response == "Admin with this email already exist"){
          this.callDialogBox("ErrorSignin");
        }
        else{
          this.callDialogBox("SuccessSignin");
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

  loginbtn(){
    this.route.navigateByUrl('loginAdmin')
  }
}
