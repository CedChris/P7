const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')

const {createMessage , readMessage , updateMessage, deleteMessage, oneMessage}= require('../controllers/message.controllers');

router.post('/post',auth, createMessage)
router.get('/messages', readMessage)
router.get('/:id', oneMessage)
router.put('/:id', updateMessage)
router.delete('/:id', deleteMessage)


module.exports = router;