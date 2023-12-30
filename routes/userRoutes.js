const express = require("express");
const { loginController, registerController, authController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//login routes|| post
router.post('/login',loginController); 

//register routes|| post
router.post('/register',registerController);

//Auth || post
router.post('/getUserData',authMiddleware,authController);

module.exports = router;