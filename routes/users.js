var express = require('express');
var router = express.Router();
var controllers = require('../controllers');
var services = require('../services')


let circularJSON = require('circular-json');


router.post('/getDatabase', (req, res) => {
    controllers.userController.getUser(res, req)
})


router.post('/createDatabase', (req, res) => {
   controllers.userController.createUser(req, res)
    // res.send({code: 'test'})
    // let user = req.body;

    // let query = {
    //     'name': user.name,
    //     'database': user.database
    // }

    // userCollection.findOne(query, function (err, result){
    //     if (err) throw err;
    //     if (typeof(result) === 'undefined'){
    //         controllers.userController.insertUser(user, res);
            
    //     }
    //     else {
    //         res.send({error: 'used'})
    //     }
    // })
})


// router.post('/saveDatabase', function(req, res){
  
//     let data = req.body
//     let user = data[0];
//     let table = data[1]
  
//     let submission = {
//         'rows': [ {table} ]
//     }
  
//     let tables = [submission];
  
//     controllers.userCollection.updateOne(
//       { name: user.name},
//       {
//         $set: { 'tables': tables},
//         $currentDate: { lastModified: true }
//       }
//     );
  
  
//     res.send({result: 200, tableName: table.name});
  
  
//   });

  module.exports = router;