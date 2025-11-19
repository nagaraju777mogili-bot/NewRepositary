import { LightningElement,wire } from 'lwc';
import cons from '@salesforce/apex/displayAccountRecords.getAccounts'

export default class LifeCycleHooks extends LightningElement {
    contacts;
    error;

    constructor(){
        super()
        console.log('constructor callback request')
    }
    
    @wire(cons) 
    consData({data,error}){
        console.log('from wire function',data)
        if(data){
        this.contacts = data;
        }else if(error){
         this.error = error;
        }
    }

    connectedCallback(){
        console.log('connected callback request')
        let result = this.consData; 
    }

    renderedCallback(){
        console.log('rendered callback request')
    }

    disconnectedCallback(){
        console.log('disconnected callback request')
    }



    

    
}