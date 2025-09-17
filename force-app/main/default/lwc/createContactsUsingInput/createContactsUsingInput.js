import { LightningElement,wire } from 'lwc';
import getAccRecs from '@salesforce/apex/getAccountRecords.getAccountRecords'
import LightningAlert from 'lightning/alert';
import LightningConfirm from "lightning/confirm";


export default class CreateContactsUsingInput extends LightningElement {

    @wire(getAccRecs,{})AccountRecords;

    // displayInfo = {
    //     primaryField: 'AccountRecords.Name',
    //     additionalFields: ['Title'],
    // };

    selectedrecId = null;
    contacts;
    handleChange(event){
        console.log(event.detail.recordId);
        this.getrecords(event.detail.recordId);
    }

   async getrecords(data){
    try{
     this.contacts = await getAccRecs({AccountId :data})

     const result = await LightningConfirm.open({
        message: 'this is the alert message',
        theme: 'Info', // a red theme intended for error states
        label: `Record Created ! for {data}`, // this is the header text
    });

    }catch(error){
        console.log('error Data',error.Message);
    }
    //    window.clearTimeout(this.delaytimeout)
    //    this.delaytimeout =  setTimeout(() => {     
    //     console.log('data',data);
    // let promise= new promise(resolve,reject)({
    //     if(resolve){
    //         getAccRecs({AccountId :data}).then(result => {
    //             contacts = result;
    //         }).catch(error=>{
    //             console.log('error has occureed',error.detail);
    //             console.log('cons',cons);
        
    //         })
    //     }
    // })

    // console.log('cons',cons);
    //     }, 300);
    }
    
}