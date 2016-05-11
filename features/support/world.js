require('../../bin/www'); // This starts the web server, and ensures it is only
                          // started once. It is a misuse of "require", and
                          // should be improved.

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
