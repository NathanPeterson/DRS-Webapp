import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFire,} from 'angularfire2';
import { DomSanitizer } from '@angular/platform-browser';
import { SecurityContext } from '@angular/core';

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

}
