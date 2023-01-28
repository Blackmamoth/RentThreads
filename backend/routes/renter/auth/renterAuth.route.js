const router = require("express").Router();
const renterAuthController = require("../../../controllers/renter/auth/renterAuth.controller");

router.post("/register", renterAuthController.registerRenter);
router.post("/login", renterAuthController.loginRenter);
router.post("/refresh", renterAuthController.refreshRenterToken);

module.exports = router;
