public with sharing class Historicals_Data { 
   /* public static List<wrapper> wraplist {set;get;}
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
      // endpoint = endpoint+'?api_token='+ '609baa7c1f34e1.88595449';
       // endpoint = endpoint+'?api_token='+ '60a749bc02b488.16287701';
      //  endpoint = endpoint+'?api_token='+ '60a749559defe3.62658779';
       // endpoint = endpoint+'?api_token='+ '60b70aef08db03.89136646';
      // endpoint = endpoint+'?api_token='+ '60b70b72079a27.54086850';
      //    endpoint = endpoint+'?api_token='+ '60b70bac7ef161.09655829';
      // endpoint = endpoint+'?api_token='+ '60b70be58a75a9.58907357';
     //endpoint = endpoint+'?api_token='+ '60b70c7d3b91d5.48060352';
      // endpoint = endpoint+'?api_token='+ '60b70cbb61eb94.03021903';
        


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
           spd.ResponseDate__c = w.dates;
           spd.Stock_Data__c     = stocName.stock_Name__c;
           spd.Stock_External_Data__c =  w.dates +stocName.stock_Name__c;
           spd.Stock_Name__c = stocName.Stock_ID__c;
           spd.Stock_ID__c = 1;
           spdlist.add(spd);
        }
            system.debug('????spdlist.size()'+spdlist.size());
        if(spdlist.size()>0){
            system.debug('tried to insert'+spdlist);
             database.insertImmediate(spdlist);
           List<Big_Stock_Price_details__b> blist =  [SELECT Adjusted_close__c,Close__c,CreatedById,CreatedDate,High__c,Id,Low__c,Open__c,ResponseDate__c,Stock_Data__c,Stock_External_Data__c,Stock_ID__c FROM Big_Stock_Price_details__b];
            system.debug('inserted'+blist);
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

    }*/
}