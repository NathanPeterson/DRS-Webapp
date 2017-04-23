import { Component, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFire,} from 'angularfire2';
import { DomSanitizer } from '@angular/platform-browser';
import { SecurityContext } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-review-proposal-object',
  templateUrl: './review-proposal-object.component.html',
  styleUrls: ['./review-proposal-object.component.css']
})

export class ReviewProposalObjectComponent{
  authState;
  typeRestricted=true;
  @Input() proposal;

  constructor(private af: AngularFire,
              private router: Router,
              private _sanitizer: DomSanitizer) {
    this.af.auth.subscribe((auth) => {
     this.authState = auth;
   });
  }

  url(data) {
      return this._sanitizer.bypassSecurityTrustResourceUrl(data.fileURL);
  }

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


  approve(data){
    let approveCount = this.af.database.object('/proposals/' + data.title + '/approveCount', {
      query:{
      orderByChild: 'owner',
      equalTo: data.uid,
      }
    });
    approveCount.$ref.transaction(count=>{
      if (count === null) {
           return count = 1;
       } else {
           return count + 1;
       }
    }).then(()=>{
      approveCount.subscribe(count =>{
        if(count.$value >= 3){
          this.af.database.object('/users/' + data.uid + '/proposals/' + data.title).update({status: 'approved'});
          this.af.database.object('/proposals/' + data.title,{
            query:{
              orderByChild: 'owner',
              equalTo: data.uid,
            }
          }).update({status: 'approved'});
        }
      });
    });
  }

  reject(data){
    this.af.database.object('/users/' + data.uid + '/proposals/' + data.title).update({status: 'rejected'});
    // this.af.database.object('/proposals/' + data.title,{
    //   query:{
    //     orderByChild: 'owner',
    //     equalTo: data.uid,
    //   }
    // }).update({status: 'rejected'});

    let rejectCount = this.af.database.object('/proposals/' + data.title + '/rejectCount', {
      query:{
      orderByChild: 'owner',
      equalTo: data.uid,
      }
    });
    rejectCount.$ref.transaction(count=>{
      if (count === null) {
           return count = 1;
       } else {
           return count + 1;
       }
    }).then(()=>{
      rejectCount.subscribe(count =>{
        if(count.$value >= 3){
          this.af.database.object('/users/' + data.uid + '/proposals/' + data.title).update({status: 'rejected'});
          this.af.database.object('/proposals/' + data.title,{
            query:{
              orderByChild: 'owner',
              equalTo: data.uid,
            }
          }).update({status: 'rejected'});
        }
      });
    });
  }
  pending(data){
    this.af.database.object('/users/' + data.uid + '/proposals/' + data.title).update({status: 'pending...'});
    let reset = this.af.database.object('/proposals/' + data.title,{
      query:{
        orderByChild: 'owner',
        equalTo: data.uid,
      }
    });
    reset.update({status: 'pending...'});
    reset.update({approveCount: 0});
    reset.update({rejectCount: 0});

    let resetCount = this.af.database.object('/proposals/' + data.title + '/resetCount',{
      query:{
        orderByChild: 'owner',
        equalTo: data.uid,
      }
    });
    resetCount.$ref.transaction(count=>{
      if (count === null) {
           return count = 1;
       } else {
           return count + 1;
       }
     })
  }
}
