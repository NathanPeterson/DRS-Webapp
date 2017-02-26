import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public model;
  public authState;

  constructor(public af: AngularFire) {
    this.model = { email: "", password: "" };
      this.af.auth.subscribe((auth) => {
        this.authState = auth;
      });
  }

  ngOnInit() {
  }
  public submit() {
    this.af.auth.login(this.model).catch(alert);
  }

  public logout() {
    this.af.auth.logout();
  }
}
