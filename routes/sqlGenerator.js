var express = require('express');
var router = express.Router();
var controllers = require('../controllers');



router.post('/login', (req, res) => {
    controllers.sqlGeneratorController.getUser(req, res);
})


router.post('/', (req, res) => {
   controllers.sqlGeneratorController.createUser(req, res)
   
})

router.patch('/', (req, res) => {
    controllers.sqlGeneratorController.saveUserDatabase(req, res);  
});

router.post('/generate', (req, res) => {
    controllers.sqlGeneratorController.generateSqlScript(req, res);
})

router.delete('/', (req, res) => {
    controllers.sqlGeneratorController.deleteDatabase(req, res);
})

  
  
module.exports = router;