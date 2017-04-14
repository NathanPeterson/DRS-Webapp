import { Component, OnInit, Inject } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Validators, FormBuilder } from '@angular/forms';
import { InstitutionService } from '../services/institution.service';
import { StatesService } from '../services/states.service';
import { ProposalDomainService } from '../services/proposal-domain.service';
import { CanActivate, Router } from '@angular/router';

@Component({
  selector: 'app-review-app',
  templateUrl: './review-app.component.html',
  styleUrls: ['./review-app.component.css']
})
export class ReviewAppComponent implements OnInit {
  form;
  institutions;
  currentUser;
  authState;
  name;
  domains;
  checkboxArray;
  isSubmitting = false;

  constructor(private formBuilder: FormBuilder,
              private institutionService: InstitutionService,
              private af: AngularFire,
              private proposalDomains: ProposalDomainService,
              private router: Router) {

      this.institutions = this.institutionService.get();
      this.domains = this.proposalDomains.get();
      this.af.auth.subscribe((auth) => {
       this.authState = auth;
      });
  }

  ngOnInit() {
  }

  reviewerApp(){
    if (this.authState) {
      this.currentUser = this.authState.uid;
      this.isSubmitting = !this.isSubmitting;
      const currentUserInfo = this.af.database.object('/users/' + this.currentUser);
      currentUserInfo.subscribe((info) =>{
        this.form = this.formBuilder.group({
          fname: this.formBuilder.control(info.firstName),
          mi: this.formBuilder.control(info.mi),
          lname: this.formBuilder.control(info.lastName),

          univ: this.formBuilder.control(info.university),
          department: this.formBuilder.control(info.department),
          discipline: this.formBuilder.control(info.discipline),
          subdiscipline: this.formBuilder.control(info.subdiscipline),

          pnum: this.formBuilder.control(info.phoneNumber),

          highdegree: this.formBuilder.control(''),
          likability: this.formBuilder.control(''),
          pickout: this.formBuilder.control(''),
        });
      });
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  check(data){
    data.isChecked = !data.isChecked;
  }

  sendReviewerAppToFirebase(data){
    this.af.database.list(`/users/` + this.currentUser).update("reviewerApplication", {
      highdegree: data.highdegree,
      likability: data.likability,
      pickout: data.pickout,
    }).then(()=>{
      for(let domain of this.domains){
        this.af.database.list(`/users/` + this.currentUser + "/reviewerApplication/").update("/domains/",{[domain.domain] : domain.isChecked})
      }
    }).then(()=>{

      const currentUserInfo = this.af.database.object('/users/' + this.currentUser);
      currentUserInfo.subscribe((info) =>{
        this.af.database.list(`reviewerApplications`).update(info.firstName + ' ' + info.lastName, {
          uid: this.currentUser,
          approved: false
        })
      }

    }).then((success)=>alert("submitted"));
  }

}
