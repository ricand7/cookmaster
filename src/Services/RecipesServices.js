const { ObjectId } = require('mongodb');
const Recipes = require('../Models/RecipesModels');
const All = require('../Models/UsersModels');

const URL = 'localhost:3000/src/uploads/';

const errorObject = { status: 401, message: 'All fields must be filled' };
const array = [];

 const pegaToken = async (email, token, role) => {
 const procura = await All.listAll(); 
 const { userId } = procura.find((r) => r.email === email);
 array.push({ email, token, userId, role });
};

const validaToken = (token) => {
  const { userId } = array.find((r) => r.token === token);
  return { userId };
};

const validaTokenUpdate = (token) => {
  const { userId, role } = array.find((r) => r.token === token);
  return { userId, role };
};

const validaTokenUp = (token) => {
  const { userId, role } = array.find((r) => r.token === token);
  return { userId, role };
};

const getNewRecipes = ({ name, ingredients, preparation, userId, _id }) => ({
  recipe: {
    _id,
    name,
    ingredients,
    preparation,
    userId,
  },  
  });

 const getNewList = ({ name, ingredients, preparation, userId, _id }) => ({
    name,
    ingredients,
    preparation,
    userId,
    _id,  
 });

const getNewUp = ({ _id, name, ingredients, preparation, userId, image }) => ({
  _id,  
  name,
  ingredients,
  preparation,
  userId,
  image,
});
 
const create = async (userId, name, ingredients, preparation) => {
  if (!name) return { message: 'Invalid entries. Try again.' };
  if (!ingredients) return { message: 'Invalid entries. Try again.' };
  if (!preparation) return { message: 'Invalid entries. Try again.' };
  const { insertedId } = await Recipes.create(name, ingredients, preparation, userId);
  const result = getNewRecipes({ name, ingredients, preparation, userId, _id: insertedId });
  return { result };
};

const listAll = async () => {
  const allList = await Recipes.listAll();
  return allList.map(getNewList);
};

const findId = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { code: 'invalid data', message: 'recipe not found' };
}
  const recipe = await Recipes.findId(id);
  if (recipe === null) return { code: 'invalid data', message: 'teste' };

  return getNewList(recipe);
};

const update = async (id, name, ingredients, preparation) => {
  if (!ObjectId.isValid(id)) throw errorObject;
  const { userId } = await Recipes.findId(id);
  await Recipes.update(id, name, ingredients, preparation);
   
  return { 
    _id: id,
    name,
    ingredients,
    preparation,
    userId,
   };
 };

const remove = async (obj, id) => {
  const { _id, role } = obj;
  const recipe = await Recipes.findId(id);
  if (recipe === null) {
    return { code: 401, err: 'recipe not found' };
  }
  
  if (_id === recipe.userId || role === 'admin') {
    await Recipes.remove(id);
    return { code: 204 };
  }  
  return { code: 401, err: 'missing auth token' };
};
 
const up = async (obj, id) => {
  const { _id, role, filename } = obj;
  const recipe = await Recipes.findId(id);
   if (_id === recipe.userId || role === 'admin') {
    await Recipes.up(id, filename);
    let userId = '';
    let name = '';
    let ingredients = '';
    let preparation = '';
    name = recipe.name;
    userId = recipe.userId;
    ingredients = recipe.ingredients;
    preparation = recipe.preparation;
    
    const object = getNewUp({ 
      _id: id, name, ingredients, preparation, userId, image: `${URL + filename}`,
    });  
    return { code: 200, object };
  }
  return { code: 401, err: { message: 'Erro: Não foi possivel Atualizar' } };
};

module.exports = {
  create,
  listAll,
  pegaToken, 
  validaToken,
  findId,
  update,
  validaTokenUpdate,
  remove,  
  up,
  validaTokenUp,
};
