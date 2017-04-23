import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-proposal-pending',
  templateUrl: './proposal-pending.component.html',
  styleUrls: ['./proposal-pending.component.css']
})
export class ProposalPendingComponent implements OnInit {
  authState;
  files;
  proposalsArray;

  constructor(private af: AngularFire,private router: Router) {
    this.af.auth.subscribe((auth) => {
     this.authState = auth;
    });
  }

  ngOnInit() {
    this.loadProposals();
  }

  loadProposals(){
    let listOfProposals = this.af.database.list('/proposals/');
    listOfProposals.subscribe((proposals) => {
      this.proposalsArray=[];
      proposals.forEach(proposal =>{
        let currentFiles =[];
        let title = proposal.$key;
        let uid = proposal.owner;
        let proposalFiles = this.af.database.list('/proposals/' + title + '/files/');
        proposalFiles.subscribe((files)=>{
          let i=0;
          files.forEach(file=>{
            currentFiles[i] ={
              fileName: file.fileName,
              fileURL: file.url,
              pdf: file.pdf
            };
            i++;
            console.log(currentFiles)
          });
        });

        this.proposalsArray.push({
          title: proposal.$key,
          uid: proposal.owner,
          files: currentFiles,
        });

      });
      console.log(this.proposalsArray)
    });
  }


  isReviewer(data){
    return data.accountType === 'reviewer';
  }
  isAdmin(data){
    return data.accountType === 'admin' || data.accountType === 'owner';
  }

  goToUrl(data){
    window.location.href='data.fileURL';
  }


}
