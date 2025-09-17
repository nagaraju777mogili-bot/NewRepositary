public with sharing class Retrieverecords {
    @AuraEnabled(cacheable= true)
    public static List<Account> getRecords(){
        List<Account> accList = [Select Id, Name, Phone, Industry From Account Where Name !=null limit 5];
              System.debug('-- line reached');
                return accList;        
    }
    
}