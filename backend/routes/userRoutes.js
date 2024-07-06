const express = require("express");

const { signupUser, loginUser, getUsers } = require("../controller/userController");

const router = express.Router();
router.get("/getUsers", getUsers);
router.post("/signup", signupUser);

router.post("/login", loginUser);


module.exports = router;