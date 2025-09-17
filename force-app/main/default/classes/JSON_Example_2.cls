public class JSON_Example_2 {
    public string jsonString {set;get;}
    
    public JSON_Example_2(){
        system.JSONGenerator js = JSON.createGenerator(true);
        js.writestartObject();
        js.writeFieldName('EmpName');
        js.writeString('Nagaraju');
        js.writeStringField('city','warangal');
        js.writeNumberField('Phone',9966);
        js.writeIdField('userID',userinfo.getUserID());
        js.writeEndObject();
        jsonString = js.getAsString();
        system.debug('jsonString'+jsonString);
    }
}