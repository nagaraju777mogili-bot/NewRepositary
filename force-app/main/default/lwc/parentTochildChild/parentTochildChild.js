import { LightningElement,api } from 'lwc';

export default class ParentTochildChild extends LightningElement {
  @api percentage;

  get style(){
   return `width: ${this.percentage}`;
  }
}