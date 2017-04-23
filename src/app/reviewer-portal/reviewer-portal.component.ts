import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { TotalProposalsService } from '../services/total-proposals.service';

@Component({
  selector: 'app-reviewer-portal',
  templateUrl: './reviewer-portal.component.html',
  styleUrls: ['./reviewer-portal.component.css']
})
export class ReviewerPortalComponent implements OnInit {
  showSidebar = true;
  reviewerHome = true;
  authState;
  currentUserType;

  constructor(private af: AngularFire,
              private router: Router,
              private total: TotalProposalsService) {
    this.af.auth.subscribe((auth) => {
     this.authState = auth;
    });
  }

  ngOnInit() {
    let proposals = this.af.database.list('/proposals/');
    proposals.subscribe(proposals=>{
      let totalPending =0, totalApproved=0, totalRejected=0;
      proposals.forEach(proposal => {
        if(proposal.status === 'approved'){
          totalApproved++
        }
        if(proposal.status === 'pending...'){
          totalPending++
        }
        if(proposal.status === 'rejected'){
          totalRejected++
        }
      });
      this.total.setApproved(totalApproved);
      this.total.setPending(totalPending);
      this.total.setRejected(totalRejected);
    });

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
