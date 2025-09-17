import { LightningElement,track } from 'lwc';

export default class ParentToChildParent extends LightningElement {
    @track pernumber;

    handleonchange(event){
       // this.pernumber = event.target.value;
        this.template.querySelector('c-parent-tochild-child').percentage =event.target.value ;
    }
}