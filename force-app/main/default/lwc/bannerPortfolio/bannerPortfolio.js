import { LightningElement ,wire} from 'lwc';
import PortfolioAssets from '@salesforce/resourceUrl/PortfolioAssets';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import FULL_NAME  from '@salesforce/schema/Portfolio__c.Full_Name__c';
import DESIGNATION  from '@salesforce/schema/Portfolio__c.Designation__c';
import COUNTRY  from '@salesforce/schema/Portfolio__c.Country__c';
import LOCATION  from '@salesforce/schema/Portfolio__c.Location__c';


export default class BannerPortfolio extends LightningElement {

    recordId = 'a07J10000011kQUIAY';
   @wire(getRecord,{recordId : '$recordId' , fields : [FULL_NAME,COUNTRY,DESIGNATION,LOCATION]}) profitData


   get FullName(){
      return getFieldValue(this.profitData.data,FULL_NAME);
   }

   get Location(){
      return getFieldValue(this.profitData.data,LOCATION);
   }

   get designation(){
      return getFieldValue(this.profitData.data, DESIGNATION);
   }

   get country(){
      return getFieldValue(this.profitData.data, COUNTRY);
   }

   
    blogUrl = 'https://sooma.com/pt-pt/?ref=blog.com';
    githubUrl = 'https://github.com/';
    linkedinUrl = 'https://in.linkedin.com/'
    mediumUrl = 'https://medium.com/';
    trailhead1Url = 'https://trailhead.salesforce.com';
    twitterUrl = 'https://x.com/?lang=en';
    bloggerUrl = 'https://www.blogger.com/about/?bpli=1';
    youtubeUrl = 'https://www.youtube.com';
   
    userPic = PortfolioAssets+'/PortfolioAssets/userPic.jpeg';
    blog = PortfolioAssets+'/PortfolioAssets/Social/blog.svg';
    github = PortfolioAssets+'/PortfolioAssets/Social/github.svg';
    linkedin = PortfolioAssets+'/PortfolioAssets/Social/linkedin.svg';
    medium = PortfolioAssets+'/PortfolioAssets/Social/medium.svg';
    trailhead1 = PortfolioAssets+'/PortfolioAssets/Social/trailhead1.svg';
    twitter = PortfolioAssets+'/PortfolioAssets/Social/twitter.svg';
    blogger = PortfolioAssets+'/PortfolioAssets/Social/blogger.svg';
    youtube = PortfolioAssets+'/PortfolioAssets/Social/youtube.svg';



}