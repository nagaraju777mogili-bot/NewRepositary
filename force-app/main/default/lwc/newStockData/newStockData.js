import { LightningElement, wire,track } from 'lwc';
import getData from '@salesforce/apex/ChartJsApex.extractData';
export default class NewStockData extends LightningElement {
@track datafromApex;
errormsg;
    @wire(getData)
    getRecs(data,error){
        if(data){
            this.datafromApex = data;
            console.log('from data block');
        }else if(error){
            this.errormsg = error;
        }
    }
}