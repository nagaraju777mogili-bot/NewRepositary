import { LightningElement } from 'lwc';

export default class SecondLwc extends LightningElement {
    change;
    handlechange(event){
            console.log(event.target.value);
this.change = event.target.value;
    }
}