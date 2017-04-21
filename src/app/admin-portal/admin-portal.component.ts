import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFire,} from 'angularfire2';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.css']
})
export class AdminPortalComponent implements OnInit {
  authState;
  currentUser;
  adminHome;

  constructor(private af: AngularFire,private router: Router) {
    this.af.auth.subscribe((auth) => {
     this.authState = auth;
    });
    this.adminHome =false;
  }

  ngOnInit() {
  }

  setHomeTrue(){
    this.adminHome = true;
  }
  setHomeFalse(){
    this.adminHome = false;
  }

}
