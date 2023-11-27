var express = require("express");
var router = express.Router();

const controller = require('../controllers/commandController')

router.post("/", function (req, res) {
    controller.insertCommand(req, res)
});

module.exports = router;