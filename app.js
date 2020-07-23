express = require("express");
mongoose = require("mongoose");
mongoose.Promise = require("q").Promise;
moment = require("moment-timezone");
moment.tz.setDefault("America/Sao_Paulo");
socketIO = require("socket.io");
ObjectIDForModel = mongoose.Schema.Types.ObjectId;
ObjectId = mongoose.Types.ObjectId;
mongoose.Promise = require("q").Promise;
jwt = require("jsonwebtoken");
Promise = require("bluebird");
multipart = require("connect-multiparty");
multipartMiddleware = multipart({
  maxFilesSize: 1024 * 1024,
});
Sentry = require("@sentry/node");

const bodyParser = require("body-parser");
const database = require("./config/db");

const app = express();
var cors = require("cors");

app.use(
  bodyParser.json({
    limit: "1mb",
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "1mb",
    extended: true,
  })
); // support encoded bodies
app.use(cors());

app.set("port", process.env.PORT || 3000);

database
  .connect()
  .then(() => {
    if (!module.parent) {
      const server = app.listen(app.get("port"), function () {
        console.log("servidor ligado porta " + app.get("port"));
      });
      server.timeout = 45000;
    }

    app.use(function (req, res, next) {
      res.status(404);

      // respond with html page
      if (req.accepts("html")) {
        res.send("Not found");
        return;
      }

      // respond with json
      if (req.accepts("json")) {
        res.send({
          error: "Not found",
        });
        return;
      }

      // default to plain-text. send()
      res.type("txt").send("Not found");
    });
  })
  .catch((e) => {
    console.log(e);
    Sentry.captureException(e);
  });

var partnersAuthRoutes = require("./routes/partnerauth/routes");
app.use("/partnerauth", partnersAuthRoutes);

var noAuthRoutes = require("./routes/noauth/routes.js");
app.use("/noauth", noAuthRoutes);

module.exports = app;
