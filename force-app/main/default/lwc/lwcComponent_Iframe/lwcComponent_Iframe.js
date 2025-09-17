import { LightningElement,wire,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const VF_ORIGIN = "https://myowndatacom-dev-ed--c.develop.vf.force.com/resource/1737525095000/Iframeweb?";
const Static_Origin = "https://myowndatacom-dev-ed--c.develop.vf.force.com";
import { CurrentPageReference } from 'lightning/navigation';



export default class LwcComponent_Iframe extends LightningElement {
    inputFromLWC;
    wireRecordId; //this will hold the current record id fetched from pagereference
    @api recordId;
    @api receivedMsgFromStaticResource;


    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
        if (currentPageReference) {
            console.log('currentPageReference ', currentPageReference);
            this.recordId = currentPageReference.attributes.recordId;
            this.wireRecordId = currentPageReference.state.recordId;
        }
    }

    handleChange(event){
      this.inputFromLWC = event.target.value;
    //  this.handleSendMessage();
    }


    connectedCallback() {
        this.messageHandler = this.handleMessage.bind(this);
         this.addMessageHandler();
      }
    
      // remove message handler after component is unloaded
      disconnectedCallback() {
        this.removeMessageHandler();
      }
      
      addMessageHandler() {
        this.messageHandler = this.handleMessage.bind(this);
        window.addEventListener("message", this.messageHandler, false);
      }
    
      // remove the event handler
      removeMessageHandler() {
        if (this.messageHandler) {
          window.removeEventListener("message", this.messageHandler, false);
          this.messageHandler = null;
        }
      }
    
      // Post message to VF page 
      handleSendMessage() {
        this.template.querySelector('iframe').contentWindow.postMessage(` ${this.inputFromLWC} -- The Current Case Record ID -- ${this.recordId}`, VF_ORIGIN);
        this.dispatchEvent(new ShowToastEvent({
          title: "Success",
          message: "⚡ Sending Msg From LWC to Static Resource",
          variant: "success"
        }));
     
      }
    
      // event handler function that runs after event is received by LWC component
      handleMessage(event) {
        this.receivedMsgFromStaticResource = JSON.stringify(event.data)
        console.log("⚡ Message from Static Resource: " + this.receivedMsgFromStaticResource);
    
        this.dispatchEvent(new ShowToastEvent({
          title: "Success",
          message: "⚡ Message from Static Resource:  " + JSON.stringify(event.data),
          variant: "success"
        }));
      }
}