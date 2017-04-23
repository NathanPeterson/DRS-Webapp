import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Validators, FormBuilder } from '@angular/forms';
import { InstitutionService } from '../services/institution.service';
import { StatesService } from '../services/states.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  item: FirebaseListObservable<any>;
  model;
  authState;
  form;
  currentUser;
  institutions;
  states;
  special = false;
  onSpecialYes() {
   this.special =true;
  }
  onSpecialNo() {
   this.special =false;
  }
  dietRestriction = false;
  onDietYes() {
   this.dietRestriction =true;
  }
  onDietNo() {
   this.dietRestriction =false;
  }


  constructor(public af: AngularFire,
              private formBuilder: FormBuilder,
              private institutionService: InstitutionService,
              private statesService: StatesService,
              private router: Router) {
    this.model = { email: "", password: "" };
    this.af.auth.subscribe((auth) => {
     this.authState = auth;
    });
    this.institutions = this.institutionService.get();
    this.states = this.statesService.get();
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      email: this.formBuilder.control(''),
      password: this.formBuilder.control(''),
      username: this.formBuilder.control(''),

      fname: this.formBuilder.control(''),
      mi: this.formBuilder.control(''),
      lname: this.formBuilder.control(''),

      pnum: this.formBuilder.control(''),
      address: this.formBuilder.control(''),
      city: this.formBuilder.control(''),
      state: this.formBuilder.control('IN'),
      zipcode: this.formBuilder.control(''),


      univ: this.formBuilder.control(''),
      department: this.formBuilder.control(''),
      discipline: this.formBuilder.control(''),
      subdiscipline: this.formBuilder.control(''),

      special: this.formBuilder.control('false'),
      diet: this.formBuilder.control('false'),
    });
  }

  public submit(data) {
    this. model = { email: data.email, password: data.password }

    this.af.auth.createUser(this.model).then((success) =>{
        this.currentUser = this.authState.uid;
        this.item = this.af.database.list('/users');
    }).then(() =>
      this.item.update(this.currentUser,{
        uid: this.currentUser,
        username: data.username,
        email: data.email,

        firstName: data.fname,
        mi: data.mi,
        lastName: data.lname,

        phoneNumber: data.pnum,
        address: data.address,
        city: data.city,
        state: data.state,
        zipcode: data.zipcode,

        university: data.univ,
        department: data.department,
        discipline: data.discipline,
        subdiscipline: data.subdiscipline,

        special: data.special,
        diet: data.diet,

        accountType: 'standard'

      })
    ).then(()=>{
      this.af.auth.getAuth().auth.sendEmailVerification();
      alert("Sent Email verification");
    }).catch((err) => {
        alert(err);
    }).then((success) =>{
      this.router.navigate(['/home']
    });
  }

}
