var router = express.Router();
const ssanotaaiController = require("../controllers/ssanotaaiController");
const chatapi = require("../controllers/chat-api-send-msg");

router.post(
  "/ssroutine",
  ssanotaaiController.createUser,
  ssanotaaiController.createPage,
  ssanotaaiController.createEstablishment,
  ssanotaaiController.updateEstablishmentUserId,
  ssanotaaiController.createSale
);

router.get("/listplans", ssanotaaiController.listPlans);
router.get("/listmodules", ssanotaaiController.listModules);
router.get("/getsale/:saleId", ssanotaaiController.getSale);

router.post("/whatssend", chatapi.sendMsgToVendor);
router.post(
  "/creditcardpayment/:id",
  ssanotaaiController.verifyPageBySale,
  ssanotaaiController.setIsCreditCard,
  ssanotaaiController.safe2payValidatePaymentRealized,
  ssanotaaiController.safe2payCreditCardPayment
);
router.post(
  "/billetpayment/:id",
  ssanotaaiController.verifyPageBySale,
  ssanotaaiController.safe2payValidatePaymentRealized,
  ssanotaaiController.safe2payBilletPayment
);

module.exports = router;
