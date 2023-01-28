const router = require("express").Router();
const rentController = require("../../../controllers/renter/rent/rent.controller");
const authMiddleware = require("../../../middleware/renter/auth.middleware");

router.post(
  "/rent",
  authMiddleware.renterProtectedRoute,
  rentController.rentCloth
);
router.post("/get-clothes", rentController.getClothes);

module.exports = router;
