public class FutureMethodClass {
   
    @Future(callOut =true)
    public static void sendRequest(string stock,string token){//List<string> stocklist,string token){
        try{
         List<Big_Stock_Price_details__b> spdlist = new List<Big_Stock_Price_details__b>();
         List<string> stockNames = new List<string>();
               string endpoint;
                    endpoint = 'https://eodhistoricaldata.com/api/eod/'+stock+'.NSE';
                    endpoint = endpoint+'?api_token='+''+token;
                    endpoint = endpoint+'&period='+'m';
                    endpoint = endpoint+'&&fmt='+'json';
                   system.debug('endpoint'+endpoint);
                stockNames.add(stock);   
                Http p = new Http();
                HttpRequest request = new HttpRequest();
                request.setHeader('content-type','application/json');
                request.setEndpoint(endpoint);
                request.setMethod('GET');
                HttpResponse resp = p.send(request);
                string str = resp.getBody(); 
                string strr = str.replaceAll('date', 'dates');
                JSONParser parser = JSON.createParser(strr);
                List<wrapper>  wraplist = (List<wrapper>) System.JSON.deserialize(strr, List<wrapper>.class);
                for(wrapper w : wraplist){
                Big_Stock_Price_details__b spd = new Big_Stock_Price_details__b();
                   spd.Open__c = double.valueof(w.open);
                   spd.Close__c = double.valueof(w.close);
                   spd.High__c = double.valueof(w.high);
                   spd.Low__c = double.valueof(w.low);
                   spd.Adjusted_close__c = double.valueof(w.adjusted_close);
                   spd.ResponseDate__c = Date.valueof(w.dates);
                   spd.Stock_Data__c = stock;
                   spd.Stock_External_Data__c =  Date.valueof(w.dates)+stock;
                   spd.Stock_Name__c = stock;
                   spd.Stock_ID__c = '1';
                   spdlist.add(spd);
            }
            List<Stocks_Analysis__c> tobeUpdated = new List<Stocks_Analysis__c>();
            if(spdlist.size() > 0){
				database.insertImmediate(spdlist);
                for(Stocks_Analysis__c  sa : [select Id,Name from Stocks_Analysis__c  where code__c IN: stockNames]){
                    sa.Data_Fetched__c = true;
                    tobeUpdated.add(sa);
                }
            }
            
            if(tobeUpdated.size() > 0){
                update tobeUpdated;
            }
        }catch(exception e){
          system.debug('error msg'+e.getMessage()); 
       }
    }
    
    public class wrapper{
        
        public Date dates {get;set;} // in json: date
        public Double open {get;set;} 
        public Double high {get;set;} 
        public Double low {get;set;} 
        public Double close {get;set;} 
        public Double adjusted_close {get;set;} 
        public string code {get;set;} 

    } 
}