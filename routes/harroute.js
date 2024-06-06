const express = require("express");

const router = express.Router();

const uuid = require("uuid");

const harfunc = require("../util/harfunc");

router.get("/harvesters", function (req, res) {
    const storeddata = harfunc.gethars()
    res.render("harvesters", {myhar : storeddata});
});

router.get("/addharvester", function(req, res){
    res.render("addharvester");
});

router.get("/harvesters/:id", function (req, res) {
    const harId = req.params.id;
    
    const storeddata = harfunc.gethars()
    for (const har of storeddata) {
        if (har.id === harId) {
            return res.render("harvester-detail", { myhar: har, rid: harId });
        }
    }
    res.status(404).render('404');
});

router.post("/addharvester", function(req, res){
    const hars = req.body;
    hars.id = uuid.v4();
    const storeddata = harfunc.gethars()
    storeddata.push(hars);
    harfunc.storehars(storeddata);
    res.redirect("/harvesters");
})

module.exports = router;