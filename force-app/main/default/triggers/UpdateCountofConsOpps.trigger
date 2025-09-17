trigger UpdateCountofConsOpps on Account (after update) {
	
    List<id> accids = new List<id>();
    
  //  Integer consize = [select Count() from Contact where AccountId =: trigger.newMap.keyset()];
  //  Integer oppsize = [select count() from Opportunity where AccountId =: trigger.newMap.keyset()];
     //  List<Account> acc = [select Id,Name,(Select Id from contacts),(select id from opportunities),(select Id from cases) from Account where Id =: Trigger.newMap.keyset()];
    for(Account acc : [select Id,
                       (Select Id from contacts),(select id from opportunities),(select Id from cases) 
                       from Account where Id =: trigger.newMap.keyset()]){
        system.debug('cons total'+acc.contacts.size());
           system.debug('opps total'+acc.opportunities.size());
           system.debug('cases total'+acc.cases.size());
    }
    
}