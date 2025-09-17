public class JSON_Example_Deserialization1 {
    
    public static void JSON_Example_Deserialization1(){
        string jsonString = '{"status":"success","lastName":"Mogili","firstName":"Nagaraju","phone":"9966401403"}';
        system.JSONParser jp = JSON.createParser(jsonString);
        while(jp.nextToken() != null){
            system.debug(jp.getText() +'--'+jp.getcurrentToken());
        }
    }
    
    public static void createAccount(){
        string jsonString = '{"Name":"Reyansh Mogili","Amount":10000.00}';
        Account acc = new Account();
        system.JSONParser jp = JSON.createParser(jsonString);
        while(jp.nextToken() != null){
            if(jp.getText() == 'Name'){
                jp.nextToken();
                acc.Name = jp.getText();
            }
            if(jp.getText() == 'Amount'){
                jp.nextToken();
                acc.AnnualRevenue = (Decimal)jp.getDecimalValue();
            }
            
        }
        insert acc;
        system.debug('account ID'+acc.Id);
    }

}