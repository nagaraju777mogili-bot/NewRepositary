import { LightningElement } from 'lwc';
import chartjs from '@salesforce/resourceUrl/Chart';

export default class FirstTest extends LightningElement {
 mychart = document.getElementById("chart")
 data 
		
		
		calldata(){
			
				console.log('invoked');
				var mychart = chartjs.bar();
				console.log('myData'+data);
// add the data
mychart.data(data);
				mychart.container('container');
mychart.draw();
				console.log('myData'+data);
		}
		
}