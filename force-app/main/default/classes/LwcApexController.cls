public with sharing class LwcApexController {
    
    @AuraEnabled
    public static Account insertAccountMethod(Account accountObj){
        try {
            insert accountObj;
            return accountObj;
        } catch (Exception exp) {
            throw new AuraHandledException(exp.getMessage());
        }
    }
}