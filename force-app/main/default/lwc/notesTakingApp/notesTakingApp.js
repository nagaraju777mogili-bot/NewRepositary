import { LightningElement,wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createnoteRecord from '@salesforce/apex/createNoteRecord.createRecord';
import fetchRecords from '@salesforce/apex/createNoteRecord.fetchNoteRecords';
import updateRecords from '@salesforce/apex/createNoteRecord.updateNoteRecord'
import deleteRecords from '@salesforce/apex/createNoteRecord.deleteNoteRecords';
import { refreshApex } from "@salesforce/apex";

const DEFAULT_NOTE_FORM = {
    Name : "",
    Description__c : ""
}
export default class NotesTakingApp extends LightningElement {
    noteRecord = DEFAULT_NOTE_FORM;
    isCreated = false;
    noteList = [];
    selectedrecordId = '';
    wiredNoteResult;

    formats = [
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'list',
        'indent',
        'align',
        'link',
        'image',
        'table',
        'header',
        'color'
    ];
     
    get ModalName(){
        return this.selectedrecordId ? "Update Note":"Add Note"
      }

    updateNote(recId){
        const {Name,Description__c} = this.noteRecord;
        updateRecords({noteId : recId, title : Name,description:Description__c}).then(()=>{
            this.ismodal = false;
            this.showToastMsg("Note Updated Successfully!!", 'success')
            this.refresh();
        }).catch(error=>{
            console.error("error in updating note",error)
        })

    }

    ismodal = false;

    editNoteRecord(event){
        const {recordid} = event.target.dataset;
        console.log('from Edit Record'+recordid);
        const noteRecord = this.noteList.find(item=>item.Id === recordid);
        this.noteRecord = {
            Name : noteRecord.Name,
            Description__c : noteRecord.Description__c
          }
          this.selectedrecordId = recordid;
          this.ismodal = true;
          this.refresh();

        }


    deleteNoteRecord(event){
        const {recordid} = event.target.dataset;
        console.log('from delete Record'+recordid);

        deleteRecords({NoteId : recordid}).then(()=>{
            this.showToastMsg("Note Deleted Successfully!!", 'success')
            this.refresh();
        }).catch(error=>{
            this.showToastMsg("Note error at Delete!!", 'success')
        })
    }

   @wire(fetchRecords) 
   displayRecords(result){
    this.wiredNoteResult =result;
    const {data,error} = result;
     if(data){
      this.noteList =  data.map(item=>{
            let formattedDate = new Date(item.LastModifiedDate).toDateString();
            console.log('item',item);
            console.log('formattedDate',formattedDate);
            this.refresh();
            return {...item,formattedDate};
        })
     }
     if(error){
        this.showToastMsg(error.message.body, 'error')  
     }
   }

   get isFormInvalid(){
    return !(this.noteRecord && this.noteRecord.Description__c && this.noteRecord.Name)
   }

    handlerclick(){
        this.ismodal = true
    }
    closeModal(){
        this.noteRecord = DEFAULT_NOTE_FORM;
        this.ismodal = false;
    }
    changeHandler(event){
        const {name, value} = event.target
        // const name = event.target.name
        // const value = event.target.value
        this.noteRecord={...this.noteRecord, [name]:value}
    }
    formsubmit(event){
        event.preventDefault();
        if(this.selectedrecordId){
            this.updateNote(this.selectedrecordId)
        }else{
            this.createRecordData();
            console.log('this.isCreated',this.isCreated);
        }
       

    }

    createRecordData(){
        createnoteRecord({Title:this.noteRecord.Name,Description:this.noteRecord.Description__c}).then(()=>{
              this.ismodal =false
              this.showSuccessToast();
              this.showToastMsg("Note Created Successfully!!", 'success')
              this.refresh();
        }).catch(error=>{
            console.error("error",error);
            this.showToastMsg(error.message.body, 'error')

        })
    }

    showToastMsg(message, variant){
        const elem = this.template.querySelector('c-notification')
        if(elem){
          elem.showToast(message, variant)
        }
      }

      showSuccessToast(){
        const evt = new ShowToastEvent({
        title: 'Toast Notification Success',
        message: 'Data load completed successfully',
        variant: 'success',
        mode: 'dismissable'
    });
    this.dispatchEvent(evt);
    }

    refresh(){
      return  refreshApex(this.wiredNoteResult);
    }
}