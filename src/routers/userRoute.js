const express = require("express");
const router = express.Router();

const controller = require("../controllers/UserController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.get("/users", roleMiddleware(["ADMIN"]), controller.getAllUsers);
router.get("/me", authMiddleware, controller.getCurrentUser);
router.get("/:userId", authMiddleware, controller.getUserById);
router.post("/signUp", controller.signUp);
router.post("/signUp/google", controller.signUpWithGoogleOAuth);
router.post("/signIn/google", controller.signInWithGoogleOAuth);
router.post("/signIn", controller.signIn);
router.post("/logOut", authMiddleware, controller.logOut);
router.post("/refresh", authMiddleware, controller.refreshUserToken);

module.exports = router;
