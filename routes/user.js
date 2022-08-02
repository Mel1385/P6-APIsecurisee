const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const passwordCheck = require("../middleware/password");


//routes for login and signup : user
router.post('/signup', passwordCheck, userController.signup);
router.post('/login', userController.login); 




module.exports = router;
