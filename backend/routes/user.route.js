const express = require('express');
const router = express.Router();

const {signup , login , allUsers, oneUser, updateUser, deleteUser, follow} = require('../controllers/user.controllers')
const auth = require('../middleware/auth')

router.post("/signup", signup)
router.post("/login", login)

router.get("/users",auth, allUsers)
router.get("/:id", oneUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.patch('/follow/:id', follow)
// router.patch('/unfollow/:id', unfollow)

module.exports = router;