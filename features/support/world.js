require('../../bin/www');
var Zombie = require('zombie');

var testServerPath = function(path) {
  return "http://localhost:3000" + path
};

function World() {
  this.browser = new Zombie();

  this.visit = function (relativeUrl, callback) {
    this.browser.visit(testServerPath(relativeUrl), callback);
  };
}

module.exports = function() {
  this.World = World;
};
