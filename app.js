express=require("express");
var app=express();
var cookieParser=express("cookie-parser");
var mysql=require("mysql");
var connection=require("express-myconnection");

var bodyParser=require("body-parser");
var asyncLoop = require('node-async-loop');

var multer  = require('multer');

var upload = multer({ dest: 'images/' })

var nodemailer = require('nodemailer');
var fs = require("fs"); 
var dateTime = require('node-datetime');

var Cryptr = require('cryptr'),  
 cryptr = new Cryptr('myTotalySecretKey');
 
mailemail = 'tapan.rawal@travialist.com';
mailpass = 'Mindcrew@123';
var imgurl = 'https://travialist.com/ImagesFiles/';
var cityImages ='https://travialist.com/ImagesCity/';

 uniquecode = require('./routers/api/uniquecode/uniquecode.js');
 var userregistration = require('./routers/api/userregistration/signup');

 
mailfile = require('./routers/api/mail.js');


var index=require("./routers/index");
var admin=require("./routers/admin");
var poi=require("./routers/api/poi");
var subscribe=require("./routers/api/subscribe");
var poiDetails=require("./routers/api/poiDetail");
var poiArrivalguide=require("./routers/api/poiArrivalguide");
var cityHome=require("./routers/api/cityHome");
var categories=require("./routers/api/categories");
var sygic=require("./routers/api/sygic");

var bookmarkCity=require("./routers/api/bookmarkCity");  // city book mark

var cronScrappingfoursquaredata=require("./routers/api/cronScrappingfoursquaredata");
var poiFeature=require("./routers/api/poiFeature");
var cityDetail=require("./routers/api/cityDetail");
var poiReview=require("./routers/api/poiReview");

var csvfileupload=require("./routers/api/csvfileupload/csvfileupload");

var outlook = require("node-outlook");



var bodyParser = require("body-parser");
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


/* app.get('/test', function(req, res, next) {
	res.sendFile(__dirname + "/routers/test/index.html");
});
app.get('/project4', function(req, res, next) {
	res.sendFile(__dirname + "/routers/test/project4.html");
});
app.get('/project2', function(req, res, next) {
	res.sendFile(__dirname + "/routers/test/project2.html");
});
app.get('/project3', function(req, res, next) {
	res.sendFile(__dirname + "/routers/test/project3.html");
});
app.get('/project5', function(req, res, next) {
	res.sendFile(__dirname + "/routers/test/project5.html");
});
app.get('/project6', function(req, res, next) {
	res.sendFile(__dirname + "/routers/test/project6.html");
});
app.get('/project7', function(req, res, next) {
	res.sendFile(__dirname + "/routers/test/project7.html");
}); */
//mysql pools
// New connection

  

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

 /*
 app.use(connection(mysql,{
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'travialistnewnew'
 },'request'));
   */
 app.use("/travialistApp/",index);
 app.use("/travialistAdmin/",admin);
 app.use("/poiOverview/",poi);
 app.use("/subscribeWEB/",subscribe);
 app.use("/poiDetailsApp/",poiDetails);
 app.use("/poiArrivalguide/",poiArrivalguide);
 app.use("/cronScrappingfoursquaredata/",cronScrappingfoursquaredata);
 app.use("/bookmark/",bookmarkCity);
 app.use("/city/",cityHome);
 app.use("/categories/",categories);
 app.use("/poiAddfeature/",poiFeature);
 app.use("/poiFoursquareApp/",cityDetail);
 app.use("/poiReviewAPI/",poiReview);
 app.use("/sygic/",sygic);
 app.use("/userregistration/",userregistration);
 app.use("/csvfileupload/",csvfileupload);
 
app.listen(1337,function(){

	console.log("app is running 1337");
})
module.exports = app;