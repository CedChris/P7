const mongoose = require('mongoose')


const messageShema = new mongoose.Schema(
    {   
        idPoster : {
            type:String,
            require:true
        },
        message:{
            type: String,
            max: 256,
            require:true
        },
        photo:{
            type:String
        },
        video: {
            type: String,
        },
        like:{
            type:[String]
        },
        comments : {
            type : [
                {
                    commenterId: String,
                    commenterPseudo: String,
                    text: String,
                    timestamp: Number,
                }
            ]
        }
})

const messageModel = mongoose.model('message', messageShema)
module.exports = messageModel;