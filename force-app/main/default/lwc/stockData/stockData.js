import {LightningElement, wire, track,api} from 'lwc';
import getStocks from '@salesforce/apex/Display_of_Stocks_data.displaystocks';
import showData from '@salesforce/apex/Display_of_Stocks_data.showstocksData';
import profitData from '@salesforce/apex/Display_of_Stocks_data.displaystocksprofitPercentage';
import displayData from '@salesforce/apex/Display_of_Stocks_data.showProfitData';
import { refreshApex } from '@salesforce/apex';
export default class StockData extends LightningElement {
 @track chartConfiguration;
 @track chartConfiguration1;
		
 isModalOpen = false
 stocks = [];
  stockName
  @track mapData = [];
  @track stockData;
   errorMSg;
   count;
    total;	    
	  

		 calculatedData;
	
	
 @wire(displayData) showData({data,error}){
		 if(data){
				 this.stockData = data;	
				 this.count = data.length;
				 console.log('////'+this.count);
		 }else if(error){
				 this.errorMSg = error;
		 }
 }

  gettheData(event){
		console.log('???',event.currentTarget.getAttribute("id").slice(0,-3));
		let stockName = event.currentTarget.getAttribute("id").slice(0,-3);
		this.showDetails(stockName);

  }

  @wire(profitData) showProfitData({error,data}){
	if (data) {
        for (let key in data) {
           this.mapData.push({value:data[key], key:key});
        }
		let countsize = this.mapData.size;
	}else if(error){

	   }
  }

 @wire(getStocks)
 getStocks({error, data}) {
  if(error) {
   this.error = error;
   this.chartConfiguration = undefined;
   console.log('error',JSON.stringify(error));
  }else if(data) {
		this.stocks = data;
	//	this.count = data.size;t
	console.log('data>>>',this.stocks);
     }
 }


			async showDetails(name){   //event
				 let chartData1 =  [];
				 let chartLabels1 = [];
				 let showdatarefresh = false;

       		await showData({StockName: name  })//event.currentTarget.getAttribute("id").slice(0,-3)})			   
						.then(result => {
							const arr = Array.from(result);
							console.log('arrr',arr);
							showdatarefresh = true;
							console.log('showdatarefresh',showdatarefresh);

					setTimeout(() => {
							this.isModalOpen = true
							arr.forEach(el => {
							this.stockName = el.Stock_Name__c;

							//	console.log(el.High__c);
							chartData1.push(el.High__c);
							chartLabels1.push(el.ResponseDate__c.slice(0,10));
							});		

							this.chartConfiguration1 = {
								type: 'bar',
								data: {
								labels: chartLabels1,
								datasets: [
								{
									  label: 'Stock Price',
										barPercentage: 0.1,
										barThickness: 4,
										maxBarThickness: 2,
										minBarLength: 6,
										backgroundColor: ["orangered", "teal", "olivedrab", "powderblue", "coral", "cyan","cornflowerblue","darkcyan","darkorchid","darkseagreen","darkturquoise","deeppink","deepskyblue","fuchsia","goldenrod","indianred","mediumpurple","lightsalmon","lightgreen","lightcyan","lightblue"],  
										borderColor: "Orange",
										hoverBorderColor: "blue",
										hoverBackgroundColor: "yellow",
										data: chartData1,	
										borderSkipped : "middle",
										inflateAmount : "auto",
																	
								},
								],
								},
								options: {
									    events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
										autoPadding : true,
										legend: {
													display: true,
													labels: {
														color: 'rgb(255, 99, 132)'
													}
												},
										scales: {
													xAxes: [{
														gridLines: {
															color: "rgba(0, 0, 0, 0)",
															drawBorder: true,
														}
													}],
													yAxes: [{
														gridLines: {
															color: "rgba(0, 1, 0, 1)",
															drawBorder: true,
														}   
													}]
										}
								}
							};	

							   }, 1000);	
   
						})
						
				 		 }

				cancel(){
				  console.log('close popup called');
				 this.isModalOpen = false
				 this.keyboardHandler();
				 }

				
				keyboardHandler(event) {
					event.stopPropagation();
					if (event.key === "Escape" || event.key === "Esc") {
						this.isModalOpen = false
					}
				}
				
}