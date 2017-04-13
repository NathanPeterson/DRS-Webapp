import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public authState;
  private reviewer =false;
  private admin =false;

  constructor(public af: AngularFire) {
    this.af.auth.subscribe((auth) => {
      this.authState = auth;
      if(this.authState){
        this.currentUser = this.authState.uid;
        const currentUserInfo = this.af.database.object('/users/' + this.currentUser);
        currentUserInfo.subscribe((info) =>{
          if(info.accountType === "reviewer"){
            this.reviewer = true;
          }else if(info.accountType === "admin"){
            this.admin = true;
          }
        });
      }
    });
  }

  ngOnInit() {
  }


  public logout() {
    this.reviewer =false;
    this.admin = false;
    this.af.auth.logout();
  }

}
