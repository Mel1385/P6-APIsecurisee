require('dotenv').config();
const express = require('express');
const mongoose= require('mongoose');
const path = require('path');
const bodyParser =require ('body-parser');
const helmet = require('helmet')
const ModelsSauceRoutes = require('./routes/sauces');
const UserRoutes = require('./routes/user');

const app = express();

//CONNEXION A MONGODB
mongoose.connect(process.env.SECRET_DB, 
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //Autorise l'accès à l'API pour n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');  //Définit les Headers utilisé par l'API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');  //Définit les méthodes possible à utiliser
    next();
});

app.use(express.json());    //body-parser présent dans express. Permet de lire le contenu JSON renvoyé par les requêtes POST

app.use(helmet({
  crossOriginResourcePolicy: false,
}));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', ModelsSauceRoutes);
app.use('/api/auth', UserRoutes);

module.exports = app;