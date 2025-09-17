import { LightningElement } from 'lwc';

export default class Childtoparentchild extends LightningElement {
    handleonclick(){
        this.dispatchEvent(new CustomEvent('increasecount'));
    }
}