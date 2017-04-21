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
  typeRestricted=true;
  @Input() application;

  constructor(private af: AngularFire,private router: Router) {
    this.af.auth.subscribe((auth) => {
     this.authState = auth;
   });
  }
  approve(data){
    let currentUser = this.af.database.object('/users/' + data.uid).subscribe(info=>{
      if(info.accountType === 'admin' || info.accountType === 'owner'){
        this.typeRestricted = true;
      }else{
        this.typeRestricted = false;
      }
    });
    if(!this.typeRestricted){
      this.af.database.object('/users/' + data.uid).update({accountType: 'reviewer'});
    }

    this.af.database.object('/users/' + data.uid + '/reviewerApplication/').update({application: 'approved'});
    this.af.database.list('/reviewerApplications/',{
      query:{
        orderByChild: 'uid',
        equalTo: data.uid,
      }
    }).update(data.fname + ' ' + data.lname,{approved: true});
  }
  reject(data){
    let currentUser = this.af.database.object('/users/' + data.uid).subscribe(info=>{
      if(info.accountType === 'admin' || info.accountType === 'owner'){
        this.typeRestricted = true;
      }else{
        this.typeRestricted = false;
      }
    });
    if(!this.typeRestricted){
      this.af.database.object('/users/' + data.uid).update({accountType: 'standard'});
    }
    this.af.database.object('/users/' + data.uid + '/reviewerApplication/').update({application: 'rejected'});
    this.af.database.list('/reviewerApplications/',{
      query:{
        orderByChild: 'uid',
        equalTo: data.uid,
      }
    }).update(data.fname + ' ' + data.lname,{approved: false});
  }
  pending(data){
    this.af.database.object('/users/' + data.uid + '/reviewerApplication/').update({application: 'pending...'});
    this.af.database.list('/reviewerApplications/',{
      query:{
        orderByChild: 'uid',
        equalTo: data.uid,
      }
    }).update(data.fname + ' ' + data.lname,{approved: 'pending...'});
  }
}
