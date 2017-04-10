import { Component } from '@angular/core';
import { FileItem } from '../directives/file-item';
import { UploadFilesService } from '../services/upload-files.service';

@Component({
  selector: 'app-proposal-app',
  templateUrl: './proposal-app.component.html',
  styleUrls: ['./proposal-app.component.css']
})
export class ProposalAppComponent {

  isDropZoneOver:boolean = false;
  isEnabledUpload: boolean = true;
  files: Array<FileItem[]> = [];

  constructor(public uploadFilesService: UploadFilesService) {
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
