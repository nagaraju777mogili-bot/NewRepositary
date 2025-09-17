public with sharing class getDatatoLWC {
   

    @AuraEnabled(cacheable=true)
   public  static List<contact> retrieveCons(){
            List<contact> cons = [select Id,firstName,lastName,Account.Name ,Name from contact Limit 10];
            system.debug('cons'+cons);
            return cons;
     }


    @AuraEnabled(cacheable=true)
    public static List<contact> getContacts(string accountName){
        system.debug('accountName'+accountName);
        string searchkey = '%'+ accountName + '%';
        if(searchkey != ''){
        List<contact> contactList = [select Id,Name from contact where Account.Name Like : searchkey];
        system.debug(contactList.size());
        return contactList;
        }
        return null;
    }
}