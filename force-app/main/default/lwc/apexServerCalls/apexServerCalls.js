import { LightningElement,track,wire } from 'lwc';
import searchContactList from '@salesforce/apex/getDatatoLWC.retrieveCons'
export default class ApexServerCalls extends LightningElement {
    @track searchKey = '';
    @track contacts;
    @track error;      
 
    searchContact(event){        
        this.searchKey = event.target.value;       
        console.log('????',this.searchKey); 
    }
 
    @wire(searchContactList, {accountName:'$searchKey'})
    wiredContacts({data, error}){
        if(data){
            this.contacts = data;
            this.error = undefined;
            console.log('contacts',this.contacts);
        }
        else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }
}