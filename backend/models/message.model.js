const mongoose = require("mongoose");

const messageShema = new mongoose.Schema(
  {
    idPoster: { type: String, require: true },
    pseudo: { type: String, require: true },
    message: { type: String, max: 256, require: true },
    picture: { type: String },
    like: { type: Number, defaut: 0 },
    usersLiked: { type: [String] },
    comments: {
      type: [
        { idPosterComment: String, commenterPseudo: String, text: String },
      ],
      timestamps: true,
    },
  },
  { timestamps: true }
);

const messageModel = mongoose.model("message", messageShema);
module.exports = messageModel;
