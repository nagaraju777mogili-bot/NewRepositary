import { LightningElement,api } from 'lwc';

export default class ParenttochildfunctionChild extends LightningElement {
   timestamp = new Date();
    @api
       refresh(){
      this.timestamp = new Date();
      console.log('Invoked from Child JS');
       }
}