const userModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = (req, res) => {
  const { pseudo, email, password} = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const user = new userModel({
        pseudo: pseudo,
        email: email,
        password: hash,
        isAdmin: false,
      });
      user
        .save()
        .then(() =>
          res.status(200).json({ message: "Utilisateur enregistré!" })
        )
        .catch((err) => res.status(500).json({ message: "Problème Sauvegarde Utilisateur" + err }));
    })
    .catch((err) =>
      res.status(400).json("Problème d'incription lors du hashage" + err)
    );
};
exports.login = (req, res) => {
  const { email, password} = req.body;
  userModel
    .findOne({ email: email })
    .then((user) => {
      if (!user)
        return res.status(401).json({ message: "Utilisateur inconnu" });
      bcrypt.compare(password, user.password).then((comparePassword) => {
        if (!comparePassword) {
          return res.status(400).json("Mot de passe incorrect");
        }
        res.status(200).json({
          userId: user._id,
          token: jwt.sign(
            { userId: user._id, isAdmin: user.isAdmin },
            process.env.TOKEN,
            { expiresIn: "24h" }
          ),
          pseudo: user.pseudo,
        });
      });
    })
    .catch((err) => res.status(500).json({ err }));
};
exports.allUsers = (req, res) => {
  userModel
    .find()
    .select("-password")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).json({ message: "Utilisateur inconnu" + err })
    );
};
exports.oneUser = (req, res) => {
  const idValid = ObjectId.isValid(req.params.id);
  if (idValid) {
    userModel
      .findById(req.params.id, (err, data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(400).json({ message: "Utilisateur inconnu :" + err });
        }
      })
      .select("-password");
  } else {
    res.status(400).send({ message: "Utilisateur inconnu :" + req.params.id });
  }
};
