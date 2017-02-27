import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  constructor(private _elRef: ElementRef) {
    // private route: ActivatedRoute,
    // private location: Location,
  }

  ngAfterViewInit(){
    $(document).ready(function(){
      $('.my-countdown').countdown({
        until:$.countdown.UTCDate(
          -5,2017,2,28,12,0,0
        )
      });
    });
  }

}
