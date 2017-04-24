import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  public authState;
  public myInterval: number = 15000;

  constructor(private _elRef: ElementRef, public af: AngularFire) {
    this.af.auth.subscribe((auth) => {
      this.authState = auth;
    });
  }

  ngAfterViewInit(){
    // $(document).ready(function(){
    //   $('.my-countdown').countdown({
    //     until:$.countdown.UTCDate(
    //       -5,2017,4,28,18,0,0
    //     )
    //   });
    // });
  }

}
