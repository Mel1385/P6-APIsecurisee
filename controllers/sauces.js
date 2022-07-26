const ModelsSauce = require('../models/ModelsSauce');
const fs = require('fs');


exports.getSauce = (req, res, next) => {
    ModelsSauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => {
        console.log('error sauce', error);
        res.status(400).json({error}) 
    });  
     
};

exports.getSauceById = (req, res, next) => {
    ModelsSauce.findOne({_id: req.params.id})
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({error}));  
    
};

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce)
    delete sauceObject._id;
    const sauce = new ModelsSauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes:0,
        usersLiked: [' '],
        usersDisliked: [' ']
    });
    sauce.save()
    .then(() => res.status(201).json({message: "Sauce ajoutée"}))
    .catch(error => res.status(400).json({error}));
    
};

exports.modifySauce = (req, res ,next) => {
    const sauceObject = req.file ?
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body}

    ModelsSauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
    .then(() => res.status(200).json({message: 'Sauce modifiée'}))
    .catch(error => res.status(400).json({error}));  
     
};

exports.deleteSauce = (req, res, next) => {
    ModelsSauce.findOne({_id: req.params.id})
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            ModelsSauce.deleteOne({_id: req.params.id})
            .then(() => res.status(200).json({message: 'Sauce supprimée'}))
            .catch(error => res.status(400).json({error}));  
            
        });
    })
    .catch(error => res.status(500).json({error}));
};

exports.likeSauce = (req, res, next) => {
    if (req.body.like == 1) {
        ModelsSauce.updateOne(
            {_id: req.params.id}, 
            {$push: {usersLiked: req.body.userId},
            $inc: {likes: +1}}
        )
        .then(() => res.status(200).json({message: 'Sauce liké !'}))
        .catch(error => res.status(400).json({error})); 
    }

    if (req.body.like == 0) {
        ModelsSauce.findOne({_id: req.params.id})
        .then((sauce) => {
            if (sauce.usersLiked.includes(req.body.userId)){
                ModelsSauce.updateOne(
                    {_id: req.params.id},
                    {$pull: {usersLiked: req.body.userId},
                    $inc: {likes: -1}}
                )
                .then(() => res.status(200).json({message: 'Cette sauce ne vous intéresse plus !'}))
                .catch(error => res.status(400).json({error}));
            }
            if (sauce.usersDisliked.includes(req.body.userId)){
                ModelsSauce.updateOne(
                    {_id: req.params.id}, 
                    {$pull: {usersDisliked: req.body.userId},
                    $inc: {dislikes: -1}}
                )
                .then(() => res.status(200).json({message: 'Cette sauce ne vous intéresse plus !'}))
                .catch(error => res.status(400).json({error}));
            }
        })
        .catch(error => res.status(400).json({error}));          
    }

    if (req.body.like == -1) {
        ModelsSauce.updateOne(
            {_id: req.params.id}, 
            {$push: {usersDisliked: req.body.userId},
            $inc: {dislikes: +1}}
        )
        .then(() => res.status(200).json({message: 'Sauce disliké !'}))
        .catch(error => res.status(400).json({error}));  
        console.log('Sauce disliké !'); 
    }
 console.log(req.body);
};