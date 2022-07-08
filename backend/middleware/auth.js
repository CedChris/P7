const jwt = require('jsonwebtoken');
require ('dotenv').config();

module.exports = (req,res, next) =>{
    try {
        console.log(req.headers)
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId!== userId) {
            throw 'Invalid user ID';
        }
        else {
            next();
        }
    }
    catch(err) {
        res.status(401).json({message: 'Requete invalide :' + err})
    }
}