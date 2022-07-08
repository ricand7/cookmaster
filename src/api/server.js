const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const express = require('express');
const app = require('./app');

const PORT = 3000;

const freeValidateJWT = require('../middlewares/freeValidateJWT');
const auth = require('../middlewares/auth');
const authFree = require('../middlewares/authFree');
const login = require('../Controllers/UsersController');
const authupdate = require('../middlewares/authupdate');

const Users = require('../Controllers/UsersController');
const Recipes = require('../Controllers/RecipesControllers');
const errormidware = require('../middlewares/errormidware');

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

const pathImage = path.join(__dirname, '../', 'uploads');
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, pathImage);
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

app.use(bodyParser.json());
const upload = multer({ storage });

app.post('/users', Users.create); 

app.post('/login', login.login);

app.get('/recipes', Recipes.listAll);

app.post('/recipes', auth, Recipes.create);

app.get('/recipes/:id', authFree, Recipes.findId);

app.get('/recipes', freeValidateJWT, Recipes.listAll);

app.put('/recipes/:id', authupdate, Recipes.update);

app.delete('/recipes/:id', authupdate, Recipes.remove);

app.put('/recipes/:id/image', authupdate, upload.single('image'), Recipes.up);

app.use(errormidware);

app.listen(PORT, () => {
  console.log(`Cookmaster na porta ${PORT}`);
});
