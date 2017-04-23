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

  constructor(private af: AngularFire,
              private router: Router,) {
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
        equalTo: 'pending...'
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
          status: proposal.status,
          files: currentFiles,
          rejectCount: proposal.rejectCount,
          approveCount: proposal.approveCount,
          resetCount: proposal.resetCount,
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
