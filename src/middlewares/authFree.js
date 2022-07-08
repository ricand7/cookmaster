const AuthService = require('../Services/AuthServices');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
  
    if (!authorization || authorization) {
      const user = AuthService.verifyToken(authorization);
      req.user = user;
      next();
    }             
  } catch (error) {
    return res.status(401).json({ message: 'Falha na Autenticação' });
  }
};
