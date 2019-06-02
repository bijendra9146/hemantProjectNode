// var connection = require('../Database/database');

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
  connection.release();
  })



})


router.post('/insertInfo',function(req,res,next){
  console.log("req body ", req.body)
  var dateTimeMTA = new Date();
  var object = {
    userDate: dateTimeMTA,
    userRule: req.body.userRule,
    userCountry: req.body.userCountry,
    userUpdate: req.body.userUpdate,
    userReference: req.body.userReference
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
       console.log("err is ",err);
       console.log("object userDate is ",object.userDate);
       console.log("object userCountry is ",object.userCountry);
       console.log("object userRule is ",object.userRule);
       console.log("object userUpdate is ",object.userUpdate);
       console.log("object userReference is ",object.userReference);
      var  storedProcuser = 'CALL insertData(?,?,?,?,?)';
      connection.query(storedProcuser,[object.userDate,object.userCountry,object.userRule,object.userUpdate,object.userReference],
        function(err, resultObject){      
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
      });
    })
  });
connection.release();
});

module.exports = router;
