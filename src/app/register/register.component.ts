import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
   item: FirebaseListObservable<any>;

  constructor(public af: AngularFire) {
    this.model = { email: "", password: "" };

    this.item = af.database.list('/users/');

    this.af.auth.subscribe((auth) => {
     this.authState = auth;
    });
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      username: new FormControl(''),

      fname: new FormControl(''),
      mi: new FormControl(''),
      lname: new FormControl(''),
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


      })
    ).catch((err) => {
        alert(err);
    });
  }

}
