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

  constructor(private af: AngularFire,private router: Router) {
    this.af.auth.subscribe((auth) => {
     this.authState = auth;
    });
  }

  ngOnInit() {
  }
  loadData(){
    if (this.authState) {
      this.currentUser = this.authState.uid;
      const listOfUsers = this.af.database.list('/users/');
      listOfUsers.subscribe((users) =>{
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
      });
    }
  }
}
