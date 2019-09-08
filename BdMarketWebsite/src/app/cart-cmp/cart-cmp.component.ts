import { Component, OnInit, Inject } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormGroup, FormControl, Validator, Validators} from '@angular/forms';
import {DataServiceService} from '../data-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  quantity: number;
}

@Component({
  selector: 'app-cart-cmp',
  templateUrl: './cart-cmp.component.html',
  styleUrls: ['./cart-cmp.component.css']
})
export class CartCmpComponent implements OnInit {
  cart;
  cart_num;
  quantity;

  position: number;
  num: number;
  total_price:number;

  formData;
  isRemoveEnable = false;

  deliveryInfo;

  constructor(public dialog: MatDialog, private snackbar:MatSnackBar, private dataService:DataServiceService) { }

  ngOnInit() {
    this.cart = JSON.parse(localStorage.getItem("cart"));

    if(this.cart == null){
      this.cart_num = 0;
      this.total_price = 0.00;
      this.isRemoveEnable = false;
    }
    else{
      this.cart_num = this.cart.length;
      this.total_price = this.calculate_total_price(this.cart);
      this.isRemoveEnable = true;
    }


    this.formData = new FormGroup({
      fname:new FormControl('',[Validators.required]),
      lname:new FormControl('',[Validators.required]),
      email:new FormControl(''),
      phone:new FormControl('',[Validators.required]),
      address1:new FormControl('',[Validators.required]),
      address2:new FormControl(''),
      deliveryInfo:new FormControl('',[Validators.required]),
      deliveryConfirmation:new FormControl('')
    });

    this.delivery_info();
  }

  // open dialog
  openDialog(position): void {
    this.quantity = this.cart[position].quantity;
    const dialogRef = this.dialog.open(ActionDialog, {
      width: '400px',
      data: {quantity:this.quantity}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.quantity = result;

      if(this.quantity == -50){
        // remove item
        this.cart.splice(position, 1);

        localStorage.setItem("cart",JSON.stringify(this.cart));
        this.cart = JSON.parse(localStorage.getItem("cart"));
        this.cart_num = this.cart.length;

        this.snackbar.open("Item Removed", "Cancle", {
          duration: 2000,
        });

        this.total_price = this.calculate_total_price(this.cart);

        if(this.cart_num <= 0){
          localStorage.setItem('cart', JSON.stringify(null));
          this.isRemoveEnable = false;
          this.cart_num = 0;
          this.total_price = 0.00;
        }
      }
      else{
        // update quantity
        if(typeof(this.quantity) == "number"){
          if(this.cart[position].originalQuantity > this.quantity && this.quantity >= 1){
            let price:number = this.cart[position].productPrice / this.cart[position].quantity;
            let totalPrice:number = this.quantity * price;

            this.cart[position].quantity = this.quantity;
            this.cart[position].productPrice = totalPrice;

            localStorage.setItem("cart",JSON.stringify(this.cart));
            this.cart = JSON.parse(localStorage.getItem("cart"));
            this.cart_num = this.cart.length;

            this.snackbar.open("Quantity Updated", "Cancle", {
              duration: 2000,
            });

            this.total_price = this.calculate_total_price(this.cart);
          }
          else{
            this.snackbar.open("Quantity is not available or Positive", "Cancle", {
              duration: 2000,
            });
          }
        }
        else{
          this.snackbar.open("Quantity must be number", "Cancle", {
            duration: 2000,
          });
        }
      }

    });
  }

  // calculate total price
  calculate_total_price(cart_data){
    let total:number = 0;

    for(let i = 0; i<cart_data.length;i++){
      total = cart_data[i].productPrice + total;
    }

    return total;
  }

  // remove all cart items
  remove_all_cart(){
    localStorage.setItem('cart', JSON.stringify(null));
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.total_price = 0;
    this.cart_num = 0;
    this.isRemoveEnable = false;

    this.snackbar.open("All Cart Removed", "Cancle", {
      duration: 2000,
    });
  }

  orderItem(value){
    let checkAuth = JSON.parse(localStorage.getItem('user_info'));

    if(checkAuth == null || JSON.parse(localStorage.getItem('cart')) == null){
      this.snackbar.open("You have to log in first or fill cart", "Cancle", {
        duration: 3000,
      });
    }
    else{
      let userId = checkAuth.userId;
      this.dataService.order(value, userId).subscribe(data=>{this.order_message(data)});
    }
  }

  // order message
  order_message(data){
    if(data == "1"){
      this.snackbar.open("Order Successfull. We will contact you for further information. Thanks for choosing us.", "Cancle", {
        duration: 3000,
      });

      localStorage.setItem('cart', JSON.stringify(null));
      this.cart = JSON.parse(localStorage.getItem('cart'));
      this.total_price = 0;
      this.cart_num = 0;
      this.isRemoveEnable = false;
    }
    else{
      this.snackbar.open("Failed to take order", "Cancle", {
        duration: 2000,
      });
    }
  }

  // get delivery info and bind
  delivery_info(){
    this.dataService.get_delivery_place().subscribe(data=>{this.deliveryInfo = data});
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'edit_cart.html',
})
export class ActionDialog {

  constructor(
    public dialogRef: MatDialogRef<ActionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
