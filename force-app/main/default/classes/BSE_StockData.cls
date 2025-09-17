public class BSE_StockData {
    
    @future(callout=true)
    public static void getData(){
     List<BSE_Price_Details__b > wraplist = new List<BSE_Price_Details__b>();
        List<BSE_StockData__b> BseTickerList = [select Security_Id__c,Security_Code__c,
                                               Issuer_Name__c,Industry__c  from BSE_StockData__b LIMIT 1];
        for(BSE_StockData__b bseticker : BseTickerList){
        string endpointurl2 = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol='+bseticker.Security_Id__c+'.BSE&outputsize=compact&apikey=OQKUHPAGJVBSLLSA';
            
        HTTP htt = new HTTP();
        HTTPRequest req = new HTTPRequest();
        req.setEndpoint(endpointurl2);
        req.setMethod('GET');
        req.setHeader('content-type','application/json');
        HTTPResponse res = htt.send(req);
          Map<Date,wrapper> wrapperMap = new Map<Date,wrapper>();    
            string response = res.getBody(); 
            response = response.replaceAll('1. open','open').replaceAll('2. high','high').replaceAll('3. low','low').replaceAll('4. close','close').replaceAll('5. volume','volume').replaceAll('1. Information','Information').replaceAll('2. Symbol','Symbol').replaceAll('3. Last Refreshed','Last_Refreshed').replaceAll('4. Time Zone','Time_Zone').replaceAll('Monthly Time Series','Monthly_Time_Series').replaceAll('Meta Data','Meta_Data');
            
            StockData sd = new StockData();
            sd.parse(response);
           // System.JSONParser jp = JSON.CreateParser(response);
            
            /*  while(jp.nextToken() != null){
                BSE_Price_Details__b bsePrice = new BSE_Price_Details__b();
                 
                  if(jp.getText() == 'Monthly_Time_Series'){
                      jp.nextToken();
                    // bsePrice.ListDate__c = (Date)date.valueof(jp.getText());
                    //  jp.nextToken();
                   //  wrapper wrap = (wrapper) jp.readvalueAs(wrapper.class);
                     listedDate wrapDates = (listedDate) jp.readValueAs(listedDate.class);
                     system.debug('wrap==='+wrapDates);
                   }
                 
               if(jp.getText() == 'Monthly_Time_Series' || jp.getText() == '}'){
                     bsePrice.ListDate__c = (Date)date.valueof(jp.getText());
                     system.debug('bsePrice.ListDate__c'+bsePrice.ListDate__c);
                   }
                if(jp.getText() == 'open'){
                    jp.nextToken();
                    bsePrice.Open__c = (Decimal)Decimal.valueof(jp.getText());
                }
                if(jp.getText() == 'high'){
                    jp.nextToken();
                     bsePrice.high__c  = (Decimal)Decimal.valueof(jp.getText());
                }
                if(jp.getText() == 'low'){
                    jp.nextToken();
                     bsePrice.low__c = (Decimal)Decimal.valueof(jp.getText());
                }
                if(jp.getText() == 'close'){
                    jp.nextToken();
                      bsePrice.close__c = (Decimal)Decimal.valueof(jp.getText());
                }
                if(jp.getText() == 'volume'){
                    jp.nextToken();
                     bsePrice.volume__c  =(Integer)Integer.valueof(jp.getText());
                }
               system.debug('bsePrice'+bsePrice);
               wraplist.add(bsePrice);
             }
        }
          system.debug('wraplist=== Data'+wraplist);*/
     	   }
    }
    
    public class listedDate{
        public date listDate {get;set;}
        public wrapper wrap {get;set;}
        public listedDate(Date listDate, wrapper wrap){
           this.listDate = listDate;
           this.wrap = wrap;
        }
    }
    public class wrapper{
        public Date listDate {get;set;} 
        public Double open {get;set;} 
        public Double high {get;set;} 
        public Double low {get;set;} 
        public Double close {get;set;} 
        public integer volume {get;set;} 
        
        public wrapper(Date listDate, double open, double high, double low, double close, integer volume){
            this.listDate = listDate;
            this.open = open;
            this.high = high;
            this.low = low;
            this.close = close;
            this.volume = volume;
        }
    }
}