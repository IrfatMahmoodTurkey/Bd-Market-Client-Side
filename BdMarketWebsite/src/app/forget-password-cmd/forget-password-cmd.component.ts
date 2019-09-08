import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validator, Validators} from '@angular/forms';
import {DataServiceService} from '../data-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-forget-password-cmd',
  templateUrl: './forget-password-cmd.component.html',
  styleUrls: ['./forget-password-cmd.component.css']
})
export class ForgetPasswordCmdComponent implements OnInit {
  formData;
  enableTb;

  constructor(private data_service:DataServiceService, private snackbar:MatSnackBar) { }

  ngOnInit() {
    this.enableTb = false;

    this.formData = new FormGroup({
      email:new FormControl('',[Validators.required, Validators.email]),
      verification:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required]),
      re_password:new FormControl('',[Validators.required]),
    });
  }

  // new verification code
  resend_new_verification_code(email){
    this.data_service.resend_new_verification_code(email).subscribe(data=>{this.change_password_tb_enable(data)});
  }

  // change password tb enable disable
  change_password_tb_enable(data){
    if(data == "1"){
      this.enableTb = true;

      this.snackbar.open("Verification Code Sended on your email", "Cancle", {
        duration: 2000,
      });
    }
    else if(data == "0"){
      this.enableTb = false;

      this.snackbar.open("Please try again", "Cancle", {
        duration: 2000,
      });
    }
    else{
      this.enableTb = false;

      this.snackbar.open("Invalid User Email", "Cancle", {
        duration: 2000,
      });
    }    
  }

  // change password
  changePassword(value){
    if (value.password == value.re_password) {
      this.data_service.update_forgotten_password(value).subscribe(data=>{this.update_forgotten_password_message(data)});
    } else {
      this.snackbar.open("Main Password and Re Entered Password doesn't matched", "Cancle", {
        duration: 2000,
      });
    }
  }

  // message of update password
  update_forgotten_password_message(data){
    if(data == 1){
      this.snackbar.open("Password Changed Successfully. Please Log in by new password", "Cancle", {
        duration: 2000,
      });
    }
    else if(data == 0){
      this.snackbar.open("Falied to Change Password", "Cancle", {
        duration: 2000,
      });
    }
    else if(data == 4){
      this.snackbar.open("Wrong Verfication Code", "Cancle", {
        duration: 2000,
      });
    }
    else{
      this.snackbar.open("Invalid user", "Cancle", {
        duration: 2000,
      });
    }
  }
}
