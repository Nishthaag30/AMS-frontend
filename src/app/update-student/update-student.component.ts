import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminHomeService } from '../admin-home.service';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements AfterViewInit {
  isAdminloggedin:boolean
  attendanceList:any
  trial:any
  presents:any
  myList:any = []
  rn:any
  minDate: Date;
  maxDate: Date;
  updateData:any

  constructor(private fb: FormBuilder, private route : Router, private adminHomeService : AdminHomeService, private datePipe: DatePipe, private cdr: ChangeDetectorRef) {
    const currYear = new Date().getFullYear();
    this.minDate = new Date(currYear - 25, 0, 1);
    this.maxDate = new Date(currYear-15, 11, 31);
    this.checkAdminLogin();
    let sevenDaysAgo: Date = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000);
    this.myList = [
      { date:new Date(sevenDaysAgo) , present:false },
      { date:new Date(sevenDaysAgo), present:false },
      { date:new Date(sevenDaysAgo), present:false },
      { date:new Date(sevenDaysAgo), present:false },
      { date:new Date(sevenDaysAgo), present:false },
      { date:new Date(sevenDaysAgo), present:false },
      { date:new Date(sevenDaysAgo), present:false },
    ];
  }
  
  ngAfterViewInit(): void {
  }
  
  checkAdminLogin(){
    this.adminHomeService.isAdminLoggedIn().subscribe((result:any)=>{
      this.isAdminloggedin=result;
      console.log(this.isAdminloggedin);
      if(!this.isAdminloggedin){
        this.route.navigateByUrl('loginAdmin');
      }
      else{
        this.rn = this.adminHomeService.up_rollno;
        if(this.rn==undefined){
          this.route.navigateByUrl('student-details');
        }
        this.getStudentData();
      }
    });
  }
  
  getStudentData(){
    this.adminHomeService.getStudentData(this.rn).subscribe((result)=>{
      this.updateData = result;
      this.setvalues();
      this.getAttendanceData();
    })
  }
  
  getAttendanceData(){
    this.adminHomeService.getAllAttendances(this.rn).subscribe((result:any)=>{
      this.attendanceList = result;
      this.getDatesData();
    })
  }
  
  getDatesData(){
    let sevenDaysAgo: Date = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000);
    var loop = new Date(sevenDaysAgo);
    for(let list of this.myList){
      let date1 = formatDate(loop,'yyyy-MM-dd','en_US');
      list.date = date1;
      var newDate = loop.setDate(loop.getDate() + 1);
      loop = new Date(newDate);
    }
    this.isPresent();
  }

  isPresent(){
    var present=[]
    for(let list of this.myList){
      var f=0;
      for (let attendance of this.attendanceList){
        if(list.date === attendance.datePresent){
          list.present = true;
          present.push(true);
          f=1;
          break;
        }
      }
      if(f==0)
        present.push(false);
    }
    this.presents = present;
  }

  changedValue(date, value){
    console.log("date : ", date);
    console.log("value selected : ", value);
    for(let list of this.myList){
      if(list.date==date){
        if(value=="absent")
          list.present = false;
        else
          list.present = true;
      }
    }
  }

  setvalues(){
    this.updateStudentForm.patchValue({
      rollNo: this.updateData.rollNo,
      name: this.updateData.name,
      DOB: this.updateData.DOB,
      email: this.updateData.email,
      mobile: this.updateData.mobile,
      address: this.updateData.address,
    })
  }

  get f(){
    return this.updateStudentForm.controls;
  }
  get rollNo(){
    return this.updateStudentForm.get('rollno');
  }
  get name(){
    return this.updateStudentForm.get('name');
  }
  get DOB(){
    return this.updateStudentForm.get('DOB');
  }
  get address(){
    return this.updateStudentForm.get('address');
  }
  get email(){
    return this.updateStudentForm.get('email');
  }
  get mobile(){
    return this.updateStudentForm.get('mobile');
  }

  updateStudentForm = this.fb.group({
    rollNo : [{value: '', disabled: true}, , Validators.required],
    name : ['', Validators.required],
    DOB : ['', Validators.required],
    mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],  
    address : ['', Validators.required],
    email : [{value: '', disabled: true}, [Validators.required, Validators.email]]
  });
  cancelbtn(){
    this.route.navigateByUrl('student-details')
  }
  onSubmit(){
    let dob = this.updateStudentForm.value.DOB;
    dob = this.datePipe.transform(dob, 'yyyy-MM-dd');
    let rollNo : number = this.updateData.rollNo
    const payload = {
      "rollNo": this.updateData.rollNo,
      "name" : this.updateStudentForm.value.name,
      "DOB" : dob,
      "mobile" : this.updateStudentForm.value.mobile,
      "email" : this.updateData.email,
      "address" : this.updateStudentForm.value.address,
    }
    console.log("changed data : ", payload);
    const dateData = {
      "rollNo":rollNo,
      "presentDates":[]
    }
    for(let list of this.myList){
      if(list.present == true){
        dateData.presentDates.push(list.date);
      }
    }
    // const toSend = JSON.stringify(dateData);
    // console.log("Json stringyfy", toSend);
    this.adminHomeService.updateStudent(payload).subscribe(
      response=>{
        console.log("Successfully updated details", response);
        this.callForUpdateAttendance(dateData);
        // this.route.navigateByUrl('student-details');
      },
      error=>console.log("Error", error)
    );
  }

  callForUpdateAttendance(toSend){
    this.adminHomeService.updateAttendance(toSend).subscribe(
      response=>{
        console.log("response = ",response);
        this.attendanceList = response;
      }
    );
  }

  logout(){
    this.adminHomeService.logoutAdmin().subscribe(
      response=>{
        console.log("SuccessFully Logged Out");
        console.log("Navigating to Admin signup page");
        this.route.navigate(["loginAdmin"]);
      },
      error=>{
        console.log("Error Occurred");
        console.log(error);
      }
    );
  }

}
