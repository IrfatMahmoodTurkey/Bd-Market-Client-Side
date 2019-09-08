import { Component, OnInit } from '@angular/core';
import {DataServiceService} from '../data-service.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-cmp',
  templateUrl: './category-cmp.component.html',
  styleUrls: ['./category-cmp.component.css']
})
export class CategoryCmpComponent implements OnInit {

  categories;
  category_data;
  category_name;
  category_id;

  constructor(private data_services:DataServiceService, private sanitizer:DomSanitizer, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.get_all_categories();
    this.get_top_elements();
  }

  //get top elements
  get_top_elements(){
    // bind top items data
    this.data_services.get_top_items().subscribe(data=>{this.bind_category_data(data, 1)});
  }

  // get all categories
  get_all_categories(){
    this.data_services.get_category().subscribe(data=>{this.bind_category(data)});
  }

  // bind categories
  bind_category(data){
    this.categories = data;
  }

  // get all data by category
  get_all_data_by_category(category_id){
    this.data_services.get_item_by_category(category_id).subscribe(data=>{this.bind_category_data(data, 2)});
  }

  // bind category data
  bind_category_data(data, action){
    this.category_data = data;
    
    if(data.length > 0){
      if(action == 1){
        this.category_name = "Top Items";
      }
      else{
        this.category_name = data[0].categoryName;
      }
    }
    else{
      this.category_name = "No Items Available";
    }  
  }

  // view items by category
  view_items_by_category(category_id){
    this.category_id = category_id;
    this.get_all_data_by_category(category_id);
  }

  // remove sanitizer warning
  getSanitizerUrl(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  // search
  search(event){
    this.search_by_category_and_title(event);
  }

  // search with category and title
  search_by_category_and_title(title){
    if(this.category_id != null){
      this.data_services.search_by_category_and_title(this.category_id, title).subscribe(data=>{this.bind_search_data(data)});
    }
    else{
      this._snackBar.open("Please Select One Category for Search", "Cancle", {
        duration: 2000,
      });
    }
  }

  // bind_search data with category_data variable
  bind_search_data(data){
    this.category_data = data;
  }
}
