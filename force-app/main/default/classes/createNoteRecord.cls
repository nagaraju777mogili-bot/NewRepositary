public class createNoteRecord {
    

    @AuraEnabled
    public static Boolean createRecord(string Title, string Description){
        system.debug('Title'+Title);
        system.debug('Description'+Description);
        
        try {
            if(!string.isBlank(Title)){
                Note_Record__c noteRec = new Note_Record__c(Name= Title, Description__c =Description);

                upsert noteRec;
                  system.debug('noteRec'+noteRec.Id);
                return true;
            }
            return false;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
     @AuraEnabled
    public static void deleteNoteRecords(String NoteId){
        system.debug('NoteId'+NoteId);
        delete [select id,Name,Description__c,lastmodifiedDate from Note_Record__c where id =: NoteId];
        
    }
    
    @AuraEnabled(cacheable = true)
    public static List<Note_Record__c> fetchNoteRecords(){
        return [select id,Name,Description__c,lastmodifiedDate from Note_Record__c];
    }
    
     @AuraEnabled
    public static Boolean updateNoteRecord(String noteId, String title, String description){
        try {
            if(!String.isBlank(noteId)){
                Note_Record__c note = [SELECT Id, Name, Description__c, LastModifiedDate from Note_Record__c where id =:noteId];
                note.Name = title;
                note.Description__c = description;
                update note;
                return true;
            }
            return false;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}