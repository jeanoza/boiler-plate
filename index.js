const express = require("express");
const app = express();
const port = 5000;

const { User } = require("./models/User");
const bodyParser = require("body-parser");
const config = require("./config/key");

//application/x-www-form-urlended
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected!!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World2!!!"));

app.post("/register", (req, res) => {
  //bring info for sign up(client) => save in db
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});
app.listen(port, () => console.log(`Example app est à port ${port}`));
