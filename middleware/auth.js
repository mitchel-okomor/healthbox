const passport = require("./passport");

const auth ={
  //register a user
register:  (req, res, next) => {
  passport.authenticate('register', {session:false}, function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log(info);
      res.status(501).send(info);
    } else {
      res.status(200).send(info);
    }
  })(req, res, next);
},

//login user
login: (req, res, next) => {
  passport.authenticate('login', {session:false}, function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log("login No user: "+info);
      res.status(401).send(info);
    } else {
      res.status(200).send({info});
    }
  })(req, res, next);
},



//verify token in header
jwt: (req, res, next) => {
  console.log(req.headers);
  passport.authenticate('jwt',{session:false}, function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(401).send(info);
    } else {
      next();
    }
  })(req, res, next);
}
};
module.exports = auth;
