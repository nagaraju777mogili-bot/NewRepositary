import { LightningElement } from 'lwc';

export default class SumofInputNumbers extends LightningElement {
    numbers = [23,22,45]
    renderedCallback(){
      console.log('rendered')
     }
     showSum(event){     
      var sum = 0;
       let inputData = this.template.querySelectorAll('[data-type="user-input"]');
      console.log('????',inputData.length);
      inputData.forEach( input => {
        
        // console.log('MVK element input-->'+input);
        // console.log('MVK element value input-->'+input.value);
        // console.log('MVK element json input-->'+input.dataset.json);
    //   tot += parseInt(input.value)
        sum += parseInt(input.value)
    });
    console.log('sum',sum);
     return sum;
     }




}