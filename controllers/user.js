const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User');

exports.signup = (req, res, next) => {
  const passwordValidator = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])[A-Za-z0-9]{6,}$/;
    
  if (passwordValidator.test(req.body.password)){
    
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
    const user = new User({
        email: req.body.email,
        password: hash
    });
    
    user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(() => res.status(400).json({ message: "L'adresse mail renseignée est déjà utilisée." }));
    })
    .catch(error => res.status(500).json({ error }));
  } 
  else {
    res.status(400).json({message: "Le mot de passe doit faire une taille de 8 caractères et doit obligatoirement contenir : 1 majuscule + 1 minuscule + 1 chiffre + 1 symbole"});
  }  
};

exports.login = (req, res, next) => {

  console.log('req', req.body);
 
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                {userId: user._id},
                process.env.MY_TOKEN,
                {expiresIn: '24h'}
            )
          });
        })
        .catch(error => {
          console.log('error', error);
          res.status(500).json({ error }) 
        });
    })
    .catch(error => {
      console.log('error', error);
      res.status(500).json({ error }) 
    }
      );
};