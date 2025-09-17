import { LightningElement,wire,api } from 'lwc';

export default class ContactsComponent extends LightningElement {
    contacts;    

    handleSelect(event){
        event.preventDefault();
        const selectEvent = new CustomEvent('accountselect', {
            bubbles: true
        });
        // 3. Fire the custom event
        this.dispatchEvent(selectEvent);
    
    }
}