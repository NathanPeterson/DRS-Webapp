import { Component, OnInit, Inject } from '@angular/core';
import { FileItem } from '../directives/file-item';
import { UploadFilesService } from '../services/upload-files.service';
import { Validators, FormBuilder } from '@angular/forms';
import { InstitutionService } from '../services/institution.service';
import { ProposalDomainService } from '../services/proposal-domain.service';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-proposal-app',
  templateUrl: './proposal-app.component.html',
  styleUrls: ['./proposal-app.component.css']
})
export class ProposalAppComponent {

  isDropZoneOver:boolean = false;
  isEnabledUpload: boolean = true;
  files: Array<FileItem[]> = [];
  form;
  institutions;
  currentUser;
  authState;
  name;
  domains;

  constructor(private uploadFilesService: UploadFilesService,
              private formBuilder: FormBuilder,
              private institutionService: InstitutionService,
              private af: AngularFire
              private proposalDomains: ProposalDomainService) {

      this.institutions = this.institutionService.get();
      this.domains = this.proposalDomains.get();
      this.af.auth.subscribe((auth) => {
       this.authState = auth;
      });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      fname: this.formBuilder.control(''),
      mi: this.formBuilder.control(''),
      lname: this.formBuilder.control(''),

      univ: this.formBuilder.control(''),
      department: this.formBuilder.control(''),
      discipline: this.formBuilder.control(''),
      subdiscipline: this.formBuilder.control(''),


      propType: this.formBuilder.control(''),
      propTitle: this.formBuilder.control(''),
    });

    this.currentUser = this.authState.uid;
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
      })
    });
  }

  public fileOverDropZone(e:any):void {
    this.isDropZoneOver = e;
  }

  uploadFilesToFirebase(data) {
    this.isEnabledUpload = false;
    this.af.database.list(`/users/`).update(this.currentUser,{
      firstName: data.fname,
      mi: data.mi,
      lastName: data.lname,

      university: data.univ,
      department: data.department,
      discipline: data.discipline,
      subdiscipline: data.subdiscipline,
    }).then(() =>
      this.uploadFilesService.uploadFilesToFirebase(this.files, "proposals")
    ).then(() => {

    });
  }

 clearFiles() {
  this.files = [];
  this.isEnabledUpload = true;
 }

}
