trigger AccountTrigger on Account (before insert) {
    for(Account acc : Trigger.new){
        acc.Name  = 'Dummy';
    }
    System.debug(Trigger.new);
}