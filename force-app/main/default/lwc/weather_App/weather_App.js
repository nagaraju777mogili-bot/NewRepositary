import { LightningElement } from 'lwc';
import WEATHER_ICONS from '@salesforce/resourceUrl/weatherAppIcons';
export default class Weather_App extends LightningElement {
clearIcon = WEATHER_ICONS+'/weatherAppIcons/clear.svg';
cloudIcon = WEATHER_ICONS+'/weatherAppIcons/cloud.svg';
dropletIcon = WEATHER_ICONS+'/weatherAppIcons/droplet.svg';
hazeIcon = WEATHER_ICONS+'/weatherAppIcons/haze.svg';
mapIcon = WEATHER_ICONS+'/weatherAppIcons/map.svg';
rainIcon = WEATHER_ICONS+'/weatherAppIcons/rain.svg';
snowIcon = WEATHER_ICONS+'/weatherAppIcons/snow.svg';
stormIcon = WEATHER_ICONS+'/weatherAppIcons/storm.svg';
thermometerIcon = WEATHER_ICONS+'/weatherAppIcons/thermometer.svg';
arrowIcon = WEATHER_ICONS+'/weatherAppIcons/arrow-back.svg';

    loadingText = '';
    cityName = ''
    API_KEY = '704473ae827019f55dfdde2230159982';
    isError = false;
    response = '';
   
    searchHandler(event){
        this.cityName = event.target.value;
    }

    get loadingClasses(){
        return this.isError  ?  'error-msg' : 'success-msg';
    }
    
    submitHandler(event){
        event.preventDefault();
        console.log('this.cityName',this.cityName)
        this.makeApiCall();
    }

    makeApiCall(){
        console.log('this.cityName',this.cityName)
        this.isError = false;
        this.loadingText = 'Fetching the Weather Report...';
       const URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&units=metric&appid=${this.API_KEY}`;
       console.log(URL)
       fetch(URL).then(res=>res.json()).then(result=>{
         console.log(JSON.stringify(result));
         this.Weatherresponse(result)

       }).catch((error)=>{
            console.error(error);
            console.log(error);
            this.isError = true;
            this.loadingText = 'Something went Wrong...';
       })
    }

    Weatherresponse(info){
        if(info.cod === '404'){
            this.isError = true;
            this.loadingText = `${this.cityName} city is not found`
        }else{
             this.loadingText = ''
             this.isError = false;

             const city = info.name;
             const country = info.sys.country;

             const {feels_like,humidity,temp} = info.main;
            const {main,description,id} = info.weather[0];
             
            this.response ={
                location : `${city} ${country}`,
                feels_like : Math.floor(feels_like),
                humidity : `${humidity} %`,
                temp : Math.floor(temp),
                description : description,
                main : main
            }
        }
    }

    backArrow(){
        this.response = '';
        this.cityName = ''
        this.loadingText =''
    }
    
}