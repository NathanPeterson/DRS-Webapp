import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public authState;

  constructor(public af: AngularFire) {
    this.af.auth.subscribe((auth) => {
      this.authState = auth;
    });
  }

  ngOnInit() {
  }

  public logout() {
    this.af.auth.logout();
  }

}
