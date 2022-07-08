const Recipes = require('../Services/RecipesServices');

const create = async (req, res) => {
   const { name, ingredients, preparation } = req.body;
   const { _id } = req.user;
   const { result, message } = await Recipes.create(_id, name, ingredients, preparation);
  if (!result) return res.status(400).json({ message });
  return res.status(201).json(result);
};

const listAll = async (req, res) => {
  const list = await Recipes.listAll();
  res.status(200).json(list);
};

const findId = async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipes.findId(id);
  if (recipe.code) return res.status(404).json({ message: 'recipe not found' });
  res.status(200).json(recipe);
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const result = await Recipes.update(id, name, ingredients, preparation);
    res.status(200).json(result);
   } catch (error) {
    next(error);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { _id, role } = req.user;
  const newObj = { _id, role };
  const obj = newObj;
  const { code, object, err } = await Recipes.remove(obj, id);
  if (!object) return res.status(code).json({ err });
  res.status(code);
};

const up = async (req, res) => {
  const { filename } = req.file;
  const { id } = req.params;
  const { _id, role } = req.user;
  const newObj = { _id, role, filename };
  const obj = newObj;
  const { code, object, err } = await Recipes.up(obj, id);
  if (!object) return res.status(code).json({ err });
  res.status(code).json(object);
};

module.exports = {
  create,
  listAll,
  findId,
  update,
  remove,
  up,
};
