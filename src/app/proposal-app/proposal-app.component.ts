import { Component, OnInit, Inject } from '@angular/core';
import { FirebaseApp } from 'angularfire2';

@Component({
  selector: 'app-proposal-app',
  templateUrl: './proposal-app.component.html',
  styleUrls: ['./proposal-app.component.css']
})
export class ProposalAppComponent implements OnInit {
  image: string;
  constructor(@Inject(FirebaseApp) firebaseApp: any) {
    const storageRef = firebaseApp.storage().ref().child('images/image.png');
    storageRef.getDownloadURL().then(url => this.image = url);
  }
  ngOnInit() {
  }

}
