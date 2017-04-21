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
  authState;
  domains;
  reviewApplicationArray =[];

  constructor(private af: AngularFire,
              private router: Router,
              private proposalDomains: ProposalDomainService,) {
    this.af.auth.subscribe((auth) => {
     this.authState = auth;
    });

    this.domains = this.proposalDomains.get();
  }

  ngOnInit() {

  }
  loadData(){
    const listOfUsers = this.af.database.list('/reviewerApplications/');
    listOfUsers.subscribe((applications) =>{
      this.reviewApplicationArray = [];
      applications.forEach(info =>{
        let app = this.af.database.object('/users/' + info.uid +'/reviewerApplication/');
        app.subscribe(app =>{
              this.reviewApplicationArray.push({
                highdegree: app.highdegree,
                likability: app.likability,
                pickout: app.pickout,
              });
              console.log(app)
              console.log(this.reviewApplicationArray)
        });
      })
    })
  }
}
