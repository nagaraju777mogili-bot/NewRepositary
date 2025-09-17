import { LightningElement } from 'lwc';

export default class ReportValidity_CustomValidity extends LightningElement {
    testTheData() {
        let searchCmp = this.template.querySelector(".nameCmp");
        let dateCmp = this.template.querySelector(".dateCmp");
        let searchvalue = searchCmp.value;
        let dtValue = dateCmp.value;
       
        if (!searchvalue) {
            searchCmp.setCustomValidity("Name value is required");
            console.log('inside If condition')
        } else {
            console.log('inside else condition')
            searchCmp.setCustomValidity("");
        }
        console.log('inside reportvalidity condition')

        searchCmp.reportValidity();

        if (!dtValue) {
            console.log('inside if condition')
            dateCmp.setCustomValidity("Date value is required");
        } else {
            console.log('inside else condition')

            dateCmp.setCustomValidity("");
        }
        console.log('inside reportvalidity condition')
       dateCmp.reportValidity();
    }
}