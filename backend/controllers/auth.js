const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err)
      });
    }
    user.salt = undefined;
    user.hash_password = undefined;
    res.json({
      user
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup"
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password dont match"
      });
    }
    // if user is found make sure email and password match
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("t", token, { expire: new Date() + 9999 });
    const { _id, email, name, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout success" });
};

exports.protect = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth"
});

exports.isAuth =(req,res,next)=>{
  let user = req.profile && req.profile._id == req.auth._id
  if(!user){
    return res.status(403).json({
      error:'Access denied'
    })
  }
  next();
}

exports.isAdmin = (req,res,next)=>{
  if(req.profile.role === 0){
    return res.status(403).json({
      error:'Admin resource! Access denied'
    })
  }
  next()
}
