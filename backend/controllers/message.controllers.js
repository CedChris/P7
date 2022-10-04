const messageModel = require("../models/message.model");
const ObjectId = require("mongoose").Types.ObjectId;
const fs = require("fs");

exports.createMessage = (req, res) => {
  if (req.file !== undefined) {
    const newMessage = new messageModel({
      idPoster: req.body.userId,
      pseudo: req.body.pseudo,
      message: req.body.message,
      picture: `${req.protocol}://${req.get("host")}/image/${
        req.file.filename
      }`,
      comments: [],
    });
    newMessage
      .save()
      .then((data) => {
        res.status(201).json({ message: "Message crée" + data });
      })
      .catch((err) =>
        res.status(400).json({ message: "Erreur message" + err })
      );
  } else {
    const newMessage = new messageModel({
      idPoster: req.body.userId,
      pseudo: req.body.pseudo,
      message: req.body.message,
      comments: [],
    });
    newMessage
      .save()
      .then((data) => {
        res.status(201).json({ message: "Message crée" + data });
      })
      .catch((err) =>
        res.status(400).json({ message: "Erreur message" + err })
      );
  }
};

exports.readMessage = async (req, res) => {
  await messageModel
    .find()
    .select()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json({ message: "Message inconnu" + err }));
};
exports.oneMessage = (req, res) => {
  const idValid = ObjectId.isValid(req.params.id);
  if (idValid) {
    messageModel.findById(req.params.id, (err, data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json({ message: "Message introuvable :" + err });
      }
    });
  } else {
    res.status(400).send({ message: "Message inconnu :" + req.params.id })
  }
};
exports.updateMessage = async (req, res) => {
  await messageModel.findById(req.params.id).then((data) => {
    if (data.idPoster != req.auth.userId && req.auth.isAdmin === false) {
      res.status(400).json({ message: "User invalide " });
    } else {
      messageModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            message: req.body.message,
          },
        },
        { new: true },
        (err, data) => {
          if (data) res.status(200).json(data);
          else res.status(400).json({ message: "Erreur modification" + err });
        }
      );
    }
  });
};

exports.deleteMessage = async (req, res) => {
  await messageModel.findById(req.params.id).then((data) => {
    if (data.idPoster != req.auth.userId && req.auth.isAdmin === false) {
      res.status(400).json({ message: "User invalide " });
    } else {
      messageModel.findByIdAndDelete(req.params.id, (err, data) => {
        if (!data) {
          res.status(400).json("Supression impossible" + err);
        } else {
          if (data.picture !== undefined) {
            const filename = data.picture.split("/image/")[1];
            fs.unlink(`image/${filename}`, () => {
              return res.status(200).json("Supression effectuée");
            });
          } else {
            return res.status(200).json("Suppression effectuée");
          }
        }
      });
    }
  });
};
// Commentaire
exports.createComment = (req, res) => {
  const idValid = ObjectId.isValid(req.params.id);
  if (idValid) {
    messageModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            idPosterComment: req.body.idPosterComment,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
          },
        },
      },
      { new: true },
      (err, data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(400).json({ message: "Erreur Creation Message" + err });
        }
      }
    );
  } else {
    res.status(400).json({ message: "Erreur Update Authentification" + err });
  }
};
exports.deleteComment = (req, res) => {
  const idValid = ObjectId.isValid(req.params.id);
  if (idValid) {
    messageModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.idcomment,
          },
        },
      },
      { new: true },
      (err, data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(400).json({ message: "Erreur Suppresion Message" + err });
        }
      }
    );
  } else {
    res.status(400).json({ message: "Erreur Correspondance ID" + err });
  }
};
exports.addLike = (req, res) => {
  const idValid = ObjectId.isValid(req.params.id);
  if (idValid) {
    messageModel.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { like: +1 },
        $push: { usersLiked: req.body.usersLiked },
      },
      { new: true },
      (err, data) => {
        if (data) {
          res.status(201).json({ message: "Like ajouté" + data });
        } else {
          res.status(400).json({ message: "Erreur like" + err });
        }
      }
    );
  }
};
exports.removeLike = (req, res) => {
  const idValid = ObjectId.isValid(req.params.id);
  if (idValid) {
    messageModel.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { like: -1 },
        $pull: { usersLiked: req.body.usersLiked },
      },
      { new: true },
      (err, data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(400).json({ message: "Erreur Suppresion like" + err });
        }
      }
    );
  }
};
