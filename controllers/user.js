const mongoose = require('mongoose');
require('../models/user');

const User = mongoose.model("user");

const user ={

     getUser: (req, res)=>{
        User.findById(req.params.id).then(
          data=>{
            res.send(data);
          }
        ).catch(err=>{
          console.log(err);
        })
      },


      getAllUsers: (req, res)=>{
        User.find({}).then(
          data=>{
            res.send(data);
          }
        ).catch(err=>{
          console.log(err);
        })
      },

    deleteUser: (req,res)=>{
        User.findByIdAndRemove(req.params.id).
        then(data=>{
          console.log(data);
          res.send("deleted");
        }).catch(err=>{
          console.log(err);
        })
      },
      
updateUser: (req, res)=>{
        User.findByIdAndUpdate(req.params.id, {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
        }).
        then(data=>{
          console.log(data);
          res.send("Updated");
        }).catch(err=>{
          console.log(err);
        })
      },

}


module.exports = user;
