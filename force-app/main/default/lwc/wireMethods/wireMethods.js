import { LightningElement,wire } from 'lwc';
import cons  from '@salesforce/apex/getDatatoLWC.retrieveCons';
import relatedContacts from '@salesforce/apex/getDatatoLWC.getContacts';
const DELAY = 300;

export default class WireMethods extends LightningElement {
  
    contacts;
    error

    wiredContacts;
    wiredError

    
    @wire(cons,{})
    contacts;

    accountName = ""

    @wire(cons,{})
    wiredContacts({data,error}){
        if(data){
            this.wiredContacts = data;
            console.log(JSON.stringify(this.wiredContacts))
        }else if(error){
            this.wiredError = error
        }
     }
    
    
     @wire(relatedContacts,{accountName:"$accountName"})contactsData;


     getAccountsData(event){

       window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
          this.delayTimeout = setTimeout(() => {
          this.accountName = searchKey;
        }, DELAY);
    
        console.log('accountName',this.accountName)
     }


}