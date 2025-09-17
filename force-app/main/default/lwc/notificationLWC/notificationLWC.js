import { LightningElement } from 'lwc';
import alert from "lightning/alert";
import LightningConfirm from "lightning/confirm";
import LightningPrompt from "lightning/prompt";

export default class NotificationLWC extends LightningElement {
  async handlealert (){
     await alert.open({
      message : "Sample message alert",
        theme : "error",
        label : "AlertHeader"
     }).then(() => {
        console.log('????Alert Closed');
     });
   }

   async handleconfirm(){
     const result = await LightningConfirm.open({
       message : "sample confirm message",
       theme : "success",
       label : "confirm Header"
     }).then((result)=> {
            console.log('?????? confirm result'+result);
     });
   }

   async handleprompt(){
       await LightningPrompt.open({
        message : "sample prompt message",
        theme : "error",
        label : "Prompt Header",
        defaultvalue : "test"
       }).then((result) => {
            console.log('??? prompt result'+result);
       });
   }
}