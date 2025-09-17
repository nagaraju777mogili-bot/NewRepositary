public with sharing class displayAccountrecsLWC {
    public displayAccountrecsLWC() {

    }
   @AuraEnabled(cacheable = true)
    public static List<Account> displayrecs(){
     List<Account> acclist = [select Id,Name from Account Limit 10];
      system.debug('acclist'+acclist);
      return acclist;
    }
}