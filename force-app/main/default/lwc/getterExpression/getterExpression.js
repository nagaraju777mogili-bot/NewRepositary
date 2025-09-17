import { LightningElement } from 'lwc';

export default class GetterExpression extends LightningElement {
    firstName = '';
    secondName = '';

    handlechange(event){
       const field = event.target.name;
       if(field == 'firstName'){
        this.firstName = event.target.value;
       }else if(field == 'secondName'){
        this.secondName = event.target.value;
       }
    }

    get upperCase(){
        return `${this.firstName} ${this.secondName}`.toUpperCase();
    }
}