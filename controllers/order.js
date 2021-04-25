const mongoose = require("mongoose");
require("../models/order");

const Order = mongoose.model("order");

//generate random ID
const orderId = () => {
  const letters = "0123456789ABCDEF";
  let id = "TK_";
  for (let i = 0; i < 9; i++) {
    id += letters[Math.floor(Math.random() * 16)];
  }
  return id;
};

const order = {
  create: (req, res) => {
    const { userId, cart, amount, ref } = req.body;
    const orders = {
      userId,
      orderId: orderId(),
      cart,
      amount,
      ref,
    };
    const NewOrder = new Order(orders);
    NewOrder.save(function (err, result) {
      if (err) {
        console.log(err);
      }
      res.status(200).json({
        status: "success",
        data: result,
      });
    });

    // const order = new Order({
    //   userId: req.body.id,
    //   eventId: req.body.id,
    //   quanity: req.body.quantity,
    //   token:token,
    //   verified:false
    // })
    // order.save()
    // .then(data=>{
    //   console.log(data);
    //   res.send("success");
    // }).catch(err=>{
    //   console.log(err);
    // })
  },

  get: (req, res, id) => {
    Order.findById(req.params.id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getAll: (req, res) => {
    console.log("All orders");
    Order.find({})
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  delete: (req, res) => {
    Order.findByIdAndRemove(req.params.id)
      .then((data) => {
        console.log(data);
        res.send("deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  update: (req, res) => {
    Order.findByIdAndUpdate(req.params.id, {
      quanity: req.body.quantity,
      verified: false,
    })
      .then((data) => {
        console.log(data);
        res.send("Updated");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  count: (req, res) => {
    Order.countDocuments({ userId: req.params.id, isPaid: false })
      .then((data) => {
        console.log("count data: " + data);
        res.status(200).json({ count: data });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

module.exports = order;
