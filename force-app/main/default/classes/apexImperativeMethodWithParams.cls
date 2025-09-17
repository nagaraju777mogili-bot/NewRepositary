public with sharing class apexImperativeMethodWithParams {

    @AuraEnabled(cacheable = true)
    public static List<contact> getcontacts(string searchkey){
        string key = '%'+ searchkey + '%';
        return [select Id,Name from contact where Name like : key ];
    }
}