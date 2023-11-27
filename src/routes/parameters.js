var express = require("express");
var router = express.Router();

var parametersController = require("../controllers/parametersController");

router.put("/:establishmentId", (req, res) => {
  console.log("a")
  parametersController.putParameters(req, res);
})

router.get("/:establishmentId", (req, res) => {
  parametersController.getParameters(req, res);
})

module.exports = router;