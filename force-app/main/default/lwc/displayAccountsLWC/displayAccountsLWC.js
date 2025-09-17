import { LightningElement,wire,track } from 'lwc';
import getAccounts from "@salesforce/apex/displayAccountRecords.getAccounts";

export default class DisplayAccountsLWC extends LightningElement {
    accounts;
    error;

    @wire(getAccounts) accounts;
    
}