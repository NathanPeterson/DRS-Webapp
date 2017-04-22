import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-reviewer-portal',
  templateUrl: './reviewer-portal.component.html',
  styleUrls: ['./reviewer-portal.component.css']
})
export class ReviewerPortalComponent implements OnInit {
  showSidebar = false;
  reviewerHome = true;
  authState;
  currentUserType;

  constructor(private af: AngularFire,private router: Router) {
    this.af.auth.subscribe((auth) => {
     this.authState = auth;
    });
  }

  ngOnInit() {
  }

  show(){
    this.showSidebar = !this.showSidebar;
  }

  closeSideBar(){
    this.showSidebar=false;
  }
  setHomeTrue(){
    this.reviewerHome = true;
    let currentUser = this.af.database.object('/users/' + this.authState.uid);
    currentUser.subscribe(info=>{
      this.currentUserType = info.accountType;
    });
  }
  setHomeFalse(){
    this.reviewerHome = false;
  }

}
