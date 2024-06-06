const express = require("express");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("index");
});

router.get("/agro_shop", function (req, res) {
  res.render("agro_maps");
});

router.get("/silo_maps", function (req, res) {
  res.render("silo_maps");
});

router.get("/index", function (req, res) {
  res.render("index");
});

router.get("/contact", function(req, res){
  res.render("contact");
}) 

router.get('/blog', (req, res)=>{
  res.send("Hello World");
})

router.get("/equipments", function (req, res) {
  res.render("equipments");
});

module.exports = router;