express=require("express");
 app=express();
 cookieParser=express("cookie-parser");
// var mysql=require("mysql");
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


var poi=require("./routers/api/poi");
var poiDetails=require("./routers/api/poiDetail");
var poiArrivalguide=require("./routers/api/poiArrivalguide");


 
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


app.use("/ImagesFiles",express.static(__dirname +"/routers/images"));
app.use("/ImagesCity",express.static(__dirname +"/routers/ImageCity"));
app.use("/sygictext",express.static(__dirname +"/routers/api"));
app.use("/PdfCity",express.static(__dirname +"/routers/PdfCity"));
/* app.use("/commonDesign",express.static(__dirname +"/routers/test/")); */



app.use("/angularJSfile",express.static(__dirname +"/routers/webadmin/bower_components/angular/"));
/* app.use("/angularJS",express.static(__dirname +"/webcode/comingsoon/angularJS/")); */

app.use("/commonfile",express.static(__dirname +"/webcode/comingsoon"));
// app.use("/comingsoonJS",express.static(__dirname +"/webcode/comingsoon/commonJS/"));




/* app.use("/js",express.static(__dirname +"/webcode/comingsoon/js/"));
app.use("/vendor",express.static(__dirname +"/webcode/comingsoon/vendor/jquery-easing/"));
app.use("/jquery",express.static(__dirname +"/webcode/comingsoon/vendor/jquery/")); */
/* app.use("/vendorBjs",express.static(__dirname +"/webcode/comingsoon/vendor/bootstrap/js/")); */
/* app.use("/css",express.static(__dirname +"/webcode/comingsoon/css/"));
app.use("/cssV",express.static(__dirname +"/webcode/comingsoon/vendor/bootstrap/css/"));
*/
app.use("/img",express.static(__dirname +"/webcode/comingsoon/img/")); 
app.use("/",express.static(__dirname +"/webcode/comingsoon/"));

									
												

	

app.get('/', function(req, res, next) {
	res.sendFile(__dirname + "/webcode/comingsoon/index.html");
});


// New connection


/* 
mongoose.connect("mongodb://localhost:53306/?ext.ssh.server=localhost:53306&ext.ssh.username=sv1aGd6TYOmFDrfh&ext.ssh.password=7wtXpERuDt33YOl0"); */

connectionOne=require("./routers/connection");

  
/* Table schema all start*/

tbsecret0001Two=require("./models/login");
tbsecret0002One=require("./models/countylisttbl");
tblcitylist001=require("./models/citylist001");
tbsecretSygicdatalist0002=require("./models/Sygicdatalist0002");

/* Table schema all end */

/* comment by tapan

app.use("/travialistApp/",index);
app.use("/travialistAdmin/",admin);
app.use("/subscribeWEB/",subscribe);
app.use("/city/",cityHome);
app.use("/categories/",categories);
app.use("/bookmark/",bookmarkCity);
app.use("/cronScrappingfoursquaredata/",cronScrappingfoursquaredata); 
app.use("/poiAddfeature/",poiFeature);
app.use("/poiFoursquareApp/",cityDetail);
app.use("/poiReviewAPI/",poiReview);
app.use("/csvfileupload/",csvfileupload);
  */
  

app.use("/poiOverview/",poi);
app.use("/poiDetailsApp/",poiDetails);
app.use("/poiArrivalguide/",poiArrivalguide);
/* app.use("/sygic/",sygic); */
app.use("/userregistration/",userregistration);
app.use("/scrapping/",scrapping);
 
 
 

 
app.listen(1338,function(){

	console.log("app is running 1338");
})
module.exports = app;