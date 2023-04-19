import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


  export const resetMatchpassword : ValidatorFn = (control: AbstractControl):ValidationErrors|null =>{

     let password = control.get('newPassword');
     let confirmpassword = control.get('cpassword');
     if(password && confirmpassword && password?.value != confirmpassword?.value){
        return {
            passwordmatcherror : true }
     }
    return null; 
   }