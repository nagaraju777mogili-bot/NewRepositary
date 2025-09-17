public class synchronous_NSE_Callout {
    
    @AuraEnabled
    public static void getData(string token){
      List<string> stockList = new List<String>();           
      for(Stocks_Analysis__c sc : [select Code__c,Name,Id from Stocks_Analysis__c 
                                   where Data_Fetched__c = false Limit 20 ]){
          if(sc.code__c != null){                       
             stockList.add(sc.Code__c);
          FutureMethodClass.sendRequest(sc.Code__c,token);
          }
       }       

    } 
    
    public static string  returnApiKey(integer num){
        Map<integer,string> tokenList = new Map<integer,string>();
           tokenList.put(0,'60a749bc02b488.16287701');
           tokenList.put(1,'609baa7c1f34e1.88595449');
           tokenList.put(2,'60a749559defe3.62658779');
            tokenList.put(3,'60b70aef08db03.89136646');
            tokenList.put(4,'60b70b72079a27.54086850');
            tokenList.put(5,'60b70bac7ef161.09655829');
                tokenList.put(6,'60b70be58a75a9.58907357');
            tokenList.put(7,'60b70c7d3b91d5.48060352');
            tokenList.put(8,'60b70cbb61eb94.03021903');
        return tokenlist.get(num);
    }
}