import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-proposal-pending',
  templateUrl: './proposal-pending.component.html',
  styleUrls: ['./proposal-pending.component.css']
})
export class ProposalPendingComponent implements OnInit {
  authState;
  currentUser;
  accountArray=[];
  currentTotal;
  MAX_REVIEWERS;
  totalReviewers;
  totalAdmins;
  totalProposals;
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
      this.totalProposals = 0;

      users.forEach(info =>{
        let proposalApp = false;
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
          status: info.accountType,
          paid: false,
        });
      })
      this.currentTotal = this.accountArray.length;
    });
  }

  isReviewer(data){
    return data.accountType === 'reviewer';
  }
  isAdmin(data){
    return data.accountType === 'admin' || data.accountType === 'owner';
  }


}
