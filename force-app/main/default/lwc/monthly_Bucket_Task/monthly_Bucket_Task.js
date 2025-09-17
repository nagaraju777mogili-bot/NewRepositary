import { LightningElement,track,wire,api } from 'lwc';
import monthsData from '@salesforce/apex/MonthlyBucketTask.getMonthsData';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import { CurrentPageReference } from 'lightning/navigation';

import OPP_NAME from "@salesforce/schema/Opportunity.Name";
import START_DATE from "@salesforce/schema/Opportunity.start_Date__c";
import LAST_DATE from "@salesforce/schema/Opportunity.last_Date__c";

const FIELDS = [OPP_NAME, START_DATE, LAST_DATE];

export default class Monthly_Bucket_Task extends LightningElement {

    @track recordId;
    currentPageReference = null; 
    urlStateParameters = null;

    opName;

    @track  startDate;
    @track lastDate;
    startMonth
    endMonth
    startYear;
    endYear;
    mapData
    error;
    stack;

    @track month;
    @track diffMonth;
    @track currentMonth;
   @track  cols = [];
   @track monthHeaders = [];
   @track inputData = []

   columns = this.cols;
    data = [];
    // renderedCallback(){
    //     this.handlechange();
    // }

    @wire(CurrentPageReference)
    getPageReferenceParameters(currentPageReference) {
       if (currentPageReference) {
          console.log(currentPageReference);
          this.recordId =  currentPageReference.attributes.recordId;
          console.log('*********',this.recordId);
       }
    }

    // renderedCallback(){
    //     this.startMonth = new Date(this.startDate).getMonth();
    //     this.endMonth = new Date(this.lastDate).getMonth();
    //     this.startYear = new Date(this.startDate).getFullYear();
    //     this.endYear = new Date(this.lastDate).getFullYear();
    // }

    @wire(getRecord, {recordId:'$recordId', fields: FIELDS })
    opp({data,error}){
    console.log('recordId',this.recordId)
        if(data){
            this.startDate = this.startDatefromRec;
            console.log('data', JSON.parse(JSON.stringify(data)));
            this.opName = getFieldValue(data,OPP_NAME);
            this.startDate = getFieldValue(data, START_DATE);
            this.lastDate = getFieldValue(data, LAST_DATE);
            console.log(' this.lastDate', this.lastDate,' this.startDate', this.startDate);

        }else if(error){
            console.log('moved into else blcok',error);
        }
    }

    

    // handlechange(event){
    //     console.log('this.startDatefromRec',this.startDatefromRec);
    //     this.startDate = this.startDatefromRec;//this.template.querySelector(".startDate").value;
    //     this.lastDate = this.endDDatefromRec;//this.template.querySelector(".lastDate").value;
    //     console.log(this.startDate,this.lastDate);
    //      this.startMonth = new Date(this.startDate).getMonth();
    //      this.endMonth = new Date(this.lastDate).getMonth();
    //      console.log('this.startMonth',this.startMonth,'==this.endMonth==',this.endMonth);
    //        }


  async   CreateMonthlyBucketData(){
        this.startMonth = new Date(this.template.querySelector(".startDate").value).getMonth();
        this.endMonth = new Date(this.template.querySelector(".lastDate").value).getMonth();
        this.startYear = new Date(this.template.querySelector(".startDate").value).getFullYear();
        this.endYear = new Date(this.template.querySelector(".lastDate").value).getFullYear();

        this.startDate =  new Date(this.template.querySelector(".startDate").value).getDate();
        this.lastDate = new Date(this.template.querySelector(".lastDate").value).getDate();

        if(this.startMonth == this.endMonth && this.startYear == this.endYear && this.startDate >= this.lastDate){
            const evt = new ShowToastEvent({
                title: 'Contract Period Error',
                message: 'Start Date must be less than last Date',
                variant: 'error',
                mode: 'dismissable'
            });
            this.dispatchEvent(evt);
        }

       else if(this.startMonth == this.endMonth && this.startYear == this.endYear  && this.startDate <= this.lastDate){
            const evt = new ShowToastEvent({
                title: 'Contract Period Error',
                message: 'select the different month and year for the two Dates',
                variant: 'error',
                mode: 'dismissable'
            });
            this.dispatchEvent(evt);
            }
        
        console.log('this.startMonth',this.startMonth,'==this.endMonth==',this.endMonth);
            console.log('=====');
            await monthsData({startMonth : this.startMonth, lastMonth:  this.endMonth,
                startYear : this.startYear,endYear: this.endYear}).then((result)=>{
                console.log('=====',result);
                    const data = JSON.stringify(result);
                    console.log('letdata'+data);
                    console.log('object --entries', Object.entries(result));

                    for (const [key, value] of Object.entries(result)) {
                        console.log('entered====',key);

                        this.cols.push(key);
                       
                      }

                    //   for (const [key, value] of Object.entries(result)) {
                    //     console.log('entered====');
                    //     this.monthHeaders.push(key);
                    //     // document.getElementById(key).value = value
                    //   }
               
                    console.log('data',Object.keys(data));
                    console.log('this.monthHeaders',this.monthHeaders);

            }).catch((error)=>{
                console.log(error.Message);
        })
        
    }
        get oppName() {
            return getFieldValue(this.opp.data, OPP_NAME);
          }
        
          get startDatefromRec() {
            return getFieldValue(this.opp.data, START_DATE);
          }
        
          get endDDatefromRec() {
            return getFieldValue(this.opp.data, LAST_DATE);
          }
    
    //       get createHeader(){
    //         this.startDate = new Date(this.opportunity.data.fields.start_Date__c.value);
    //         this.startDate = this.startDate.getMonth();
    //         this.currentMonth = this.startDate;
    //         thilast = new Date(this.opportunity.data.fields.last_Date__c.value);
    //         thilast = thilast.getMonth();
           
    //        var month = new Array();
    //        month[0] = "January";
    //        month[1] = "February";
    //        month[2] = "March";
    //        month[3] = "April";
    //        month[4] = "May";
    //        month[5] = "June";
    //        month[6] = "July";
    //        month[7] = "August";
    //        month[8] = "September";
    //        month[9] = "October";
    //        month[10] = "November";
    //        month[11] = "December";
           
    //        this.headerArray.push('Product');
    //        this.headerArray.push('Description');
           
    //        if(this.lastDate - this.startDate < 0){
    //            this.diffMonth = (lastDate + 12) - this.startDate;
    //            while(this.diffMonth >= 0){
    //                if(this.currentMonth > 11){
    //                    this.currentMonth = 0;
    //                }
    //                this.headerArray.push(month[this.currentMonth]);
    //                this.currentMonth++;
    //                this.diffMonth--;
    //            }
    //        }else{
    //            while(this.startDate < (this.lastDate + 1)){
    //                this.headerArray.push(month[this.startDate]);
    //                this.startDate++;
    //            }
    //        }
           
    //        return this.headerArray;
    //    }

}