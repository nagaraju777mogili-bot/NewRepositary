public with sharing class getcontacts {
    public getcontacts() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getaccs(){
     return [select Id,Name,(select Id,AccountId,Picture__c from contacts where Picture__c != '') from Account  Limit 10];
    }

    @AuraEnabled(cacheable = true)
    public static List<contact> getcontacts(string accountId){
        return [select Id,firstName,lastName from contact where AccountId =: accountId];
    }
}