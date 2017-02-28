import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-event-page',
  templateUrl: './my-event-page.component.html',
  styleUrls: ['./my-event-page.component.css']
})
export class MyEventPageComponent implements OnInit {

  keynoteSpeaker = "Angela Davis";
  constructor() { }

  ngOnInit() {
  }

}
