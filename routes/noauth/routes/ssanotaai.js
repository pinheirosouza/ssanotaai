var router = express.Router();
const ssanotaaiController = require("../controllers/ssanotaaiController");

router.post(
  "/ssroutine",
  ssanotaaiController.createUser,
  ssanotaaiController.createPage,
  ssanotaaiController.createEstablishment
);

module.exports = router;
