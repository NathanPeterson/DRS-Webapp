import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFire,} from 'angularfire2';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})

export class ApplicationComponent{
  authState;
  @Input() application;

  constructor(private af: AngularFire,private router: Router) {
    this.af.auth.subscribe((auth) => {
     this.authState = auth;
   });
  }
  approve(data){
    this.af.database.object('/users/' + data.uid + '/reviewerApplication/').update({application: 'approved'});
    this.af.database.list('/reviewerApplications/',{
      query:{
        orderByChild: 'uid',
        equalTo: data.uid,
      }
    }).update(data.fname + ' ' + data.lname,{approved: true});
  }
  reject(data){
    this.af.database.object('/users/' + data.uid + '/reviewerApplication/').update({application: 'denied'});
    this.af.database.list('/reviewerApplications/',{
      query:{
        orderByChild: 'uid',
        equalTo: data.uid,
      }
    }).update(data.fname + ' ' + data.lname,{approved: false});
  }
}
