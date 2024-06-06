const path = require("path");

const fs = require("fs");

const filePath = path.join(__dirname, "..", "data", "harvesters.json");

function gethars() {
  const hardata = fs.readFileSync(filePath);
  const storeddata = JSON.parse(hardata);

  return storeddata;
}

function storehars(storabledata) {
  fs.writeFileSync(filePath, JSON.stringify(storabledata));
}

module.exports = {
  gethars: gethars,
  storehars: storehars,
};

