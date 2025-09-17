import { LightningElement } from 'lwc';

export default class ChildtoparentParent extends LightningElement {
    counter = 1;
    increasecountdata(){
        this.counter = this.counter +1;
    }
}