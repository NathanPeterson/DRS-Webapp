import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Params, Router }   from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public authState;
  private reviewer =false;
  private admin =false;
  private owner = false;
  currentUser;
  public model;

  @ViewChild('autoShownModal') public autoShownModal:ModalDirective;
  public isModalShown:boolean = false;

  public showModal():void {
    this.isModalShown = true;
  }

  public hideModal():void {
    this.autoShownModal.hide();
  }

  public onHidden():void {
    this.isModalShown = false;
  }

  constructor(public af: AngularFire,private router: Router) {
    this.model = { email: "", password: "" };

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
          }else if(info.accountType === "owner"){
            this.owner = true;
          }
        });
      }
    });
  }

  ngOnInit() {
  }

  public submit() {
    this.af.auth.login(this.model).then((success) => {
      this.hideModal();
      this.router.navigate(['/home']);
    }).catch(alert)
  }



  public logout() {
    this.reviewer =false;
    this.admin = false;
    this.af.auth.logout();
  }

}
