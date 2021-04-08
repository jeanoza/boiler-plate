const express = require("express");
const app = express();

const { User } = require("./models/User");
const cookieParser = require("cookie-parser");
const { auth } = require("./middleware/auth");

//application/x-www-form-urlended
app.use(express.urlencoded({ extended: true }));
//application/json
app.use(express.json());
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URL || "mongodb://localhost/boiler-plate", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected!!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World2!!!"));

app.get("/api/hello", (req, res) => res.send("Bonjour"));

//sign up
app.post("/api/users/register", (req, res) => {
  //bring info for sign up(client) => save in db
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

//login
app.post("/api/users/login", (req, res) => {
  //1. search if req.body.email in db
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "No email registered",
      });
    //2. if email, verify if req.password is correct
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "Wrong password",
        });
      //3. if correct password, create token
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        //4. save tokken in application(Where : 1/cookie 2/LocalStorage 3/Session)
        //in this case, save in cookie
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  //if function is here having passed "auth", Authentication is true
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`Example app est à port 5000`)
);
