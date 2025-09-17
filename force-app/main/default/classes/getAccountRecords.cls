public class getAccountRecords{

    @AuraEnabled
    public static List<contact> getAccountRecords(string AccountId){
        List<contact> contactList  = new List<contact>();
        system.debug('AccountId'+AccountId);
        try {
          for(Account acc : [select Id,Name from Account where Id =: AccountId]){
                contact con = new Contact();
                con.AccountId = acc.Id;
                con.LastName = 'created from LWC Component';
                con.FirstName = 'Created By Nagaraju';
                contactList.add(con);

          }
         if(contactList.size() > 0){
            insert contactList;
            system.debug('contactList'+contactList.size());
         }
          return contactList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

}