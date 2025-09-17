trigger NameCheckTrigger on Account (before update) {
    
    set<string> accIds = new set<string>();
if(Trigger.IsUpdate && Trigger.IsBefore){
    for(Account accRec : Trigger.newMap.values()){
        accIds.add(accRec.Id);
    }
    
    if(accIds.size() > 0){
        for(contact c : [select Id,LastName,AccountId from contact where AccountId =: accIds AND LastName = 'Mogili']){
         //   c.AccountId
             trigger.newmap.get(c.AccountId).addError('we should not use this lastname anymore');
        }
    }
}
}