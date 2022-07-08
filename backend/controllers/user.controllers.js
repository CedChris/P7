const userModel = require('../models/user.model')
const ObjectId = require ('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();

exports.signup = (req,res) =>{
    const {pseudo,email,password,age} = req.body;
    bcrypt.hash(password, 10)
    .then(hash =>{
        const user = new userModel({
            pseudo: pseudo,
            email: email,
            password: hash,
        });
        user.save()
        .then(() => res.status(200).json({message:"Utilisateur enregistré!"}))
        .catch ((err) => res.status(500).json({message: 'ici' + err}))
    })
    .catch(err => res.status(400).json("Problème d'incription lors du hashage" + err))
};
exports.login = (req,res) =>{
    const {email,password} = req.body;
    console.log(email, password);
    userModel.findOne({email : email})
        .then(user => {
            if(!user)
                return res.status(401).json({message : 'Utilisateur inconnu'});
            bcrypt.compare(password, user.password)
                .then(comparePassword =>{
                    if(!comparePassword){
                       return res.status(400).json('Mot de passe incorrect')
                    }
                    res.status(200).json({
                        userId : user._id,
                        token : jwt.sign({userId: user._id},process.env.TOKEN,{expiresIn:'24h'})
                    })
                })
        })
        .catch(err => res.status(500).json({err}))
}
exports.allUsers = (req, res) =>{
    userModel.find().select('-password')
    .then((data) =>{
        res.status(200).json(data)
        console.log(data);
    })
    .catch(err => res.status(400).json({message : 'Utilisateur inconnu' + err}));
}
exports.oneUser = (req,res) =>{
    const idValid = ObjectId.isValid(req.params.id)
    if (idValid){
        userModel.findById(req.params.id, (err,data) =>{
            if(data){
                res.status(200).json(data)
            }
            else{
                res.status(400).json({message: 'Utilisateur inconnu :' + err})
            }
        }).select('-password')
    }
    else {
        res.status(400).send({message : 'Utilisateur inconnu :' + req.params.id})
    }
}
exports.updateUser = (req, res) =>{
    const idValid = ObjectId.isValid(req.params.id)
    if (idValid){
        userModel.findByIdAndUpdate({
            _id: req.params.id
        },
        {
            $set: {
                bio: req.body.bio
            }
        },
        {
            new:true ,
            upsert: true, 
            setDefaultsOnInsert:true
        },
        (err, data) => {
            if(data){
                res.status(200).json(data)
            }
            else {
                res.status(400).json({message: 'Erreur de modification ' + err})
            }
        }
        )
    }
}
exports.deleteUser = (req, res) =>{
    const idValid = ObjectId.isValid(req.params.id)
    if(idValid) {
        userModel.remove({_id: req.params.id}).exec();
        res.status(200).json('Utilisateur supprimé')
    }
    else{
        res.status(400).json({message: 'Erreur suppression'})
    }
    
}
exports.follow = (req, res) => {
    const idValid = ObjectId.isValid(req.params.id)
    const idToFollow = req.body.idFollow
    if(idValid || idToFollow){
        userModel.findByIdAndUpdate(
        req.params.id, 
        {
            $addToSet : {
                following : req.body.idToFollow
            }
        },
        { new:true ,upsert: true },
        (err, data) => {
            if(data) {
                res.status(200).json(data)
            }
            else {
                res.status(400).json({message: 'Follow échoué ' + err})
            }
        }
        )
    }
    else {
        res.status(400).json({message: 'ID manquant'})
    }
}
