import { LightningElement,track,wire } from 'lwc';
import accrecs from '@salesforce/apex/Retrieverecords.getRecords';

import {ShowToastEvent} from 'lightning/platformShowToastEvent';


export default class RetrieveAccountRecords  extends LightningElement  {
  @track accountRecs;
  @track errorData;
 
        @wire (accrecs)
         dataRecord({data,error}){
          if(data){
        }
        else if(error){
        }
        }
      }