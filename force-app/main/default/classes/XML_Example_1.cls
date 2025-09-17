public class XML_Example_1 {
    public string xmlString {get;set;}
    
    public XML_Example_1(){
        DOM.document doc = new DOM.document();
        DOM.XMLNode root = doc.createrootElement('Student','','');
        DOM.XMLNode lName = root.addChildElement('LastName','','');
        lname.addTextNode('Mogili');
        DOM.XMLNode fName = root.addChildElement('FirstName','','');
        fname.addTextNode('Nagaraju');
        xmlString = doc.toxmlString();
        system.debug('xmlString--'+xmlString);
    }
}