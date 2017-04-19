import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-admin-reviewer-apps',
  templateUrl: './reviewer-apps.component.html',
  styleUrls: ['./reviewer-apps.component.css']
})

export class AdminReviewerAppsComponent implements OnInit {
  authState;
  
  constructor(private af: AngularFire,private router: Router) {
    this.af.auth.subscribe((auth) => {
     this.authState = auth;
    });
  }

  ngOnInit() {
  }

}
