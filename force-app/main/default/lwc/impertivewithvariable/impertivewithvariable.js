import { LightningElement,track } from 'lwc';
import getacclist from "@salesforce/apex/imperativeApexclass.imperativewithBind";

export default class Impertivewithvariable extends LightningElement {
    searchKey = '';
    accounts;
    error;

    handleKeyChange(event) {
        this.searchKey = event.target.value;
        console.log('searchKey'+event.target.value);
    }

    async handleSearch() {
        console.log('search');
        try {
            console.log('==try block');
            this.accounts = await getacclist({Key: this.searchKey });
            console.log('tthis accounts'+this.accounts);
            this.error = undefined;
        } catch (error) {
            this.error = error;
            this.accounts = undefined;
        }
    }
}