import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-cmp',
  templateUrl: './footer-cmp.component.html',
  styleUrls: ['./footer-cmp.component.css']
})
export class FooterCmpComponent implements OnInit {
  year;
  constructor() { }

  ngOnInit() {
    this.year = new Date().getFullYear();
  }

}
