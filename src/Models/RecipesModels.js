const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, ingredients, preparation, userId) => connection()
.then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));

const listAll = async () => connection()
  .then((db) => db.collection('recipes').find().toArray())
  .then((recipes) => recipes);
     
const findId = async (id) => {
  const oneProduct = await connection()
  .then((db) => db.collection('recipes').findOne(ObjectId(id)));
  if (!oneProduct) return null;
  const { name, ingredients, preparation, userId, _id } = oneProduct;

  return {
    _id, 
    name,
    ingredients,
    preparation,
    userId,
  };
};

// 7
const update = async (id, name, ingredients, preparation) => {
  const oneProduct = await connection()
  .then((db) => db.collection('recipes')
  .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));
   if (!oneProduct) return null;
   const { userId, _id } = oneProduct;
 
   return {
    _id, 
    name,
    ingredients,
    preparation,
    userId,
  };
};

const remove = async (id) => {
  try {
  await connection()
  .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
 } catch (error) {
   console.error('internal error:', error.message);
}
};

const up = async (id, image) => {
  try {
  const oneProduct = await connection()
  .then((db) => db.collection('recipes')
  .updateOne({ _id: ObjectId(id) }, { $set: { image } }));
   if (!oneProduct) return null;
  return true;
 } catch (error) {
   console.error('internal error:', error.message);
}
};

module.exports = {
  create,
  listAll,
  findId,
  update,
  remove,
  up,
};
