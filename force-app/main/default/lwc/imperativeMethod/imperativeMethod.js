import { LightningElement,track } from 'lwc';
import getAccounts from "@salesforce/apex/imperativeApexclass.imperativeMethod";


export default class ImperativeMethod extends LightningElement {
   @track accounts;
   @track error;

   handleLoad(){
    getAccounts()
    .then((result) => {
        this.accounts = result;
      })
      .catch((error) => {
        this.error = error;
      });
  }
}