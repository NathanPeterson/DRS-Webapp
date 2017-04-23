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
    this.af.database.object('/users/' + data.uid + '/proposals/' + data.title).update({status: 'approved'});
    this.af.database.object('/proposals/' + data.title,{
      query:{
        orderByChild: 'owner',
        equalTo: data.uid,
      }
    }).update({status: 'approved'});
  }
  reject(data){
    this.af.database.object('/users/' + data.uid + '/proposals/' + data.title).update({status: 'rejected'});
    this.af.database.object('/proposals/' + data.title,{
      query:{
        orderByChild: 'owner',
        equalTo: data.uid,
      }
    }).update({status: 'rejected'});
  }
  pending(data){
    this.af.database.object('/users/' + data.uid + '/proposals/' + data.title).update({status: 'pending...'});
    this.af.database.object('/proposals/' + data.title,{
      query:{
        orderByChild: 'owner',
        equalTo: data.uid,
      }
    }).update({status: 'pending...'});
  }
}
