import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataServiceService} from '../data-service.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormGroup, FormControl, Validator, Validators} from '@angular/forms';

@Component({
  selector: 'app-body-cmp',
  templateUrl: './body-cmp.component.html',
  styleUrls: ['./body-cmp.component.css']
})
export class BodyCmpComponent implements OnInit {
  item_id;
  item_data;
  category_id;
  related_items;
  formData;
  cart = [];

  imageUrl;
  categoryName;
  productPrice;
  description;
  itemName;

  constructor(private route:ActivatedRoute, private data_service:DataServiceService, private sanitizer:DomSanitizer, private snackbar:MatSnackBar) { }

  ngOnInit() {
    // get id from url
    this.item_id = this.route.snapshot.paramMap.get("id");

    // scroll top on page load
    window.scroll(0,0);

    // load details
    this.get_item_data(this.item_id);

    this.formData = new FormGroup({
      quantity: new FormControl('', [Validators.required])
    }
    );
  }

  // get item data
  get_item_data(id){
      this.data_service.get_item_by_id(id).subscribe(data=>{this.bind_data(data)}); 
  }

  // bind data
  bind_data(data){
    this.item_data = data;
    
    this.itemName = data.productTitle;
    this.category_id = data.categoryId;
    this.imageUrl = this.getSanitizerUrl(this.item_data.pictureUrl);
    this.categoryName = data.categoryName;
    this.productPrice = data.sellPrice;
    this.description = data.productDescription;

    this.get_related_items(this.category_id);
  }

  // remove sanitaizer warning
  getSanitizerUrl(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  // get related items
  get_related_items(category_id){
    this.data_service.get_related_items(category_id).subscribe(data=>{this.bind_related_items(data)});
  }

  // bind related items
  bind_related_items(data){
    this.related_items = data;
  }

  // add to categoryId
  add_cart(value){
    if(this.item_data.quantity > value.quantity && typeof(value.quantity) == 'number' && value.quantity > 0){
      if(JSON.parse(localStorage.getItem("cart")) == null){
        let productId = this.item_data.id;
        let categoryId = this.item_data.categoryId;
        let productName = this.item_data.productTitle;
        let price = this.item_data.sellPrice;
        let quantity =value.quantity;
  
        let totalPrice = parseFloat(price)*parseInt(quantity);
        let data = {"productId":productId, "categoryId":categoryId,"productName":productName, "productPrice":totalPrice,"quantity":quantity, "originalQuantity":this.item_data.quantity};
        this.cart.push(data);
  
        localStorage.setItem("cart", JSON.stringify(this.cart));

        this.snackbar.open("Added Cart", "Cancle", {
          duration: 2000,
        });
      }
      else{
        this.cart = JSON.parse(localStorage.getItem("cart"));
  
        let productId = this.item_data.id;
        let categoryId = this.item_data.categoryId;
        let productName = this.item_data.productTitle;
        let price = this.item_data.sellPrice;
        let quantity =value.quantity;
  
        let totalPrice = parseFloat(price)*parseInt(quantity);
        let data = {"productId":productId, "categoryId":categoryId,"productName":productName, "productPrice":totalPrice,"quantity":quantity, "originalQuantity":this.item_data.quantity};
        this.cart.push(data);
  
        localStorage.setItem("cart", JSON.stringify(this.cart));

        this.snackbar.open("Added Cart", "Cancle", {
          duration: 2000,
        });
      }
    }
    else{
      this.snackbar.open("Not available quantity or Invalid Quantity", "Cancle", {
        duration: 2000,
      });
    }
  }
}
