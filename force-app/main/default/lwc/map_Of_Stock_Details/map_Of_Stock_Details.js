import { LightningElement, wire, track } from 'lwc';
import fetchNestedMap from '@salesforce/apex/StockData_Display.getDatav1';

export default class Map_Of_Stock_Details extends LightningElement {
    simpleMapStr;
    listOfMapStr;
    nestedMapStr;
    simpleMap = [];
    listOfMap = [];
    nestedMap = [];
    showSimpleMapCard = false;
    showListMapCard = false;
    showNestedMapCard = false;
 
		    handleNestedMap() {
   fetchNestedMap().then((result) => {
            this.nestedMap = [];
            console.log('result', result);
            for (var key in result) {
                let value = [];
                for (var innerkey in result[key]) {
                    value.push({ key: innerkey, value: result[key][innerkey] });
                }
                this.nestedMap.push({ key: key, value: value })
                console.log('key', key, result[key]);
            }
            this.nestedMapStr = JSON.stringify(result, null, 2);
            this.showNestedMapCard = true;
        }).catch((error) => {
            console.log(error);
        });
    }
}