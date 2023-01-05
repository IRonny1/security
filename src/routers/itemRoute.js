const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const controller = require("../controllers/ItemController");

router.get("/all", authMiddleware, controller.getAllItems);
router.get("/:itemId", authMiddleware, controller.getItemById);
router.post(
  "/create",
  roleMiddleware(["MODERATOR", "ADMIN"]),
  controller.createItem
);
router.post(
  "/:itemId/update",
  roleMiddleware(["ADMIN"]),
  controller.updateItem
);
router.post(
  "/:itemId/delete",
  roleMiddleware(["ADMIN"]),
  controller.deleteItem
);

module.exports = router;
