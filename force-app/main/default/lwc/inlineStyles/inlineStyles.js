import { LightningElement, api } from 'lwc';

export default class InlineStyles extends LightningElement {
    @api  percentage = 80;
    @api  color = 'red'; 

  get inlineStyles() {
    return `width: ${this.percentage}%; font-size: 20px; background-color: ${this.color};`;
  }
}