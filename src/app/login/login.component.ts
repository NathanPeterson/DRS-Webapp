import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ActivatedRoute, Params, Router }   from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public model;
  public authState;

  constructor(public af: AngularFire,
              private router: Router) {
    this.model = { email: "", password: "" };
      this.af.auth.subscribe((auth) => {
        this.authState = auth;
      });
  }

  ngOnInit() {
  }
  public submit() {
    this.af.auth.login(this.model).then((success) => this.router.navigate(['/home'])).catch(alert)
  }

  public logout() {
    this.af.auth.logout();
  }
}
