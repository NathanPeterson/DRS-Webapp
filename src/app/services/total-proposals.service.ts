export class TotalProposalsService {
  approved =0;
  pending =0;
  rejected =0;
  getApproved(){
    return this.approved;
  };

  getPending(){
    return this.pending;
  };

  getRejected(){
    return this.rejected;
  };
  setApproved(value){
    this.approved = value;
  };

  setPending(value){
    this.pending = value;
  };

  setRejected(value){
    this.rejected = value;
  };
}
