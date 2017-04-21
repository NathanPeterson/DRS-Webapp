import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Subject } from 'rxjs/Subject';

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
  currentTotal;
  MAX_REVIEWERS;
  totalReviewers;
  totalAdmins;
  totalProposals;
  totalReviewerApps;
  flag;

  constructor(private af: AngularFire,private router: Router) {
    this.af.auth.subscribe((auth) => {
     this.authState = auth;
    });
    this.flag = {
      key: 'uid',
      val: '',
      triggered: false,
    }
  }

  ngOnInit() {
    this.loadData();
  }
  loadData(){
    let listOfUsers = this.af.database.list('/users/',{
        query: {
          orderByChild: this.flag.key,
        }
      });

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
      this.currentTotal = this.totalUsers = this.accountArray.length;
    });
  }

  isReviewer(data){
    return data.accountType === 'reviewer';
  }
  isAdmin(data){
    return data.accountType === 'admin' || data.accountType === 'owner';
  }

  promote(data){
    let selectedUser = this.af.database.object('/users/' + data.uid);
    let currentType;
    selectedUser.subscribe(info =>{
      currentType = info.accountType;
    });
    if(!currentType){
      selectedUser.update({accountType: 'standard'});
    }else if(currentType === 'standard'){
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
      selectedUser.update({accountType: 'standard'});
    }else if(currentType === 'standard'){
      return;
    }
  }

  loadSortedData(){
    let listOfUsers;
    if(this.flag.val === ''){
      listOfUsers = this.af.database.list('/users/',{
        query: {
          orderByChild: this.flag.key,
        }
      });
    }else{
      listOfUsers = this.af.database.list('/users/',{
        query: {
          orderByChild: this.flag.key,
          equalTo: this.flag.val
        }
      });
    }
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
          email: info.email,
          uid: info.uid,
          pApp: proposalApp,
          rApp: reviewApp,
          status: info.accountType,
          paid: false,
        });
      })
      this.currentTotal = this.accountArray.length;
    });
  }

  canPromote(data){
    if(data.status === 'admin' || data.status === 'owner'){
      return false;
    }else{
      return true;
    }
  }
  canDemote(data){
    if(data.status === 'standard' || data.status === 'owner'){
      return false;
    }else{
      return true;
    }
  }

  sortByStatus(input){
    this.flag.key = 'accountType'
    if(!input){
      if(this.flag.triggered === false){
        this.flag.triggered = true;
        this.loadSortedData();
      }else{
        this.accountArray.reverse();
      }
    }else if(input === 'admin' || input === 'standard' || input === 'reviewer'){
      this.flag.val = input;
      this.loadSortedData();
    }else if(input === 'default'){
      this.flag.val = '';
      this.loadSortedData();
    }
  }

  sortByReviewApp(input, type){
    if(type === 'r'){
      this.flag.key = 'reviewerApplication'
    }else{
      this.flag.key = 'proposals'
    }
    if(!input){
      if(this.flag.triggered === false){
        this.flag.triggered = true;
        this.loadSortedData();
      }else{
        this.accountArray.reverse();
      }
    }else if(input === 'submitted'){
      this.loadSortedData();
    }else if(input === 'notSubmitted'){
      if(type === 'r'){
        this.flag.key = "!reviewApp";
      }else{
        this.flag.key = "!proposals"
        this.loadSortedData();}
    }else if(input === 'default'){
      this.flag.val = '';
      this.loadSortedData();
    }
  }

  delete(data){
    this.af.database.list('/users/').remove(data.uid).then(()=>{
      alert("Are You sure you want to delete this user?")
    }).then((success)=>{}).catch(err=>{})
  }
  canDelete(data){
    if(data.status === 'owner'){
      return false;
    }else{
      return true;
    }
  }

}
