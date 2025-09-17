import { LightningElement,wire,track } from 'lwc';
import stockDetails from '@salesforce/apex/StockData_Display.getData'
	export default class Display_Stock_Data extends LightningElement {
		@track columns = [
          { label: 'Name', fieldName: 'Stock_Name__c' },
          { label: 'Open Price', fieldName: 'Open__c'},
				  { label: 'Stock Price Date', fieldName: 'ResponseDate__c'}, 
      ];
     @track accountList; 
			
			//Method 2
     @wire (stockDetails) wiredAccounts({data,error}){
          if (data) {
            this.accountList = data;
          } else if (error) {
          console.log(error);
          }
     }
}