import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { ProposalDomainService } from '../../services/proposal-domain.service';

@Component({
  selector: 'app-admin-reviewer-apps',
  templateUrl: './reviewer-apps.component.html',
  styleUrls: ['./reviewer-apps.component.css']
})

export class AdminReviewerAppsComponent implements OnInit {
  onApplicationDelete(mediaItem) { }
  authState;
  domains;
  reviewApplicationArray =[];
  firstApplication = {
    id: 1,
    fname: "Bob",
    lname: "Bob",
    username: "Bob",
    question1: "Series",
    question2: "Science Fiction",
    question3: 2010,
    uid: 2010,
    isFavorite: false
  };

  constructor(private af: AngularFire,
              private router: Router,
              private proposalDomains: ProposalDomainService,) {
    this.af.auth.subscribe((auth) => {
     this.authState = auth;
    });

    this.domains = this.proposalDomains.get();
  }

  ngOnInit() {
    this.loadData();
  }
  loadData(){
    const listOfUsers = this.af.database.list('/reviewerApplications/');
    listOfUsers.subscribe((applications) =>{
      this.reviewApplicationArray = [];
      applications.forEach(info =>{
        let user = this.af.database.object('/users/' + info.uid);
        user.subscribe(userInfo=> {
          let app = this.af.database.object('/users/' + info.uid +'/reviewerApplication/');
          app.subscribe(app =>{
                this.reviewApplicationArray.push({
                  username: userInfo.username,
                  fname: userInfo.firstName,
                  lname: userInfo.lastName,
                  uid: userInfo.uid,
                  highdegree: app.highdegree,
                  likability: app.likability,
                  pickout: app.pickout,
                  application: app.application,
                });
          });
        });
      });
    })
  }
}
