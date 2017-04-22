import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reviewer-portal',
  templateUrl: './reviewer-portal.component.html',
  styleUrls: ['./reviewer-portal.component.css']
})
export class ReviewerPortalComponent implements OnInit {
  showSidebar = false;
  constructor() { }

  ngOnInit() {
  }

  show(){
    this.showSidebar = !this.showSidebar;
  }

  closeSideBar(){
    this.showSidebar=false;
  }

}
