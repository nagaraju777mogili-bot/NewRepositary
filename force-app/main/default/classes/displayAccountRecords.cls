public with sharing class displayAccountRecords {
 
    @AuraEnabled(cacheable = true)
    public static List<Account> getAccounts(){
      return [select Id,Name,Phone from Account order by CreatedDate Limit 10];
    }

}