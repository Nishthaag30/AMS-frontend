import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { SignupAsAdminComponent } from './signup-as-admin/signup-as-admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { ConfirmDialogueComponent } from './confirm-dialogue/confirm-dialogue.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { DatePipe } from '@angular/common';
import { ViewAttendanceComponent } from './view-attendance/view-attendance.component';
import { ResetComponent } from './reset/reset.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupAsAdminComponent,
    AdminHomeComponent,
    AddStudentComponent,
    StudentDetailsComponent,
    UpdateStudentComponent,
    AdminloginComponent,
    ConfirmDialogueComponent,
    ViewAttendanceComponent,
    ResetComponent
  ],
  entryComponents: [ ConfirmDialogueComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
