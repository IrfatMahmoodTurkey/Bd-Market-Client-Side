import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validator, Validators} from '@angular/forms';
import {DataServiceService} from '../data-service.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-verify-cmp',
  templateUrl: './verify-cmp.component.html',
  styleUrls: ['./verify-cmp.component.css']
})
export class VerifyCmpComponent implements OnInit {

  formEnabled;
  email;
  formData;

  constructor(private data_service:DataServiceService, private route:Router, private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.email = localStorage.getItem("emailAddress");
    
    this.formEnabled = true;
    this.formData = new FormGroup({
        email:new FormControl(this.email),
        verification_code:new FormControl('', [Validators.required])
    });
  }

  verify(verification){
    // if verified then go to user account and make verify 1
    
    this.data_service.verify(verification).subscribe(data=>{this.bind_verification_message(data, verification)});

  }

  bind_verification_message(data, verification){
    if(data == '1'){
      this.data_service.login_activation(verification.email, verification.verification_code).subscribe(data=>{this.go_to_profile(data)});
    }
    else if(data == '2'){
      this.snackBar.open('Verification Code does not matched', 'Cancle', {
        duration: 2000,
      });
    }
    else{
      this.snackBar.open('Failed to match verification code', 'Cancle', {
        duration: 2000,
      });
    }
  }

  // go to profile after successfull log in
  go_to_profile(data){
    if(data == null){
      this.snackBar.open('Failed to Log in. Please try again', 'Cancle', {
        duration: 2000,
      });
    }
    else{
      localStorage.setItem('user_info', JSON.stringify(data));
      this.route.navigate(['profile']);
    }
  }

  // resend email
  resendEmail(){
    this.data_service.resend_email(this.email).subscribe(data=>{this.bind_resend_message(data)});
  }

  // resend email message
  bind_resend_message(data){
    if(data == "1"){
      this.snackBar.open('Email Resend. Please Check your Email Inbox or Spam', 'Cancle', {
        duration: 2000,
      });
    }
    else if(data == "2"){
      this.snackBar.open('This account Already Verified', 'Cancle', {
        duration: 2000,
      });
    }
    else{
      this.snackBar.open('Invalid User', 'Cancle', {
        duration: 2000,
      });
    }
  }

}
