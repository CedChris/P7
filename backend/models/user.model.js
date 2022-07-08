const mongoose = require('mongoose')
const {isEmail} = require('validator')

const UserShema = new mongoose.Schema(
{
    pseudo:{
        type: String,
        required: true,
        unique: true,
        minlenght: 3,
        maxlength: 30,
        trimp: true
    },
    email: {
        type: String,
        unique: true,
        validate: isEmail,
        required: true,
        lowercase:true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        max: 255,
        minlength:8
    },
    picture: {
        type: String
    },
    likes : {
        type: [String]
    },
}
)
const userModel = mongoose.model('user', UserShema)
module.exports = userModel;