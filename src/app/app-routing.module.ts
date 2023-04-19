import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupAsAdminComponent } from './signup-as-admin/signup-as-admin.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { ConfirmDialogueComponent } from './confirm-dialogue/confirm-dialogue.component';
import { ViewAttendanceComponent } from './view-attendance/view-attendance.component';
import { ResetComponent } from './reset/reset.component';

const routes: Routes = [
  {path: 'signupAdmin', component: SignupAsAdminComponent},
  {path: 'loginAdmin', component: AdminloginComponent},
  {path: 'admin-home', component: AdminHomeComponent},
  {path: 'addStudent', component: AddStudentComponent},
  {path: 'student-details', component: StudentDetailsComponent},
  {path: 'update-details', component: UpdateStudentComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'dashboard', component: HomeComponent},
  {path: 'confirmDialouge', component: ConfirmDialogueComponent},
  {path: 'viewAttendance', component: ViewAttendanceComponent},
  {path: 'reset', component: ResetComponent },
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
