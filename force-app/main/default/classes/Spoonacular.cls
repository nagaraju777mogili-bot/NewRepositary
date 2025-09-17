public class Spoonacular {
 		
    	public static string Receipe_API = 'https://api.spoonacular.com';
        public static string apitoken = '5e2df9762ef5464e837a7f8d5b4ccc88';

    public static string getrandomReceipe(){
      
           Http h = new Http();        
          HttpRequest req = new HttpRequest();
            req.setEndpoint(Receipe_API+'/receipes/random?apiKey='+apitoken);
            req.setMethod('GET');
           HttpResponse res = h.send(req);
        if(res.getStatusCode() == 200){
            system.debug(res.getBody());
            return res.getbody();
        }
        return null;
    }
    
      public static string getrecipesbyingredient(String Ingredients){
         string errmsg;
          try{
           Http h = new Http();        
          HttpRequest req = new HttpRequest();
            req.setEndpoint(Receipe_API+'/recipes/findByIngredients?apiKey='+apitoken+'&ingredients='+Ingredients);
            req.setMethod('GET');
           HttpResponse res = h.send(req);
              system.debug('endpoing'+req.getEndpoint());
        if(res.getStatusCode() == 200){
            system.debug(res.getBody());
            return res.getbody();
        }
          }catch(exception ee){
              errmsg= ee.getmessage();
      }
    return errmsg;
    }
}