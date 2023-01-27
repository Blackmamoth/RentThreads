const router = require("express").Router();
const TlAuthController = require("../../controllers/tlAuth/auth.controller");

router.post("/register", TlAuthController.registerThreadLord);
router.post("/login", TlAuthController.loginThreadLord);

module.exports = router;
