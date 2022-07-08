const { json } = require('express');
const messageModel = require('../models/message.model');
const userModel = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;
const multer = require('../middleware/multer.config')

exports.createMessage = async (req, res) =>{
    const newMessage = new messageModel({
        idPoster : req.body.idPoster,
        message: req.body.message,
        // picture : [`${req.protocol}://${req.get("host")}/images/${req.file.filename}`],
        comments :[]
    })
    await newMessage.save()
        .then((data) =>{
            res.status(201).json({message: 'Message crée' + data})
        })
        .catch (err => res.status(400).json({message : 'Erreur message' + err}))
        
}
exports.readMessage = async (req, res) =>{
    await messageModel.find().select()
        .then((data) =>{
            res.status(200).json(data)
        })
        .catch(err => res.status(400).json({message: 'Message inconnu' + err}))
}
exports.oneMessage = (req,res) =>{
    const idValid = ObjectId.isValid(req.params.id)
    console.log(req.params.id);
    if (idValid){
        messageModel.findById(req.params.id, (err,data) =>{
            if(data){
                console.log(data);
                res.status(200).json(data)
            }
            else{
                res.status(400).json({message: 'Message introuvable :' + err})
            }
        })
    }
    else {
        res.status(400).send({message : 'Message inconnu :' + req.params.id})
    }
}
exports.updateMessage = (req, res) => {
    const idValid = ObjectId.isValid(req.params.id)
    if(idValid) {
        messageModel.findByIdAndUpdate(req.params.id,
        {
            $set: {
            message : req.body.message,
            // picture : [`${req.protocol}://${req.get("host")}/images/${req.file.filename}`]
            }
        },
        { new : true},
        (err, data) => {
            if (data)
                res.status(200).json(data)
            else 
                res.status(400).json({message : 'Erreur modification' + err})
        }
        )
    }
    else
        res.status(400).json({message : 'Id invalide'})
}
exports.deleteMessage = (req, res) =>{
    const idValid = ObjectId.isValid(req.params.id)
    if(idValid){
        messageModel.findByIdAndDelete(req.params.id, (err,data) => {
            if(data){
                res.status(200).json(data)
            }
            else {
                res.status(400).json({message : 'Suppresion impossible ' + err})
            }
        }) 
    }
    else{
        res.status(400).json({message : 'Id invalide '})
    }
}