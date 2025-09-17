public class Historical_BatchApex_Data implements Database.Batchable<string>,Database.AllowsCallouts{  //<sObject> ,Database.AllowsCallouts
    
    public Iterable<String> start(Database.BatchableContext BC){
        return new List<String> { 
              '609baa7c1f34e1.88595449',
              '60a749bc02b488.16287701',
               '60a749559defe3.62658779',
               '60b70aef08db03.89136646',
               '60b70b72079a27.54086850',
               '60b70bac7ef161.09655829',
              '60b70be58a75a9.58907357',
               '60b70c7d3b91d5.48060352',
                '60b70cbb61eb94.03021903'};
    }

    public void execute(Database.BatchableContext bc,List<string> slist){
      List<string> newstocks = new List<String>();
        Map<String,Big_Stock_Price_details__b> existedstocks = new Map<string,Big_Stock_Price_details__b>();
        system.debug('slist'+slist.size()+'---'+slist);
        for(integer i =1; i<= slist.size(); i++){
            system.debug('////'+slist);
                string accesstoken = string.valueof(slist);
        for(Big_Stock_Price_details__b b :[SELECT Adjusted_close__c,Close__c,CreatedById,CreatedDate,High__c,Stock_Name__c,Id,Low__c,Open__c,ResponseDate__c,Stock_Data__c,Stock_External_Data__c,Stock_ID__c FROM Big_Stock_Price_details__b]){
            existedstocks.put(String.valueof(b.Stock_Name__c),b);
        } 
        
       for(Big_Stock_Data__b c : [SELECT Id,Industry__c,Instrument__c,Security__c,Stock_ID__c,stock_Name__c FROM Big_Stock_Data__b]){
            if(!existedstocks.containskey(String.valueof(c.Stock_ID__c))){
                newstocks.add(c.Stock_ID__c);
            }
        }
             for(Integer j=0; j<=19; j++){
                string input = newstocks[j];
             Historicals_DataV1.getdata(input,accesstoken);
                 system.debug('inputinput'+input);
                 system.debug('accessToken'+accesstoken);
             }
        }
        
    }
    public void Finish(Database.BatchableContext BC){
        
    }
}