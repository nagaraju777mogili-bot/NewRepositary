public with sharing class MonthlyBucketTask {
   

    @AuraEnabled(cacheable=true)
    public static Map<String,Integer> getMonthsData(Integer startMonth, Integer lastMonth , Integer startYear, Integer endYear){
        system.debug('startYear'+startYear+'endYear'+endYear +'startMonth'+startMonth+'lastMonth'+lastMonth);
        Map<String,Integer> monthsBetween = new  Map<String,Integer> ();
    Map<Integer,String> monthsData = new Map<Integer,String>{0=>'Jan',1=>'Feb',2=>'Mar',3=>'Apr',4=>'May',5=>'Jun',6=>'Jul',7=>'Aug',8=>'Sep',9=>'Oct',10=>'Nov',11=>'Dec'};
     
    integer monthsDiff = endYear - startYear;
    
       /* for(integer j = startYear; j<=endYear; j++){
   			 for(integer i= startMonth; i>= lastMonth ; i++){
                    monthsBetween.put(String.valueof(monthsData.get(i)+'-'+startYear),i);
                  	system.debug('==='+String.valueof(monthsData.get(i)+'-'+startYear));
                    monthsBetween.put(monthsData.get(i)+'-'+String.valueOf(endYear),i);
                }
        	}*/
       for (integer i=startYear; i <= endYear; i++) {
            for (integer j = 0 ; j <= 11; j++) {
                if(i == startYear && j == startMonth)
						continue;
                    monthsBetween.put(String.valueof(monthsData.get(j)+'-'+ i),j);
                    if(i == endYear && j == lastMonth)
                     break;
               
                }
            }

        system.debug('monthsBetween--keyset()'+monthsData.keyset());
        system.debug('monthsBetween--values()'+monthsData.values());
        return monthsBetween;
        }
     
}