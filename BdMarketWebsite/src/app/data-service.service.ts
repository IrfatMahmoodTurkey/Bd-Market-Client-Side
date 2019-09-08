import { Injectable } from '@angular/core';
// import http services
import {HttpClient, HttpHeaders} from '@angular/common/http';
// import map
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  
  constructor(private http:HttpClient) { }

  // get top items
  get_top_items(){
    return this.http.get("https://localhost:44318/api/Item/TopItems");
  }

  // get all items
  get_all_items(){
    return this.http.get("https://localhost:44318/api/Item/AllItems");
  }

  // get items by id
  get_item_by_id(id){
    return this.http.get("https://localhost:44318/api/Item/Details/"+id);
  }

  // get related items
  get_related_items(category_id){
    return this.http.get("https://localhost:44318/api/Item/Related/"+category_id);
  }

  // get all category
  get_category(){
    return this.http.get("https://localhost:44318/api/Item/Categories/");
  }

  // get items by category id
  get_item_by_category(category_id){
    return this.http.get("https://localhost:44318/api/Item/Category/"+category_id);
  }

  // get search by category and title
  search_by_category_and_title(category_id, title){
    return this.http.get("https://localhost:44318/api/Item/Search/"+category_id+"/"+title)
  }

  //search by title
  search_by_title(title){
    return this.http.get("https://localhost:44318/api/Item/Search/"+title);
  }

  // register new user account
  register(data:any){
    const body:FormData = new FormData();

    body.append("UserName", data.username);
    body.append("Email", data.email);
    body.append("Password", data.password);
    body.append("Phone", data.phone);

    return this.http.post("https://localhost:44318/api/UserApi/Register", body);
  }

  // verify account
  verify(verification){
    const body2:FormData = new FormData();

    body2.append("email", verification.email);
    body2.append("verificationCode", verification.verification_code);

    return this.http.post("https://localhost:44318/api/UserApi/Verify", body2);
  }

  // log in after activation success
  login_activation(email:string, code:string){
    return this.http.get("https://localhost:44318/api/UserApi/LoginByActivation?email="+email+"&code="+code);
  }

  // normal log in
  login(value:any){
    const loginBody:FormData = new FormData();

    loginBody.append("email", value.email);
    loginBody.append("password", value.password);

    return this.http.post("https://localhost:44318/api/UserApi/Login", loginBody);
  }

  // order item from cart
  order(value:any, userId){
    const orderItem:FormData = new FormData();

    orderItem.append("FirstName", value.fname);
    orderItem.append("LastName", value.lname);
    orderItem.append("Email", value.email);
    orderItem.append("phone", value.phone);
    orderItem.append("AddressOne", value.address1);
    orderItem.append("AddressTwo", value.address2);
    orderItem.append('User_Id', userId);
    orderItem.append('DeliveryPlace', value.deliveryInfo);

    if(value.deliveryConfirmation){
      orderItem.append('IsHomeDelivery', "1");
    }
    else{
      orderItem.append('IsHomeDelivery', "0");
    }

    //get current dat
    let currentDate = new Date();
    let date = currentDate.getDate();
    let month = currentDate.getMonth()+1;
    let year = currentDate.getFullYear();

    orderItem.append('ActionDate', date+"/"+month+"/"+year);
    orderItem.append("Cart", localStorage.getItem('cart'));

    return this.http.post("https://localhost:44318/api/Order/OrderItem", orderItem);
  }

  // resend email
  resend_email(email:string){
    return this.http.get("https://localhost:44318/api/UserApi/ResendEmail?emailAddress="+email);
  }

  // resend new verification code for reset password
  resend_new_verification_code(email:string){
    return this.http.get("https://localhost:44318/api/UserApi/ForgetPassword?email="+email);
  }

  // update forgotten password
  update_forgotten_password(password_change:any){
    const body = new FormData();

    body.append('Email', password_change.email);
    body.append('VerificationCode', password_change.verification);
    body.append('Password', password_change.password);

    return this.http.post("https://localhost:44318/api/UserApi/ChangeForgottenPassword", body);
  }

  // get order info by user id
  get_order_by_user_id(user_id){
    return this.http.get("https://localhost:44318/api/Order/ViewOrders?clientId="+user_id);
  }

  // remove order item only
  remove_order_item_only(order_id){
    return this.http.get("https://localhost:44318/api/Order/RemoveItem?orderId="+order_id);
  }

  // remove full order
  remove_full_order(info_id){
    return this.http.get("https://localhost:44318/api/Order/RemoveFullOrder?infoId="+info_id);
  }

  // change password
  change_password(email, password, oldPassword){
    const body:FormData = new FormData();

    body.append('UserEmail',email);
    body.append('UserPassword',password);
    body.append('OldPassword', oldPassword);

    return this.http.post("https://localhost:44318/api/UserApi/ChangePassword", body);
  }

  // get delivery place details
  get_delivery_place(){
    return this.http.get("https://localhost:44318/api/Order/GetAllDeliveryPlaces");
  }
}
