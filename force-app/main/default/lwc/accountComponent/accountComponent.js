import { LightningElement,wire } from 'lwc';
import getcons from '@salesforce/apex/getcontacts.getcontacts';
import getaccs from '@salesforce/apex/getcontacts.getaccs';

export default class AccountComponent extends LightningElement {
   accs;
   error = 'error inside this';
 @wire(getaccs) accounts;
        
 handleclick(event){
   console.log('event???'+event.detail.Id);
 }
}