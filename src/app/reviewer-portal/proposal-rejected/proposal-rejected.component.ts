import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-proposal-rejected',
  templateUrl: './proposal-rejected.component.html',
  styleUrls: ['./proposal-rejected.component.css']
})
export class ProposalRejectedComponent implements OnInit {
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
    let listOfProposals = this.af.database.list('/proposals/',{
      query:{
        orderByChild: 'status',
        equalTo: 'rejected'
      }
    });
    listOfProposals.subscribe((proposals) => {
      this.proposalsArray=[];
      proposals.forEach(proposal =>{
        let currentFiles =[];
        let proposalFiles = this.af.database.list('/proposals/' + proposal.$key + '/files/');
        proposalFiles.subscribe((files)=>{
          let i=0;
          files.forEach(file=>{
            currentFiles[i] ={
              fileName: file.fileName,
              fileURL: file.url,
            };
            i++;
          });
        });

        this.proposalsArray.push({
          title: proposal.$key,
          uid: proposal.owner,
          fullName: proposal.fullName,
          status: proposal.status,
          files: currentFiles,
        });

      });
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
