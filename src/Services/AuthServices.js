const jwt = require('jsonwebtoken');

const secret = 'seusecretdetoken';

const jwtConfig = {
   expiresIn: '7d',
    algorithm: 'HS256',
 };

const genToken = (user) => jwt.sign({ user }, secret, jwtConfig);

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
       const { user } = decoded;
       return user;
  } catch (error) {
       return null;
  }
};

module.exports = {
  genToken,
  verifyToken,

};
