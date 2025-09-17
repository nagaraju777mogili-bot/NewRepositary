import { LightningElement } from 'lwc';

export default class ParentToChildCommParent extends LightningElement {
    percentage=20;

    handlechange(event){
        this.percentage = event.target.value;
    }
}