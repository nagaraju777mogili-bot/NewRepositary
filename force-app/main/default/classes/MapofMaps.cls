public class MapofMaps {
 public static Map<string,Map<string,List<Case>>> mapofmaps = new Map<string,Map<string,List<Case>>>();
 public static Map<String,List<Case>> mapofCases = new Map<string,List<Case>>();
    
    public static void displaydata(){
        Map<Id,contact> conlist = new Map<Id,Contact>([select Id,FirstName,LastName from contact Limit 100]);
        for(Case ca : [select Id,ContactId,contact.Account.Name,contact.Name from case where contactId != null]){
            if(conlist.containskey(ca.ContactId)){
                mapofCases.get(ca.ContactId).add(ca);
            }else{
                mapofCases.put(ca.ContactId, new List<case> {ca});
            }
        }
        
        for(Account acc : [select Id,Name,(select Id,FirstName,LastName,AccountId from Contacts where AccountId != null) from Account limit 100]){
            List<Contact> conlistdata = acc.contacts;
            for(contact cs : conlistdata){
            if(mapofmaps.containsKey(cs.AccountId)){
           	   mapofmaps.put(cs.AccountId,mapofCases);
            }else{
           	   mapofmaps.put(cs.AccountId,mapofCases);
          	  }
            }
            system.debug('mapofmaps keyset'+mapofmaps.keyset());
            system.debug('mapofmaps values'+mapofmaps.values());
        }
    }
}