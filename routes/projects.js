var express = require('express');
var router = express.Router();
var controllers = require('../controllers');





router.get("/projects/mainProject", function (req, res) {
    controllers.projectController.mainProject(res);
});


router.get("/projects/chessProject", function (req, res) {
    controllers.projectController.chessProject(res);
});

router.get("/projects/weatherApp", function(req, res) {
    controllers.projectController.weatherApp(res);

});

router.get("/projects/sqlGenerator", function(req, res){
    controllers.projectController.sqlGenerator(res);
})


module.exports = router;