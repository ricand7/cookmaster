const AuthService = require('../Services/AuthServices');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    
    if (!authorization) {
      return res.status(401).json({ error: 'Token não encontrado' });
    }
    
    const user = AuthService.verifyToken(authorization);

    if (!user) {
      return res.status(401).json({ message: 'jwt malformed' });
    }

    req.user = user;
       
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Falha na Autenticação' });
  }
};
