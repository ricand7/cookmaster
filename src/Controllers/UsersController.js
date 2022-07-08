const Users = require('../Services/UserServices');
const { loginService } = require('../Services/UserServices');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await loginService(email, password);
    return res.status(200).json(result);
  } catch (e) {
      next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const { result } = await Users.create(name, email, password, role);
    res.status(201).json(result);
  } catch (e) {
      next(e);
  }
};

module.exports = {
  create,
  login,
};
