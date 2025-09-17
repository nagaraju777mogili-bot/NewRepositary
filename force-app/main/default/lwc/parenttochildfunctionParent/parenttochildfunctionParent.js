import { LightningElement } from 'lwc';

export default class ParenttochildfunctionParent extends LightningElement {
    handleclick(){
        console.log('Invoked from Parent JS');
        this.template.querySelector('c-parenttochildfunction-child').refresh();
        console.log('Invoked from Parent JS222222');
    }
}