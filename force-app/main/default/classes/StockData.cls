public class StockData {
    public class MetaData {
        public String Information;
        public String Symbol;
        public String LastRefreshed;
        public String TimeZone;
    }

    public class TimeSeriesData {
        public String open;
        public String high;
        public String low;
        public String close;
        public String volume;
    }

    public MetaData Meta_Data;
    public Map<String, TimeSeriesData> Monthly_Time_Series;

    public void parse(String jsonString) {
        
       system.debug((StockData)JSON.deserialize(jsonString, StockData.class));
    }
}