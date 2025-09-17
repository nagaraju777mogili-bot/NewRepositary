import { LightningElement, api } from 'lwc';

export default class DataReceiver extends LightningElement {
  @api receivedData;

  connectedCallback() {
    this.handleReceivedData();
  }

  handleReceivedData() {
    console.log('Received data:', this.receivedData);
  }
}