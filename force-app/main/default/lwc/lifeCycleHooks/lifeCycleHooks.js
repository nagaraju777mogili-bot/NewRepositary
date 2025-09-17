import { LightningElement,wire } from 'lwc';
import cons from '@salesforce/apex/displayAccountRecords.getAccounts'

export default class LifeCycleHooks extends LightningElement {

    connectedCallback(){
        console.log('connected callback request')
        let result = this.consData; 
    }

    constructor(){
        super()
        console.log('constructor callback request')
    }

    contacts;
    error;

    @wire(cons) 
    consData({data,error}){
        if(data){
        this.contacts = data;
        }else if(error){
         this.error = error;
        }
    }
    
}