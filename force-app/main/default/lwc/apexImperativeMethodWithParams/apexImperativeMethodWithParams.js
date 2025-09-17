import { LightningElement } from 'lwc';
import getcontactsdata from "@salesforce/apex/apexImperativeMethodWithParams.getcontacts";


export default class ApexImperativeMethodWithParams extends LightningElement {
    searchKey = '';
    contacts;
    error;
   
    handleKeyChange(event){
        this.searchKey = event.target.value;
    }

    async handleSearch(){
        try {
           this.contacts = await getcontactsdata({searchkey : this.searchKey});  
            this.error = undefined;
        } catch (error) {
            this.contacts = undefined;
            this.error = error
        }
    }
}