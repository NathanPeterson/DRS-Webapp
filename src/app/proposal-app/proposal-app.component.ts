import { Component, OnInit, Inject } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-proposal-app',
  templateUrl: './proposal-app.component.html',
  styleUrls: ['./proposal-app.component.css']
})
export class ProposalAppComponent implements OnInit {
  image: string;
  constructor() {
    const storageRef = firebase.storage().ref().child('images/image.png');
    storageRef.getDownloadURL().then(url => this.image = url);
  }
  ngOnInit() {
  }

}
