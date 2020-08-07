var router = express.Router();
const userController = require("../controllers/userController");

router.post("/newuser", userController.createUser);

module.exports = router;
