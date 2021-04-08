const { User } = require("../models/User");

let auth = (req, res, next) => {
  //authentication
  //1. bring token in client cookie
  let token = req.cookies.x_auth;
  //2. decode token & search user
  //3. auth process
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    //if !user, auth No
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;
    next();
    //auth OK  :next();
  });
};

module.exports = { auth };
