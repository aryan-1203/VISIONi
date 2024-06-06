const express = require("express");

const router = express.Router();

const uuid = require("uuid");

const tracfunc = require('../util/tracfunc');

router.get("/tractors", function (req, res) {
  const storeddata = tracfunc.gettractors();
  res.render("tractors", { mytrac: storeddata });
});

router.get("/tractors/:id", function (req, res) {
  const tractorId = req.params.id;
  const storeddata = tracfunc.gettractors();
  for (const tr of storeddata) {
    if (tr.id === tractorId) {
      return res.render("tractors-detail", { mytracis: tr, rid: tractorId });
    }
  }
  res.status(404).render("404");
});

router.get("/addtractor", function (req, res) {
  res.render("addtractor");
});

router.post("/addtractor", function (req, res) {
  const tractors = req.body;
  tractors.id = uuid.v4();
  const storeddata = tracfunc.gettractors();
  storeddata.push(tractors);
  tracfunc.storetractors(storeddata);
  res.redirect("/tractors");
});

module.exports = router;
