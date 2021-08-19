var express = require('express');
var router = express.Router();
var controllers = require('../controllers');



router.post('/getDatabase', (req, res) => {
    controllers.userController.getUser(req, res);
})


router.post('/createDatabase', (req, res) => {
   controllers.userController.createUser(req, res)
   
})


router.post('/saveDatabase', function(req, res){
    controllers.userController.saveUserDatabase(req, res);  
});

  module.exports = router;