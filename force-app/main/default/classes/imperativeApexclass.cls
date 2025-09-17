public with sharing class imperativeApexclass {

@AuraEnabled
    public static list<Account> imperativeMethod(){
      return [select Id,Name from Account Limit 10];
    }

    @AuraEnabled
      public static list<Account> imperativewithBind(string Key){
       string keyvalue =  '%' + Key + '%';
       system.debug('keyvalue'+keyvalue);
       return [select Id,Name from Account where name like:keyvalue limit 10];
      }
}