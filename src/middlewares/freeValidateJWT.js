const jwt = require('jsonwebtoken');
const model = require('../Models/UsersModels');

const segredo = 'seusecretdetoken';

module.exports = async (req, res, next) => {  
if (!req.headers.authorization) {
  next();
}

const token = req.headers.authorization;

try {  
  const decoded = jwt.verify(token, segredo); 
  const user = await model.findNameInDatabase(decoded.data.email);
  req.user = user;

     next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
