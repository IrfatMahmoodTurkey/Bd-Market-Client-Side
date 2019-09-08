import { Component, OnInit } from '@angular/core';
import {DataServiceService} from "../data-service.service";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home-cmp',
  templateUrl: './home-cmp.component.html',
  styleUrls: ['./home-cmp.component.css']
})
export class HomeCmpComponent implements OnInit {

  // top items
  top_items;

  constructor(private data_service:DataServiceService, private sanitizer:DomSanitizer) { }

  ngOnInit() {
    // bind top items data
    this.data_service.get_top_items().subscribe(data=>{this.bind_top_items(data)});
  }

  // bind top items
  bind_top_items(data){
    this.top_items = data;
  }

  // from prevent sanitizer warning
  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
