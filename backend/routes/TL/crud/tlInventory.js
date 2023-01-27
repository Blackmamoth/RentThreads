const router = require("express").Router();
const inventoryController = require("../../../controllers/TL/inventory/inventory.controller");

router.post("/add-cloth", inventoryController.addCloth);
router.post("/get-clothes", inventoryController.getClothes);

module.exports = router;
