import { LightningElement,wire,track } from 'lwc';
import getDataFromApex from '@salesforce/apex/StockData_Display.getDatav2';
const COLUMNS = [
  {label:'Stock Name', fieldName:'Stock_Name__c'},
  {label:'Prices', fieldName:'Open__c'}
]
export default class Display_Stock_Data_MapOfList extends LightningElement {
	@track mapkeyvaluestore=[];
   error
   data
   profitdata =[]
   @track stockPricesData = [];
   columns = COLUMNS


  

@wire(getDataFromApex)
getResults(result){
if(result.data){
    for(var key in result.data){

      let calProfit = '';
      let firstMonth = result.data[key][0];
      let currentMonth = result.data[key][result.data[key].length-1];
      
      // calProfit.push((currentMonth.Open__c-firstMonth.Open__c)/firstMonth.Open__c*100);
        this.profitdata.push({key:key,value:calProfit})
        console.log('calProfit'+calProfit);
        this.mapkeyvaluestore.push({key:key,value:result.data[key]});
      }
		}
  else if(result.error){
    console.log('Some error occured'+error);
  }
 }

 @wire(getDataFromApex)
 dataHandler({data,error}){
     if(data){
       console.log('data==>',data);
        this.stockPricesData.push(data);
        console.log('???',this.stockPricesData)
     }
     if(error){
      console.log('???',error.message)

     }
 }

}