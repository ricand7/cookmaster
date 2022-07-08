const Joi = require('@hapi/joi');
const Users = require('../Models/UsersModels');
const { findUser } = require('../Models/UsersModels');
const AuthServices = require('./AuthServices');

const getNewProducts = ({ name, email, role, _id }) => ({
  user: {
    name,
    email,
    role,
    _id,
  },
 });

 const MESSAGE = { 'any.required': 'Invalid entries. Try again.' };
 
 const validateBodyCreate = (bodyCreate) => {
    const { error } = Joi.object({
      name: Joi.string().required().messages(MESSAGE),
      password: Joi.string().required().messages(MESSAGE),
      email: Joi.string().required()
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      .messages({ ...MESSAGE, 'string.pattern.base': 'Invalid entries. Try again.' }),

    }).validate(bodyCreate);
    return error;
};

const emailValidate = (email) => {
  const errorObjectUserNot = { status: 401, message: 'Incorrect username or password' };
  const verificaEmail = /.+@.+.com/g;
  if (!verificaEmail.test(email)) {
    throw errorObjectUserNot;
  }
 return true;
};

const undefinedValidate = (email, password) => {
  const errorObject = { status: 401, message: 'All fields must be filled' };
  if (email === undefined || !password) {
    throw errorObject;
  }
 return true;
};

const loginService = async (email, password) => {
   const errorObjectUserNot = { status: 401, message: 'Incorrect username or password' };
   if (undefinedValidate(email, password).status) return undefinedValidate(email, password);

   if (!emailValidate(email)) return emailValidate(email);
 
  const userfound = await findUser(email);
  if (!userfound || userfound.password !== password) {
    throw errorObjectUserNot;
  }
  const { password: _password, ...userWithoutPassword } = userfound;
  const token = AuthServices.genToken(userWithoutPassword);
 
  return ({ token });
};

const GENERATEERROR = (status, message) => ({ status, message });
  
  
  
  
  
  
  //cria usuario no banco 
  const create = async (name, email, password, role = 'user') => {
  const usersInDatabase = await Users.findNameInDatabase();
  const userExist = usersInDatabase.find((r) => r.email === email);
  const erro = validateBodyCreate({ name, email, password });
  
  if (erro) {
    throw GENERATEERROR(400, erro.message);
  }

  if (userExist) throw GENERATEERROR(409, 'Email already registered');
 
  const { insertedId } = await Users.create(name, email, password, role);
  const result = getNewProducts({ _id: insertedId, name, email, role });
  return { result };
};

module.exports = {
  create,
  loginService,
};
