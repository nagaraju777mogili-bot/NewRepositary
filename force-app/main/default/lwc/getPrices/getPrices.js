import { LightningElement } from 'lwc';
import makecall from '@salesforce/apex/synchronous_NSE_Callout.getData'
export default class GetPrices extends LightningElement {
    key1 = '60a749bc02b488.16287701';
    Key2 ='609baa7c1f34e1.88595449'
    Key3 = '60a749559defe3.62658779';
    Key4 = '60b70aef08db03.89136646';
    Key5 ='60b70b72079a27.54086850';
    Key6 = '60b70bac7ef161.09655829';
    Key7 ='60b70be58a75a9.58907357';
    Key8 ='60b70c7d3b91d5.48060352';
    Key9 = '60b70cbb61eb94.03021903';

    handleClick(event){
       let Apikey = event.currentTarget.value;
       console.log('apikey',Apikey)
       makecall({token : Apikey}).then(result=>{

       }).catch(error)(error=>{

       })
    }
}