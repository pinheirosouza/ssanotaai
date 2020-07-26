var router = express.Router();
const ssanotaaiController = require("../controllers/ssanotaaiController");

router.post(
  "/ssroutine",
  ssanotaaiController.createUser,
  ssanotaaiController.createPage,
  ssanotaaiController.createEstablishment,
  ssanotaaiController.updateEstablishmentUserId,
  ssanotaaiController.createSale,
);

router.get("/listplans", ssanotaaiController.listPlans)
router.get("/listmodules", ssanotaaiController.listModules)


module.exports = router;
