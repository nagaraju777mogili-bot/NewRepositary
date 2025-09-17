import { LightningElement,wire } from 'lwc';
import getAccountlist from "@salesforce/apex/displayAccountrecsLWC.displayrecs";

export default class DisplayAccoutrecsLWC extends LightningElement {
    @wire(getAccountlist) accountrecs;


}