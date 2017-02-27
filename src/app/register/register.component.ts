import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Validators, FormBuilder } from '@angular/forms';
import { InstitutionService } from '../services/institution.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   model;
   authState;
   form;
   currentUser;
   institutions;
   item: FirebaseListObservable<any>;

  constructor(public af: AngularFire,
              private formBuilder: FormBuilder,
              private institutionService: InstitutionService) {
    this.model = { email: "", password: "" };
    this.item = af.database.list('/users/');
    this.af.auth.subscribe((auth) => {
     this.authState = auth;
    });
    this.institutions = this.institutionService.get();
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      email: this.formBuilder.control(''),
      password: this.formBuilder.control(''),
      username: this.formBuilder.control(''),

      fname: this.formBuilder.control(''),
      mi: this.formBuilder.control(''),
      lname: this.formBuilder.control(''),

      univ: this.formBuilder.control(''),
    });
  }

  public submit(data) {
    this. model = { email: data.email, password: data.password }

    this.af.auth.createUser(this.model).then((success) =>{
        console.log(data);
        this.currentUser = this.authState.uid;
    }).then(() =>
      this.item.push({
        uid: this.currentUser,
        username: data.username,
        email: data.email,

        firstName: data.fname,
        mi: data.mi,
        lastName: data.lname,

        university: data.univ,

      })
    ).catch((err) => {
        alert(err);
    });
  }

}
