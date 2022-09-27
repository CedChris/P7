const express = require('express');
const router = express.Router();

const {signup , login , allUsers, oneUser} = require('../controllers/user.controllers')

const auth = require('../middleware/auth')

router.post("/signup", signup)
router.post("/login", login)

router.get("/users", allUsers)
router.get("/:id", oneUser)


module.exports = router;