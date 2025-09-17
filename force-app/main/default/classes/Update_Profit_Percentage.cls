public class Update_Profit_Percentage implements Database.Batchable<sObject>{
    string query = 'SELECT Id, Name, Sector_Name__c, Industry__c, Profit_Percentage__c, Stock_ID__c,Code__c FROM Stocks_Analysis__c WHERE Data_Fetched__c = true LIMIT 1';
   
    public Database.QueryLocator start(Database.BatchableContext BC){
        return Database.getQueryLocator(query);
    }
    
    public void execute(Database.BatchableContext BC, List<Stocks_Analysis__c> stockAnalysisList){
      system.debug('stockAnalysisList>>'+stockAnalysisList);
      Map<date,decimal> startMonth = new Map<date,decimal>();
      Map<date,decimal> endMonth = new Map<date,decimal>();
        
        for(Big_Stock_Price_details__b b :[SELECT Adjusted_close__c,Stock_Name__c,Close__c,High__c,Low__c,Open__c,ResponseDate__c,Stock_Data__c,Stock_External_Data__c,Stock_ID__c FROM Big_Stock_Price_details__b]){
            for(Stocks_Analysis__c stockanalysis : stockAnalysisList){
              if(stockanalysis.Code__c == b.Stock_Name__c && stockanalysis.Profit_Percentage__c == null){ // && b.Stock_External_Data__c != null
                  startMonth.put(date.valueof(b.ResponseDate__c),b.High__c);
           }
                  break;
       }

       system.debug(startMonth);
        
            /* for(Big_Stock_Price_details__b b :[SELECT Adjusted_close__c,Close__c,CreatedById,CreatedDate,High__c,Id,Low__c,Open__c,ResponseDate__c,Stock_Data__c,Stock_External_Data__c,Stock_ID__c FROM Big_Stock_Price_details__b ]){
                 if(stockanalysis.Stock_ID__c == b.Stock_ID__c){
                      system.debug('?????/'+b.ResponseDate__c);
                    }
                 }*/
        //}

    }
    }
    public void finish(Database.BatchableContext BC){
        
    }

}