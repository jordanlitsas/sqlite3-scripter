var express = require('express');
var router = express.Router();
var controllers = require('../controllers');





router.get("/mainProject", function (req, res) {
    controllers.projectController.mainProject(res)
});


router.get("/chessProject", function (req, res) {
    controllers.projectController.chessProject(res)
});

router.get("/weatherApp", function(req, res) {
    controllers.projectController.weaherApp(res)

});
module.exports = router;