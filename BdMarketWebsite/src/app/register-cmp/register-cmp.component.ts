import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validator, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DataServiceService} from '../data-service.service'
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-cmp',
  templateUrl: './register-cmp.component.html',
  styleUrls: ['./register-cmp.component.css']
})
export class RegisterCmpComponent implements OnInit {

  formData;
  email;
  message;
  register_status;
  loginData;

  constructor(private route:Router, private data_service:DataServiceService,private _snackBar: MatSnackBar) { }

  ngOnInit() {
    //  form validation
    this.formData = new FormGroup({
      username : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required]),
      phone : new FormControl('', [Validators.required]),
    });

    // log in form validation
    this.loginData = new FormGroup({
      email:new FormControl('',[Validators.email, Validators.required]),
      password:new FormControl('',[Validators.required])
    });
  }

  // register
  register(register_data){
    // pass on api db for register

    
    this.data_service.register(register_data).subscribe(data=>{this.bind_register_status(data)});

    // store email for verification
    localStorage.setItem("emailAddress", register_data.email);
  }

  // register status
  bind_register_status(data){
    if(data == '1'){
        this.route.navigate(['verify']);
    }
    else if(data == '2'){
      this._snackBar.open("Email Address Already Exists", "Cancle", {
        duration: 2000,
      });
    }
    else{
      this._snackBar.open("Failed to Register Account", "Cancle", {
        duration: 2000,
      });
    }
  }

  // log in existing account
  login(event){
    this.data_service.login(event).subscribe(data=>{this.bind_login(data)});
  }

  bind_login(data){
    if(data == '0'){
      this._snackBar.open("Log in Failed. Check your email or password", "Cancle", {
        duration: 2000,
      });
    }
    else{
      if(data.verify == 1){
        localStorage.setItem('user_info',JSON.stringify(data));
        this.route.navigate(['profile']);
      }
      else{
        localStorage.setItem("emailAddress", data.email);
        this.route.navigate(['verify']);
      }
    }
  }
}
