const path = require("path");

const fs = require('fs');

const filePath = path.join(__dirname,"..", "data", "tractors.json");

function gettractors(){
  const tractordata = fs.readFileSync(filePath);
  const storeddata = JSON.parse(tractordata);

  return storeddata;
}

function storetractors(storabledata){
    fs.writeFileSync(filePath, JSON.stringify(storabledata));
}

module.exports = {
    gettractors : gettractors,
    storetractors : storetractors
}