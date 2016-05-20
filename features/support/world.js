const Zombie = require('zombie');
const testServerPath = path => `http://localhost:3000${path}`;

require('../../bin/www'); // This starts the web server, and ensures it is only
                          // started once. It is a misuse of "require", and
                          // should be improved.


function World() {
  this.browser = new Zombie();

  this.visit = (relativeUrl, callback) => {
    this.browser.visit(testServerPath(relativeUrl), callback);
  };
}

module.exports = function () {
  this.World = World;
};
