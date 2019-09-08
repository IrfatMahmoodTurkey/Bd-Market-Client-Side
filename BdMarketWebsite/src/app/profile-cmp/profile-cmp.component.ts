import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import {DataServiceService} from '../data-service.service';
import {FormGroup, FormControl, Validator, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile-cmp',
  templateUrl: './profile-cmp.component.html',
  styleUrls: ['./profile-cmp.component.css']
})
export class ProfileCmpComponent implements OnInit {

  data;
  isLoggedIn;

  // order table setup
  orderDataSource;

  passwordData;

  constructor(private route:Router, private snackbar:MatSnackBar, private dataService:DataServiceService) { }

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem('user_info'));
    
    if(this.data == null){
      this.route.navigate(['register']);

      this.snackbar.open("No Logged in user", "Cancle", {
        duration: 2000,
      });
    }

    this.passwordData = new FormGroup({
      oldPassword:new FormControl('',[Validators.required]),
      newPassword:new FormControl('',[Validators.required]),
      rePassword:new FormControl('',[Validators.required]),
    });

    this.get_order_data();
  }

  // get order by user id
  get_order_data(){
    let user_id = this.data.userId;

    this.dataService.get_order_by_user_id(user_id).subscribe(data=>{this.bind_order_data(data)});
  }

  // bind order data and view in table
  bind_order_data(data){
    this.orderDataSource = data;
  }

  // log out
  logout(){
    localStorage.setItem('user_info', JSON.stringify(null));
    this.route.navigate(['register']);

    this.snackbar.open("Log Out Successfully", "Cancle", {
      duration: 2000,
    });
  }

  // remove item only
  remove_item(item_id){
    this.dataService.remove_order_item_only(item_id).subscribe(data=>{this.bind_remove_data(data)});
  }

  // remove whole order
  remove_order(info_id){
    this.dataService.remove_full_order(info_id).subscribe(data=>{this.bind_remove_data(data)});
  }

  bind_remove_data(data){
    if(data == "1"){
      this.snackbar.open("Removed Successfully but Order can not be undone", "Cancle", {
        duration: 2000,
      });
    }
    else{
      this.snackbar.open("Remove Failed", "Cancle", {
        duration: 2000,
      });
    }

    this.get_order_data();
  }

  // change password
  changePassword(value){
    if(value.newPassword == value.rePassword){
      this.dataService.change_password(this.data.email, value.newPassword, value.oldPassword).subscribe(data=>{this.message(data)});
    }
    else{
      this.snackbar.open("Re Entered Password does not matched", "Cancle", {
        duration: 2000,
        });
    }
  }

  message(data){
    if(data == "1"){
      localStorage.setItem('user_info', JSON.stringify(null));
      this.route.navigate(['register']);

      this.snackbar.open("Log in again with new password", "Cancle", {
      duration: 2000,
      });
    }
    else if(data == "0"){
      this.snackbar.open("Failed to change password", "Cancle", {
        duration: 2000,
        });
    }
    else if(data == "3"){
      this.snackbar.open("Old Password does not matched", "Cancle", {
        duration: 2000,
        });
    }
    else{
      this.snackbar.open("Failed to change password", "Cancle", {
        duration: 2000,
        });
    }
  }
}
