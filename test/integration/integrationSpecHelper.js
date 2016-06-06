const Zombie = require('zombie');
Zombie.site = 'http://localhost:3000';

require('../../bin/www'); // This starts the web server, and ensures it is only
                          // started once. It is a misuse of "require", and
                          // should be improved.

module.exports = {
  promise(callable) {
    return new Promise(res => res(callable()));
  },
};
