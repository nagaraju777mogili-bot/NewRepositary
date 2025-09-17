import { LightningElement } from 'lwc';

export default class ComponentEventConstructor extends LightningElement {
   mylist = [];

    constructor(){
        super();
        console.log('constructor loaded');
    }

    connectedCallback() {
        this.mylist.push("test");
        console.log("connect callback");
    }

    disconnectedCallback() {
        this.mylist = [];
        console.log("disconectedcallback");
        //code
    }

    renderedCallback(){
        console.log('renderedCallback');
    }

    errorCallback(error, stack) {
        this.error = error;
        console.log('Error msg'+this.error);
    }
}