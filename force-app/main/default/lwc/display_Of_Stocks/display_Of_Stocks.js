import { LightningElement, wire, track,api } from 'lwc';
import fetchData from '@salesforce/apex/Display_of_Stocks_data.displaystocks';
import showData from '@salesforce/apex/Display_of_Stocks_data.showstocksData';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import chartjs from '@salesforce/resourceUrl/Chart';


export default class Display_Of_Stocks extends LightningElement {
stocks
	
errorData
error
singleStockData
@track stockPrices
stockName
		isModalOpen = false
    



    @wire(fetchData) results({data,error}){
				if(data){
					this.stocks = data
					this.error = undefined
				}else if(error){
					this.stocks = undefined
					this.error = error.body.message
				}
		}

		 showDetails(event){
				 this.isModalOpen = true
				 this.stockName = event.currentTarget.getAttribute("id").slice(0,-3);
        showData({stockName:event.currentTarget.getAttribute("id").slice(0,-3)})
							.then(result => {
							this.singleStockData = result;
							this.errorData = undefined;
						console.log('?????'+JSON.stringify(this.singleStockData));
						})
				  }
	

     cancel(){
				 this.isModalOpen = false
		 }

  
// 
 			//			var chart = anychart.bar();
//  
// // add the data
// chart.data(data);
// chart.container('container');
// chart.draw();
			//		console.log('lll',data);

}