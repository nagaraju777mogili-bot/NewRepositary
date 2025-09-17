import { LightningElement } from 'lwc';

export default class TwoWayDataBinding extends LightningElement {
  entireText;
    
    handleChange(event){
        this.entireText = event.target.value
    }

    address = {
        country: 'India',
        city : 'warangal'
    }
    addressUpdate(event){
   this.address =  {...this.address,"city" :event.target.value} 
    }
}