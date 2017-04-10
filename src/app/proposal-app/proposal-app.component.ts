import { Component, OnInit, Inject } from '@angular/core';
import { FileItem } from '../directives/file-item';
import { UploadFilesService } from '../services/upload-files.service';
import { Validators, FormBuilder } from '@angular/forms';
import { InstitutionService } from '../services/institution.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

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

  constructor(private uploadFilesService: UploadFilesService,
              private formBuilder: FormBuilder,
              private institutionService: InstitutionService,
              private af: AngularFire) {

      this.institutions = this.institutionService.get();
      this.af.auth.subscribe((auth) => {
       this.currentUser = auth.uid;
      });
      const currentUserInfo = this.af.database.list("/users", {
        preserveSnapshot: true,
        query: {
          equalTo: this.currentUser
        }
      }).subscribe(snapshots=>{
        snapshots.forEach(snapshot => {
            console.log(snapshot.lastName, snapshot.lastName);
        });
      })
      // currentUserInfo.subscribe(
      //   val => console.log(val)
      // )
      console.log("This is my current user" + currentUserInfo)
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
    });
  }

  public fileOverDropZone(e:any):void {
    this.isDropZoneOver = e;
  }

  uploadFilesToFirebase() {
    this.isEnabledUpload = false;
    this.uploadFilesService.uploadFilesToFirebase(this.files, "proposals");
  }

 clearFiles() {
  this.files = [];
  this.isEnabledUpload = true;
 }

}
