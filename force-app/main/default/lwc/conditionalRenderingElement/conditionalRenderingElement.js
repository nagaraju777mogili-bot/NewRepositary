import { LightningElement } from 'lwc';

export default class ConditionalRenderingElement extends LightningElement {
    showMe = false;
    handleChange(event){
        this.showMe = event.target.checked;
        window.alert('??????'+this.showMe);
    }
}