var express = require('express');
var router = express.Router();
// var appConnection = require('../app')
var database = require('../Database/database');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/getInfo',function(req,res,next){ 

  var object = {
    userRule: req.body.userRule,
    userCountry: req.body.userCountry
  }
  console.log("object is ",object);

  return new Promise( function (resolve, reject) {
    database.connection.getConnection(function (err, connection) {
      if (err) {
        var errorDatabaseObj = {
          'statusCode': 501,
          'message': 'Database connection Error',
          'errorData': err
        }
        return reject(errorDatabaseObj);
      }
      var  storedProcuser = 'CALL getData(?,?)';
      connection.query(storedProcuser,[object.userCountry,object.userRule],function(err, resultObject){
        
        if (err) {
          var errorQueryObj = {
            'statusCode': 401,
            'message': 'Invalid parameter passed.',
            'errorData': err
          }
          return reject(errorQueryObj);
        }
        
          console.log("resultObject is ",resultObject);
          var responseArray = [];
                 for (var i = 0; i < resultObject.length; i++) {
                   for (var j = 0; j < resultObject[i].length; j++) {
                     var objresult = resultObject[i][j];
                     responseArray.push(objresult)
                   }
                 }
                 res.send(responseArray);
        

        // console.log("responseArray is ",responseArray);

      })
    });
  
  })



})


module.exports = router;
