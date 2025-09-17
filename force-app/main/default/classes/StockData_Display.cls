public class StockData_Display {

 //public static List<Big_Stock_Price_details__b> blist = new List<Big_Stock_Price_details__b>();
 public static Map<string,Map<Date,Decimal>> StockpriceswithDates = new Map<string,Map<Date,Decimal>>();
 public static Map<Date,Decimal> priceswithDates = new Map<Date,Decimal>();
  /*
    @AuraEnabled(cacheable = true)
    public static List<Big_Stock_Price_details__b> getData(){
        blist = [SELECT Adjusted_close__c,Close__c,CreatedById,CreatedDate,High__c,Stock_Name__c,Id,Low__c,Open__c,ResponseDate__c,Stock_Data__c,Stock_External_Data__c,Stock_ID__c FROM Big_Stock_Price_details__b Limit 5];
        for(Big_Stock_Price_details__b bb : blist){
            priceswithDates.put(Date.valueof(bb.ResponseDate__c),bb.Open__c);
            StockpriceswithDates.put(bb.Stock_Name__c, priceswithDates);
         }
        system.debug('blist'+blist);
        system.debug('StockpriceswithDates'+StockpriceswithDates.size());
        system.debug('priceswithDates'+priceswithDates.keySet());
        return blist;
    }
    
      @AuraEnabled(cacheable = true)
    public static Map<string,Map<Date,Decimal>> getDatav1(){
        blist = [SELECT Adjusted_close__c,Close__c,CreatedById,CreatedDate,High__c,Stock_Name__c,Id,Low__c,Open__c,ResponseDate__c,Stock_Data__c,Stock_External_Data__c,Stock_ID__c FROM Big_Stock_Price_details__b];
        for(Big_Stock_Price_details__b bb : blist){
            priceswithDates.put(Date.newInstance(bb.ResponseDate__c.Year(), bb.ResponseDate__c.Month(), bb.ResponseDate__c.day()),bb.Open__c);//Date.valueof(bb.ResponseDate__c)
            StockpriceswithDates.put(bb.Stock_Name__c, new Map<Date,Decimal>());
         }
        system.debug('blist'+blist);
        system.debug('StockpriceswithDates'+StockpriceswithDates.size());
        system.debug('???priceswithDates'+priceswithDates.keySet());
        return StockpriceswithDates;
    }
    */
     
    @AuraEnabled(cacheable = true)
    public static Map<string,List<Big_Stock_Price_details__b>> getDatav2(){
        Map<string,List<Big_Stock_Price_details__b>> ListOfStockData = new Map<string,List<Big_Stock_Price_details__b>>();
        for(Big_Stock_Price_details__b bb : [SELECT Adjusted_close__c,Close__c,CreatedById,CreatedDate,High__c,Stock_Name__c,Id,Low__c,Open__c,ResponseDate__c,Stock_Data__c,Stock_External_Data__c,Stock_ID__c FROM Big_Stock_Price_details__b]){
            if(ListOfStockData.containskey(bb.Stock_Name__c)){
                ListOfStockData.get(bb.Stock_Name__c).add(bb);
            }else{
                ListOfStockData.put(bb.Stock_Name__c, new List<Big_Stock_Price_details__b> {bb}); 
            }
     }
        system.debug('ListOfStockData-- keyset()'+ListOfStockData.keyset());
        system.debug('valuess'+ListOfStockData.values());
  			  return ListOfStockData;
    }
    
    public static List<Big_Stock_Price_details__b> returndata(String StockName){
        List<string> stockNames = new List<String>{StockName};
        List<Big_Stock_Price_details__b> bblist = new List<Big_Stock_Price_details__b>();

        for(Big_Stock_Price_details__b bb : [SELECT Open__c,ResponseDate__c,Stock_ID__c,Stock_External_Data__c,Stock_Name__c FROM Big_Stock_Price_details__b Where Stock_Name__c = :StockName AND Stock_External_Data__c = '']){
             system.debug('bb.Stock_External_Data__c'+bb.Stock_External_Data__c); 
            string data = bb.Stock_External_Data__c.left(0)+bb.Stock_External_Data__c.right(bb.Stock_External_Data__c.length()-18-1);
            system.debug('??????'+data);
            if(data == bb.Stock_Name__c)
                 bblist.add(bb);
         }
        system.debug('bblist sizee'+bblist.size());
        system.debug(bblist);
        return bblist;
    }
}