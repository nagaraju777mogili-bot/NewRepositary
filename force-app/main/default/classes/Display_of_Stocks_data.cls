public class Display_of_Stocks_data {

    @AuraEnabled(cacheable = true)
    public static List<Big_Stock_Price_details__b> displaystocks(){
         return [SELECT Stock_Name__c,Stock_ID__c,High__c FROM Big_Stock_Price_details__b];
    }
    
        @AuraEnabled
    	public static List<Big_Stock_Price_details__b> showstocksData(string StockName){
        List<Big_Stock_Price_details__b> ListOfStockData = new List<Big_Stock_Price_details__b>();
            for(Big_Stock_Price_details__b bb : [SELECT High__c,Stock_Name__c,Id,ResponseDate__c,Stock_Data__c,Stock_External_Data__c,Stock_ID__c FROM Big_Stock_Price_details__b]){
                if(bb.Stock_Name__c == stockName){
                ListOfStockData.add(bb);
            }
        }
        return ListOfStockData;
    }
    
     @AuraEnabled(cacheable = true)
    public static Map<string,decimal> displaystocksprofitPercentage(){
     //   List<Big_Stock_Price_details__b> profits= [SELECT Stock_Name__c,Stock_ID__c,High__c FROM Big_Stock_Price_details__b];
      	Map<String,List<Decimal>> stockswithPricesMap = new Map<String, List<decimal>>();
        for(Big_Stock_Price_details__b bb : [SELECT Stock_Name__c,Stock_ID__c,High__c FROM Big_Stock_Price_details__b]){
            if(stockswithPricesMap.containskey(bb.Stock_Name__c)){
                List<Decimal> prices = stockswithPricesMap.get(bb.Stock_Name__c);
                prices.add(bb.High__c);
                stockswithPricesMap.put(bb.Stock_Name__c,prices);
            }else{
				stockswithPricesMap.put(bb.Stock_Name__c, new List<Decimal> {bb.High__c});
            }
        }
		Map<string,decimal> profitpercentage = new Map<string,Decimal>();
        for(string stockName : stockswithPricesMap.keyset()){
                integer size = Integer.valueof(stockswithPricesMap.get(stockName).size()-1);
            	Decimal first = stockswithPricesMap.get(stockName)[0];
            	Decimal last = stockswithPricesMap.get(stockName)[size];
                Decimal profitorLoss = (last-first);
                Decimal finalres = profitorLoss/first;
            profitpercentage.put(stockName,finalres.setScale(2)*100);
        }
        updateProfitData(profitpercentage);
        return profitpercentage;
    	
    }
    
    
    @AuraEnabled(cacheable=true)
    public static List<Stocks_Analysis__c> showProfitData(){
    return [select Id, Code__c ,Profit_Percentage__c from Stocks_Analysis__c where Profit_Percentage__c != null order by Profit_Percentage__c DESC ];
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Stocks_Analysis__c> updateProfitData(Map<String,Decimal> stockData){
        List<Stocks_Analysis__c> stocklist = new List<Stocks_Analysis__c>();
        for(Stocks_Analysis__c  sa : [select Id, Code__c ,Profit_Percentage__c,Stock_ID__c ,Name,
                                      Data_Fetched__c  from Stocks_Analysis__c where Code__c IN: stockData.keyset() AND
                                     Data_Fetched__c = true AND Profit_Percentage__c = null]){
                                    
                            if(stockData.containskey(sa.Code__c)){
                                sa.Profit_Percentage__c = stockData.get(sa.Code__c); 
                                stocklist.add(sa);
                               }
        }
        system.debug('ddd'+Limits.getLimitDMLStatements());
        system.debug('dml limit'+Limits.getDMLStatements());
        if(stocklist.size() > 0){
		update stocklist;  
        }
        system.debug('Rows queries'+limits.getqueryrows());
        system.debug('Rows queries Limit'+limits.getlimitqueryrows());

    return [select Id, Code__c ,Profit_Percentage__c from Stocks_Analysis__c where Profit_Percentage__c != null AND Data_Fetched__c = true order by Profit_Percentage__c DESC ];
    }
}