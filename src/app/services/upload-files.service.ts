import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FileItem } from '../directives/file-item';
import * as firebase from 'firebase';
import * as _ from 'lodash';

@Injectable()
export class UploadFilesService {

  private IMAGES_FOLDER: string = 'images';
  private FOLDER_NAME: string;
  private PROPOSAL_TITLE: string;
  private FULLNAME: string;
  private authState;
  private fileName;

  constructor(public af: AngularFire) {
    this.af.auth.subscribe((auth) => {
     this.authState = auth;
    });
  }

  listLastImages(numberOfImages: number): FirebaseListObservable<any[]>{
    return this.af.database.list(`/${this.IMAGES_FOLDER}`, {
      query: {
        limitToLast: numberOfImages
      }
    });
  }

  uploadFilesToFirebase(files: Array<FileItem[]>, folderName: string, proposalTitle: string, fullName: string) {
    let storageRef = firebase.storage().ref();
    this.FOLDER_NAME = folderName;
    this.PROPOSAL_TITLE = proposalTitle;
    this.FULLNAME = fullName;

    _.each(files, (item:FileItem) => {

      let random = (Math.floor(Math.random() * 999999999 ) + 1).toString();

      item.isUploading = true;
      let uploadTask: firebase.storage.UploadTask = storageRef.child(`${this.FOLDER_NAME}/${this.PROPOSAL_TITLE}/${item.file.name}`).put(item.file);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => item.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => {},
        () => {
          item.url = uploadTask.snapshot.downloadURL;
          item.isUploading = false;
          this.fileName = item.file.name.slice(0, -4).split(" ").join("").toLowerCase();
          this.saveFile({ fileName: item.file.name, url: item.url});
        }
      );

    });

 }

 private saveFile(image:any) {
   this.af.database.list(`/${this.FOLDER_NAME}/`).update(this.PROPOSAL_TITLE, {owner: this.authState.uid, approveCount: 0, rejectCount: 0, status: 'pending...', fullName: this.FULLNAME});
   this.af.database.list(`/${this.FOLDER_NAME}/` + this.PROPOSAL_TITLE + /files/).update(this.fileName, image);
   this.af.database.list(`/users/`+ this.authState.uid  +`/proposals/` + this.PROPOSAL_TITLE + `/files/`).update( this.fileName, { proposalURL: image.url, proposalFile: image.fileName });
 }

}
