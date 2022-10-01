const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://${process.env.DB}@cluster0.ryc3y.mongodb.net/groupomania`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.log(err));
