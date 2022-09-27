const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const multer = require('../middleware/multer.config')

const {createMessage , readMessage , updateMessage, deleteMessage, oneMessage, createComment, deleteComment, addLike, removeLike}= require('../controllers/message.controllers');

// CRUD Message

router.post('/post',auth,multer, createMessage)
router.get('/messages', readMessage)
router.get('/:id', oneMessage)
router.put('/:id',auth, updateMessage)
router.delete('/:id',auth, deleteMessage)

//Likes

router.patch('/add-like/:id', addLike)
router.patch('/remove-like/:id', removeLike)

// CRUD Commentaire

router.patch('/comment/:id', createComment)
router.patch('/delete-comment/:id', deleteComment)

module.exports = router;