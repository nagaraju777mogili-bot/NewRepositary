public class ChartJsApex {

    @AuraEnabled(Cacheable=true)
    public static List<String> extractData(){
         Map<string,DateTime> stockNames = new Map<string,DateTime>();
        for(Big_Stock_Price_details__b bb :[select Stock_Name__c,ResponseDate__c from Big_Stock_Price_details__b ]){
                   stockNames.put(bb.Stock_Name__c,bb.ResponseDate__c);                                   
        }
        List<string> stocksNames =  new List<string>(stockNames.keyset());
        system.debug(StockNames.keyset());
		return stocksNames;
    }
}