const router = require("express").Router();	

const {isUnAuthenticated} = require("../middleware/authMiddleware");
const User = require("../models/User");
const { 
    signupGetController,
    signupPostController,
    loginGetController,
    loginPostController,
    logoutController

} = require("../controllers/authController");

const signupValidator = require("../validator/auth/signupValidator");
const loginValidator = require("../validator/auth/loginValidator");

router.get("/signup", isUnAuthenticated, signupGetController);
router.post("/signup",signupValidator, signupPostController);

router.get("/login", isUnAuthenticated, loginGetController);
router.post("/login", isUnAuthenticated, loginValidator, loginPostController);

router.get("/logout", logoutController);

module.exports = router