const express = require('express')
const cors = require('cors')
const app = express();
const helmet = require('helmet')
const multer = require('multer')
const userRoutes = require('./routes/user.route')
const messageRoutes = require('./routes/message.route')

require('dotenv').config({path: './config/.env'})
const db = require('./database/db')

app.use(cors());
app.use(helmet({crossOriginResourcePolicy: false,}));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/user', userRoutes)
app.use('/message', messageRoutes)

module.exports= app;