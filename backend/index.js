const express = require("express");
const mongoose = require("mongoose");
 const cors = require("cors");
// const bodyParser = require("body-parser");

const DB_URL = require("./config/db.config");
const { port, Origin } = require("./config/server.config");
// const orderRoute = require("./route/order.route");
// const userRoute = require("./route/user.route");
// const authUser = require("./route/authenticateUser.route");
// const menuRoute = require("./route/menuDetails.route");
// const menuModel = require("./model/menuDetails.model");

const app = express();
app.use(cors())
app.use(express.json())



app.get("/", (req, res) => {
  res.status(200).send("reached");
});
app.get("/working", (req, res) => {
  res.status(200).send("seemsToBeWorking...ig!");
});

async function connectDb() {
  const conn = await mongoose.connect(DB_URL);
  const db = mongoose.connection;
  db.on("error", () => {
    console.log("#### Error while connecting to mongoDB ####");
  });
  db.once("open", () => {
    console.log("#### Connected to mongoDB ####");
  });

  require("./route/auth.route")(app)
  require("./route/comment.route")(app)
  require("./route/post.route")(app)

  app.listen(port, () => {
    console.log("listening...");
  });
}
connectDb();