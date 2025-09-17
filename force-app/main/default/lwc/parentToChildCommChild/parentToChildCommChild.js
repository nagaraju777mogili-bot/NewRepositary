import { LightningElement, api} from 'lwc';

export default class ParentToChildCommChild extends LightningElement {
   @api percentage;

   get Style(){
       return `background-color:red;min-width:10px;width: ${this.percentage}; min-height:50px`;
   }
}