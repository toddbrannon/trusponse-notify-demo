var express = require("express");
var router = express.Router();

// Render expand_demo form ===========================================================
router.get("/", function(req, res){
    res.render("expand_demo");
});

module.exports = router;