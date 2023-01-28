const router = require("express").Router();
const inventoryController = require("../../../controllers/TL/inventory/inventory.controller");
const tlAuthMiddleware = require("../../../middleware/TL/auth.middleware");

router.post(
  "/add-cloth",
  tlAuthMiddleware.tlProtectedRoute,
  inventoryController.addCloth
);
router.post(
  "/get-clothes",
  tlAuthMiddleware.tlProtectedRoute,
  inventoryController.getClothes
);
router.patch(
  "/update-clothes",
  tlAuthMiddleware.tlProtectedRoute,
  inventoryController.updateClothes
);
router.delete(
  "/delete-cloth",
  tlAuthMiddleware.tlProtectedRoute,
  inventoryController.deleteCloth
);

module.exports = router;
