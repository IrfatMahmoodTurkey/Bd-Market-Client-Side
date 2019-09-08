import { Component, OnInit } from '@angular/core';
import {DataServiceService} from '../data-service.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-all-product-cmp',
  templateUrl: './all-product-cmp.component.html',
  styleUrls: ['./all-product-cmp.component.css']
})
export class AllProductCmpComponent implements OnInit {
  all_data;

  constructor(private data_service:DataServiceService, private sanitizier:DomSanitizer) { }

  ngOnInit() {
    this.data_service.get_all_items().subscribe(data=>{this.bind_data(data)})
  }

  bind_data(data){
    this.all_data = data;
  }

  // remove sanitizer warning
  public getSantizeUrl(url : string) {
    return this.sanitizier.bypassSecurityTrustUrl(url);
  }

  //search by title
  search(event){
    this.get_items_search(event);
  }

  // get data by title search
  get_items_search(title){
    this.data_service.search_by_title(title).subscribe(data=>{this.bind_search_data(data)});
  }

  // bind search data
  bind_search_data(data){
    this.all_data = data;
  }
}
