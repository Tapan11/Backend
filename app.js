express=require("express");
app=express();
cookieParser=express("cookie-parser");

mysql=require("mysql");

mongoose = require('mongoose');
connection=require("express-myconnection");

bodyParser=require("body-parser");
asyncLoop = require('node-async-loop');

multer  = require('multer');

upload = multer({ dest: 'images/' })

nodemailer = require('nodemailer');
fs = require("fs"); 
dateTime = require('node-datetime');


request = require("request");

var Cryptr = require('cryptr'),  
 cryptr = new Cryptr('myTotalySecretKey');

cryptLib = require('cryptlib');

iv = "TravialistAppliecation"; //16 bytes = 128 bit 
key = cryptLib.getHashSha256('travialistApp', 32); //32 bytes = 256 bits 
 
mailemail = 'tapan.rawal@travialist.com';
mailpass = 'Mindcrew@123';

imgurl = 'https://travialist.com/ImagesFiles/';
cityImages ='https://travialist.com/ImagesCity/';

router = express.Router();

uniquecode = require('./routers/api/uniquecode/uniquecode');
 var userregistration = require('./routers/api/userregistration/signup');
/* var sygic=require("./routers/api/sygic"); */
var scrapping=require("./routers/sygicscraping/scrapping");
var cityheighlight=require("./routers/sygicscraping/cityheighlight");
var question=require("./routers/questionaddrating/questionarating");

var cityDetail=require("./routers/api/cityDetail");
var commentadd=require("./routers/comment/comment");

/* 
var poi=require("./routers/api/poi");
var poiDetails=require("./routers/api/poiDetail");
var poiArrivalguide=require("./routers/api/poiArrivalguide"); */


 
mailfile = require('./routers/api/mail.js');

/*

var index=require("./routers/index");
var admin=require("./routers/admin");



var subscribe=require("./routers/api/subscribe");
var cityHome=require("./routers/api/cityHome");
var categories=require("./routers/api/categories");

 var bookmarkCity=require("./routers/api/bookmarkCity");  

 var cronScrappingfoursquaredata=require("./routers/api/cronScrappingfoursquaredata");
var poiFeature=require("./routers/api/poiFeature");
var cityDetail=require("./routers/api/cityDetail");
var poiReview=require("./routers/api/poiReview");

var csvfileupload=require("./routers/api/csvfileupload/csvfileupload");
*/




var outlook = require("node-outlook");





 app.use(bodyParser.json({limit: '500mb'}));
 
 app.use(bodyParser.urlencoded({ extended: true }));
 


 
 app.use(function (req, res, next) {
	// Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
	// Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	// Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	// Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
	res.header("Content-Type", "application/json; charset=utf-8");
	// Pass to next layer of middleware
    next();
});

connectionOne=require("./routers/connection");
/* connectionMysql=require("./routers/mysqlconnection"); */

   
app.use(connection(mysql,{
  host     : 'galera-service.service.consul',
  user     : 'LsSPjH4I6eVg9TxL',
  password : '5wmaaGNVN0UBOY5i',
  database : 'CF_C4C7A359_CA23_4B71_84A5_C19EAB920FD0'
 },'request'));
/*
app.use(connection(mysql,{
  host     : 'localhost',
  user     : 'LsSPjH4I6eVg9TxL',
  password : '5wmaaGNVN0UBOY5i',
  database : 'CF_C4C7A359_CA23_4B71_84A5_C19EAB920FD0',
  port     : 63306
 },'request'));
*/

  
/* Table schema all start*/

tbsecret0001Two=require("./models/login");
tbsecret0002One=require("./models/countylisttbl");
tblcitylist001=require("./models/citylist001");
tbsecretSygicdatalist0002=require("./models/Sygicdatalist0002");

tbsecretSygicdatalist0008=require("./models/Sygicdatalist0008");
tbsecretSygicdatalist0009=require("./models/Sygicdatalist0009");
tbsecretcitylistlist0001=require("./models/cityname001");
countryList001=require("./models/country001");
question0001=require("./models/question0001");
questionAns0001=require("./models/questionans001");
cityHeighliteList001=require("./models/cityHeighliteList001");
tblcityshortdescription001=require("./models/tblcityshortdescription001");
tblcityfulldescription001=require("./models/tblcityfulldescription001");
tblcommentAdd001=require("./models/commentAdd001");
tblcitylistAdd001=require("./models/tblcitylist001");

/* app.use("/sygic/",sygic); */
app.use("/userregistration/",userregistration);
app.use("/scrapping/",scrapping);
app.use("/question/",question);
app.use("/cityheighlight/",cityheighlight);
 
app.use("/poiFoursquareApp/",cityDetail);
app.use("/comment/",commentadd);
 

 
app.listen(1338,function(){

	console.log("app is running 1338");
})
module.exports = app;