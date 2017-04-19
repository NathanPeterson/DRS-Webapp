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
  MAX_REVIEWERS;
  totalReviewers;
  totalAdmins;
  totalProposals;
  totalReviewerApps;

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
      this.totalReviewers =0;
      this.MAX_REVIEWERS = 30;
      this.totalAdmins = 0;
      this.totalProposals = 0;
      this.totalReviewerApps = 0;

      users.forEach(info =>{
        let reviewApp = false;
        let proposalApp = false;
        if(info.reviewerApplication){
          reviewApp = true;
          this.totalReviewerApps++;
        };
        if(info.proposals){
          proposalApp = true;
          for(let proposal in info.proposals){
            this.totalProposals++;
          }
        }
        if(this.isReviewer(info)){
          this.totalReviewers++;
        }else if(this.isAdmin(info)){
          this.totalAdmins++;
        }
        this.accountArray.push({
          username: info.username,
          email: info.email,
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

  isReviewer(data){
    return data.accountType === 'reviewer';
  }
  isAdmin(data){
    return data.accountType === 'admin';
  }

  promote(data){
    let selectedUser = this.af.database.object('/users/' + data.uid);
    let currentType;
    selectedUser.subscribe(info =>{
      currentType = info.accountType;
    });
    if(!currentType){
      selectedUser.update({accountType: 'basic'});
    }else if(currentType === 'basic'){
      selectedUser.update({accountType: 'reviewer'});
    }else if(currentType === 'reviewer'){
      selectedUser.update({accountType: 'admin'});
    }else if(currentType === 'admin'){
      return;
    }
  }

  demote(data){
    let selectedUser = this.af.database.object('/users/' + data.uid);
    let currentType;
    selectedUser.subscribe(info =>{
      currentType = info.accountType;
    });
    if(currentType === 'admin'){
      selectedUser.update({accountType: 'reviewer'});
    }else if(currentType === 'reviewer'){
      selectedUser.update({accountType: 'basic'});
    }else if(currentType === 'basic'){
      return;
    }
  }
}
