// recordEditFormStaticAccount.js
import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const FIELDS = ['Account.Name'];

export default class toastMessageCompenent extends LightningElement {

    @api recordId;
    @api objectApiName; 
    inputVal = '';

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    account;

    get name() {
      return this.account.data.fields.Name.value;
    }

    handleChange(event) {
      this.inputVal = event.target.value;
				if(inputVal === 'abc'){
						alert('***'+inputVal);
				}
				showToast();
    }
		
		showToast() {
    const event = new ShowToastEvent({
        title: 'Toast message',
        message: 'Toast Message',
        variant: 'success',
        mode: 'dismissable'
    });
    this.dispatchEvent(event);
}

    handleSubmit(event){
      event.preventDefault();
      const inputCmp = this.template.querySelector("lightning-input");
      const value = inputCmp.value;
        // perform validation check
        if (!value.includes("Burlington")) {
            inputCmp.setCustomValidity("The account name must include 'Burlington'");
        } else {
            // if there was a custom error before, reset it
            inputCmp.setCustomValidity(""); 
            const fields = event.detail.fields;
            fields.Name = this.inputVal;
            this.template.querySelector('lightning-record-edit-form').submit(fields);
        }
        // shows the error right away without user interaction
        inputCmp.reportValidity(); 
      
   }

   
}