import { LightningElement } from 'lwc';

export default class LwcRef extends LightningElement {

    renderedCallback() {
        console.log(this.refs.myDiv);
    }
}