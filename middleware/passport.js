const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("../models/user");
const dotenv = require("dotenv");
dotenv.config();

require("../models/user");

const User = mongoose.model("user");

const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  JWTstrategy = require("passport-jwt").Strategy,
  ExtractJWT = require("passport-jwt").ExtractJwt;

//register a user
passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      console.log(req.body);
      //hash password with bcrypt-nodejs
      let salt = bcrypt.genSaltSync(10);
      bcrypt.hash(req.body.password, salt, null, (error, hash) => {
        if (error) {
          console.log(error);
        }

        //get all user information, password has already been declared in function parameters and will be hashed below
        const firstname = req.body.firstname.trim();
        const lastname = req.body.lastname.trim();
        const phone = req.body.phone.trim();
        const email = req.body.email.trim();

        let password = hash;

        //create new user
        try {
          const newUser = new User({
            firstname,
            lastname,
            username,
            phone,
            email,
            password,
          });
          newUser
            .save()
            .then((user) => {
              console.log("Mongo: " + user);
              if (!user) {
                return done(null, false, { message: "user not registered" });
              }
              if (user) {
                //prepare user info for res
                const data = {
                  firstname: user.firstname,
                  lastname: user.lastname,
                  username: user.username,
                  role: user.role,
                  email: user.email,
                  phone: user.phone,
                  userId: user._id,
                };

                //sign token for user
                const token = jwt.sign(
                  {
                    userId: user.id,
                  },
                  process.env.SECRET,
                  { expiresIn: "12h" }
                );

                //send to user
                return done(null, user, {
                  status: "success",
                  message: "user successfully created",
                  data,
                  token,
                });
              }
              return done(null, user);
            })
            .catch((err) => {
              console.log(err);
              return done(err, null, null);
            });
        } catch (err) {
          if (err) {
            throw err;
          }
        }
      });
    }
  )
);

//login a user
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, username, password, done) {
      console.log("Strategy " + username);

      User.findOne({ email: username }, {}).then((user) => {
        if (!user) {
          return done(null, false, {
            message: "Incorrect username or password",
          });
        } else {
          console.log("bcrypt " + user.password);
          //compare user imputed password with database password
          bcrypt.compare(password, user.password, (error, valid) => {
            if (error) {
              console.log(error);
            } else if (!password || !valid) {
              return done(null, false, {
                message: "Incorrect username or password",
              });
            } else {
              const token = jwt.sign(
                {
                  userId: user.id,
                },
                process.env.SECRET,
                { expiresIn: "12h" }
              );
              const data = {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                phone: user.phone,
                role: user.role,
                _id: user._id,
              };
              return done(null, user, {
                status: "success",
                message: "logged in",
                data,
                token,
              });
            }
          });
        }
      });
    }
  )
);

//verify a user token
const opts = {
  jwtFromRequest: ExtractJWT.fromHeader("authorization"),
  secretOrKey: process.env.SECRET,
};
passport.use(
  "jwt",
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      console.log("JWT passport: " + jwt_payload.userId);
      //Pass the user details to the next middleware
      return done(null, jwt_payload.userId);
    } catch (error) {
      done(error, false);
    }
  })
);

//verify a user token for admin

passport.use(
  "jwt-admin",
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      console.log("JWT passport admin: " + jwt_payload.isAdmin);
      //Pass the user details to the next middleware
      return done(null, jwt_payload.isAdmin);
    } catch (error) {
      done(error, false);
    }
  })
);
module.exports = passport;
