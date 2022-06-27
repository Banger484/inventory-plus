// Imports required npm package
const jwt = require('jsonwebtoken');
const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

// Exports signin token fuction
module.exports = {
  signToken: function ({ email, name, _id,enterprise,avatar }) {
    const payload = { email, name, _id,enterprise,avatar };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
