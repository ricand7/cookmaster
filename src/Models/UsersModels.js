const connection = require('./connection');
// const connect = require('./connection');

const findNameInDatabase = async () => connection()
  .then((db) => db.collection('users').find().toArray())
  .then((users) => users);

const create = async (name, email, password, role) => connection()
.then((db) => db.collection('users').insertOne({ name, email, password, role }));

const listAll = async () => connection()
  .then((db) => db.collection('users').find().toArray())
  .then((user) => user.map(({ userId, email }) => ({
        userId,
        email,
      })));

const findUser = async (email) => {
  const db = await connection();
  const result = db.collection('users').findOne({ email });
  return result;
};
 
module.exports = {
  create,
  findNameInDatabase,  
  listAll,
  findUser,
};
