public class CompositeAPIWithNSE {
   
    public static void MakeCallOut(List<String> stockNames, String ApiKey){
        List<String> requests = new List<String>();
        Http http = new Http();
        List<NSE__b> tickersList = [SELECT SYMBOL__c, NAME_OF_COMPANY__c, IsDataFetched__c FROM
                                   NSE__b];
        
        for(NSE__b ticker : tickersList){
            if(ticker.IsDataFetched__c != ''){
           	 string endpoint = 'https://eodhistoricaldata.com/api/eod/'+ticker.SYMBOL__c+'.NSE';
                    endpoint = endpoint+'?api_token='+''+ApiKey;
                    endpoint = endpoint+'&period='+'m';
                    endpoint = endpoint+'&&fmt='+'json';
                requests.add(endpoint);
            }
        }
        
        for(string url : requests){
            HttpRequest req = new HttpRequest();
            req.setEndpoint(url);
            req.setMethod('GET');
            req.setHeader('Content-Type', 'application/json');
            
            HttpResponse resp = http.send(req);
            string str = resp.getBody(); 

        }
    }
}