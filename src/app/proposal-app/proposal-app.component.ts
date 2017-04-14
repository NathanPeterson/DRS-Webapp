import { Component, OnInit, Inject } from '@angular/core';
import { FileItem } from '../directives/file-item';
import { UploadFilesService } from '../services/upload-files.service';
import { Validators, FormBuilder } from '@angular/forms';
import { InstitutionService } from '../services/institution.service';
import { ProposalDomainService } from '../services/proposal-domain.service';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { CanActivate, Router } from '@angular/router';

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
  isSubmitting = false;

  constructor(private uploadFilesService: UploadFilesService,
              private formBuilder: FormBuilder,
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
      this.uploadFilesService.uploadFilesToFirebase(this.files, "proposals", data.propTitle)
    ).then(() => {
      this.af.database.list(`/users/` + this.currentUser + `/proposals/`).update(data.propTitle, {
        proposalTitle: data.propTitle,
        proposalDomain: data.propDomain,
      })
    });
  }

 clearFiles() {
  this.files = [];
  this.isEnabledUpload = true;
 }

 proposal(){

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

         propDomain: this.formBuilder.control(''),
         propTitle: this.formBuilder.control(''),
       })
     });
     return true;
   }
   this.router.navigate(['/login']);
   return false;
 }

}
