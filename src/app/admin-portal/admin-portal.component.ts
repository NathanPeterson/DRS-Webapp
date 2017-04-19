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
  }

  ngOnInit() {
    this.adminHome = true;
  }

  setHomeTrue(){
    this.adminHome = true;
    console.log(this.adminHome);
  }
  setHomeFalse(){
    this.adminHome = false;
    console.log(this.adminHome);
  }

}
