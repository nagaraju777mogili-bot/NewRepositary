public class DatabaseWithQueryBinds {

   public DatabaseWithQueryBinds(Map<String,object> bindParam){
         LeadFilter leadFilter = new LeadFilter(bindParam.get('firstName'),bindParam.get('lastName'));
       if(leadFilter.firstName != '' || leadFilter.lastName != ''){
        List<contact> conlist =  simpleBindingSoqlQuery(bindParam); 
           system.debug('sizeee'+conlist.size() +conlist);
       }
    }

    public static List<Contact> simpleBindingSoqlQuery(Map<String, object> bindParams) {
		string firstName = string.valueof(bindParams.get('firstName'));
        string lastName = string.valueof(bindParams.get('lastName'));
        string leadSource = string.valueof(bindParams.get('LeadSource'));
       // Integer countrecs = Integer.valueof(bindparams.get('count'));
        system.debug('firstName'+firstName);
        system.debug('lastName'+lastName);
        String queryString =  
        'SELECT Id, Name,Phone,LeadSource ' +
        ' FROM Contact ' +
        ' WHERE firstname =: firstName '+
        ' OR lastname =: lastName '+
        ' OR LeadSource =: leadSource ';
       // ' Limit =: countrecs';
    return Database.queryWithBinds(
        queryString,
        bindParams,
        AccessLevel.USER_MODE
    );
}
    
    public class LeadFilter{
	public String firstName;
	public String lastName;
	public String phone;
    public String Country;
    public Integer recordLimit;
        
        public LeadFilter(object FirstName, object LastName){
            firstName = this.FirstName;
            lastName = this.LastName;
            
        }
        
 }
}