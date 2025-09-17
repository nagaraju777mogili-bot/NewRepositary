import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord } from 'lightning/uiRecordApi';

const FIELDS = ['Case.Status', 'Case.Reason'];

export default class testComponent extends LightningElement {
    @api recordId;
    Case;
    Status;
    Reason;
		
		 DisplayText = false;
  textValue='LWC Function Invoked through Aura Component'  
  @api LWCFunction(){
    this.DisplayText = true; 
			alert('????????');
  }
		
		@wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredRecord({ error, data }) {
				alert('from LWC component');
        if (error) {
            let message = 'Unknown error';
            if (Array.isArray(error.body)) {
                message = error.body.map(e => e.message).join(', ');
            } else if (typeof error.body.message === 'string') {
                message = error.body.message;
            }
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading contact',
                    message,
                    variant: 'error',
                }),
            );
        } else if (data) {
            this.case = data;
            this.Status = this.case.fields.Status.value;
            this.Reason = this.case.fields.Reason.value;
						if(this.Reason === 'Performance' && this.Status === 'Escalated'){
						this.showToast();
						}
        }
				
    }
		
		 showToast() {
            const event = new ShowToastEvent({
              title: "Toast Info",
              message: "the information message ",
              messageData: "Its working perfectly",
              variant: "info",
              mode: "pester"
          });
          this.dispatchEvent(event);
        }
}