import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-admin-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class AdminOverviewComponent implements OnInit {
  authState;
  currentUser;
  accountArray=[];
  totalUsers;

  constructor(private af: AngularFire,private router: Router) {
    this.af.auth.subscribe((auth) => {
     this.authState = auth;
    });
  }

  ngOnInit() {
    this.loadData();
  }
  loadData(){
    const listOfUsers = this.af.database.list('/users/');
    listOfUsers.subscribe((users) =>{
      this.accountArray = [];
      users.forEach(info =>{
        let reviewApp = false;
        let proposalApp = false;
        if(info.reviewerApplication){
          reviewApp = true;
        };
        if(info.proposals){
          proposalApp = true;
        }
        this.accountArray.push({
          username: info.username,
          uid: info.uid,
          pApp: proposalApp,
          rApp: reviewApp,
          status: info.accountType,
          paid: false,
        });
      })
      this.totalUsers = this.accountArray.length;
    });
  }
}
