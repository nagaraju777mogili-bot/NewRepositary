import { LightningElement, api, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
import { getRecord, createRecord, updateRecord, deleteRecord, getRecordUi, getFieldValue, getFieldDisplayValue, getRecordCreateDefaults, createRecordInputFilteredByEditedFields, generateRecordInputForCreate, generateRecordInputForUpdate } from 'lightning/uiRecordApi';
import Contact_OBJECT from '@salesforce/schema/Contact';
import FirstName_FIELD from '@salesforce/schema/Contact.FirstName';
import LastName_FIELD from '@salesforce/schema/Contact.LastName';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FILED from '@salesforce/schema/Contact.Email';
import ACCOUNT_ID from '@salesforce/schema/Contact.AccountId';

import createContact from '@salesforce/apex/AccountController.CreateContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


let i=0;
var selectedAccount ;
export default class ParentAccountComponent extends LightningElement {

    firstName = '';
    lastName = '';
    phone = '';
    email = '';
    contactid = '';

Accounts;
error;
@track accountid = '';

@track value = '';
@track items = [];
@track isModalOpen = false;
 con = {};


      
        
@wire(getAccounts)
wiredAccounts({ error, data }) {
    if(data){
             for(i=0; i<data.length; i++)  {
                console.log('id=' + data[i].Id);
                this.items = [...this.items ,{value: data[i].Id , label: data[i].Name} ];                                   
            }          
           
        }
         else if(error){
             this.Accounts = undefined;
             this.error = error;
         }
        }

         //getter property from statusOptions which return the items array
    get statusOptions() {
        console.log(this.items);
        return this.items;
    }

    handleChange(event) {
        // Get the string of the "value" attribute on the selected option
        const selectedOption = event.detail.value;
         selectedAccount = event.detail.value;
        console.log('selectedAccount'+selectedAccount);
        return event.detail.value;;
    }

    displayAccsandcons(){
        console.log('--selectedAccount&&&&--'+selectedAccount);
           this.template.querySelector('c-child-contacts-component').refresh(selectedAccount);
        }

        handlechange(event) {
            if(event.target.label == "First Name"){
                this.firstName = event.target.value;
            }

            
           else if(event.target.label == "Last Name"){
                this.lastName = event.target.value;
            }

         else if(event.target.label == "Phone"){
                this.phone = event.target.value;
            }

         else if(event.target.label == "Email"){
                this.email = event.target.value;
            }

        }

      
        createContact(){
            console.log('event happend');
            this.isModalOpen = true;

        }

        cancel(){
            this.isModalOpen = false;
        }

        savecontact(){
            console.log('--in save contact &&&&--'+selectedAccount);
            let cont = { 'sobjectType': 'Contact' };
            cont.FirstName = this.firstName;
            cont.LastName = this.lastName;
            cont.Phone = this.phone;
            cont.Email = this.email;
            cont.AccountId = selectedAccount;
             console.log(JSON.stringify(cont));
           
             createContact({con: cont})
                .then(result => {
                    this.recordId = result;
                    console.log(result);
                    const evt = new ShowToastEvent({
                        title: "Record created " + this.recordId,
                        message: "Contact is created",
                        variant:"success"
               
                       });
                       this.dispatchEvent(evt);
                       this.cancel();
                })
                .catch(error => {
                    console.log(error);
                    this.error = error;
                });
        }
}