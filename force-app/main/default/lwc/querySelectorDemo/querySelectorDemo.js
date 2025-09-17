import { LightningElement } from 'lwc';

export default class QuerySelectorDemo extends LightningElement {
    usernames = ["john","smith","Mike","Nagaraju","Reyansh"]

    fetchDetails(){
        const elm = this.template.querySelectorAll('.name');
        Array.from(elm).forEach(input => {
            console.log(input.innerText);
        });
    }
}