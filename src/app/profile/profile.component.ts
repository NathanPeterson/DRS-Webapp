import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ActivatedRoute, Params, Router }   from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  authState;
  currentUser;
  proposalList;
  application;
  status: any = {
    isFirstOpen: true,
    isOpen: false
  };

  constructor(private af: AngularFire,
              private router: Router) {

    this.af.auth.subscribe((auth) => {
     this.authState = auth;
   });
 }

  ngOnInit() {

  }
  loadUser(){
    let currentUser = this.af.database.object('/users/' + this.authState.uid);
    currentUser.subscribe(user=> this.currentUser = user);
    let proposals = this.af.database.list('/users/' + this.authState.uid + '/proposals/');
    proposals.subscribe(proposals=> this.proposalList = proposals);
    let reviewer = this.af.database.object('/users/' + this.authState.uid + '/reviewerApplication/');
    reviewer.subscribe(reviewer=> this.application = reviewer.application);
  }
}
