import { LightningElement,api } from 'lwc';

export default class ToDOListItem extends LightningElement {
    @api todoId;
    @api todoName;
    @api done = false;


    get containerClass(){
        return done ? "todo completed" : "todo upcoming";
    }
}