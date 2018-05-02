module.exports = router;

/* var mysqlConnecdtion = router.use(connection(mysql,{
  host     : 'galera-service.service.consul',
  user     : 'LsSPjH4I6eVg9TxL',
  password : '5wmaaGNVN0UBOY5i',
  database : 'CF_C4C7A359_CA23_4B71_84A5_C19EAB920FD0'
 },'request')); */
 
 
var mysqlConnecdtion = router.use(connection(mysql,{
  host     : 'localhost',
  user     : 'LsSPjH4I6eVg9TxL',
  password : '5wmaaGNVN0UBOY5i',
  database : 'CF_C4C7A359_CA23_4B71_84A5_C19EAB920FD0',
  port     : 63306
 },'request'));

module.exports = mysqlConnecdtion;