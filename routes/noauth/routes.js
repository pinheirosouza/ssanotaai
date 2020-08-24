var router = express.Router();

const user = require("./routes/user");
router.use("/user", user);
const ssanotaai = require("./routes/ssanotaai");
router.use("/ssanotaai", ssanotaai);



module.exports = router;
