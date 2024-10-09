const express = require("express");
const UserController = require("../controllers/UserController");
const { isLoggedIn } = require("../helpers/middleware");
const router = express.Router();

// define the home page route
router.get("/register", UserController.getRegister);

router.post("/register", UserController.postRegister);

router.get("/login", UserController.getLogin);

router.post("/login", UserController.postLogin);

router.use(isLoggedIn);

router.get("/:userId", UserController.getAllMR);

router.get("/addMedicalRecord/:userId", UserController.getAddMR);

module.exports = router;
