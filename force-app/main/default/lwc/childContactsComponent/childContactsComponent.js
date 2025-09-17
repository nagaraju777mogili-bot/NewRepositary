import { LightningElement,api } from 'lwc';
import getContacts from '@salesforce/apex/AccountController.getContacts';

import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class ChildContactsComponent extends LightningElement {
     contacts;
     error;
      
    @api
   async refresh(strString) {
        console.log('strString'+strString);
        try{
          this.contacts = await getContacts({AccountId:strString});
          this.error = undefined;
          console.log(JSON.stringify(this.contacts));
        }
        catch(error){
          this.contacts = undefined;
          this.error = error;
        }
   
      }

}