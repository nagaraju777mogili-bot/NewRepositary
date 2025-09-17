public with sharing class Historicals_DataV1 { 
    public static List<wrapper> wraplist {set;get;}
    public static List<String> strlist {get;set;}
    public static List<Big_Stock_Price_details__b> spdlist {set;get;}
    public static string Jsonstring {set;get;}

    public static void getdata(string inputstock,string apitokenname){
        try{
        spdlist = new List<Big_Stock_Price_details__b>();
         string apitoken = apitokenname.removeEnd(')');
             apitoken =  apitoken.removestart('(');
         string stockName = inputstock;
            system.debug('stockName'+StockName);
            system.debug('???apitoken'+apitoken);
        string endpoint = 'https://eodhistoricaldata.com/api/eod/'+stockName+'.NSE';
       endpoint = endpoint+'?api_token='+''+apitoken;
        endpoint = endpoint+'&period='+'m';
        endpoint = endpoint+'&&fmt='+'json';
            system.debug('endpoint'+endpoint);
        Http p = new Http();
        HttpRequest request = new HttpRequest();
        request.setHeader('content-type','application/json');
        request.setEndpoint(endpoint);
        request.setMethod('GET');
        HttpResponse resp = p.send(request);
        string str = resp.getBody(); 
        string strr = str.replaceAll('date', 'dates');
        system.debug('strr'+strr);
        
      JSONParser parser = JSON.createParser(strr);
        system.debug('parser'+parser);
     Big_Stock_Data__b stocName = [select Id,Industry__c,Instrument__c,Stock_ID__c,stock_Name__c from Big_Stock_Data__b where Stock_ID__c =: stockName limit 1];
        system.debug('limits.getQueries'+limits.getQueries());
            wraplist =  (List<wrapper>) System.JSON.deserialize(strr, List<wrapper>.class);
        system.debug('wraplist'+wraplist);
        for(wrapper w : wraplist){
      Big_Stock_Price_details__b spd = new Big_Stock_Price_details__b();
           spd.Open__c = double.valueof(w.open);
           spd.Close__c = double.valueof(w.close);
           spd.High__c = double.valueof(w.high);
           spd.Low__c = double.valueof(w.low);
           spd.Adjusted_close__c = double.valueof(w.adjusted_close);
           spd.Volume__c = Integer.valueof(w.volume);
           spd.ResponseDate__c = Date.valueof(w.dates);
           spd.Stock_Data__c     = stocName.stock_Name__c;
           spd.Stock_External_Data__c =  Date.valueof(w.dates) +stocName.stock_Name__c;
           spd.Stock_Name__c = stocName.Stock_ID__c;
           spd.Stock_ID__c = '1';
           spdlist.add(spd);
        }
        if(spdlist.size()>0){
             database.insertImmediate(spdlist);
      }
        }catch(exception e){
            system.debug('exception msgs'+e.getCause() + ''+e.getLineNumber() + ''+e.getMessage());
        }
    }
    
    
    public class wrapper{
        
        public Date dates {get;set;} // in json: date
        public Double open {get;set;} 
        public Double high {get;set;} 
        public Double low {get;set;} 
        public Double close {get;set;} 
        public Double adjusted_close {get;set;} 
        public long volume {get;set;} 

    }
}