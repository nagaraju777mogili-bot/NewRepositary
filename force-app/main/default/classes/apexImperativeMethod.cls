public with sharing class apexImperativeMethod {
    public apexImperativeMethod() {

    }
    @AuraEnabled
    public static List<contact> getcontacts(){
       return [select Name,Id from contact limit 10];
    }
}