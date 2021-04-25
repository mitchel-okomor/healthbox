const mongoose = require("mongoose");
require("../models/order");
require("../models/payment");
const jwt = require("jsonwebtoken");

const Order = mongoose.model("order");
const Payment = mongoose.model("payment");

const request = require("request");
const { initializePayment, verifyPayment } = require("../utility/paystack")(
  request
);

const payment = {
  start: (req, res, next) => {
    const { first_name, last_name, email, amount, orderId } = req.body;
    const form = {
      amount,
      email,
      first_name,
      last_name,
    };

    initializePayment(form, (error, body) => {
      if (error) {
        //handle errors
        console.log(error);
        return;
      }
      const response = JSON.parse(body);
      Order.findByIdAndUpdate(orderId, {
        ref: response.data.reference,
      })
        .then((data) => {
          console.log(data);
        })
        .then(() => {
          res.status(200).json(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },

  verify: async (req, res) => {
    console.log("Body: " + req.body);
    const { ref, orderId, full_name, email, quantity } = req.body;
    console.log("ref: " + ref.reference);
    verifyPayment(ref.reference, (error, body) => {
      if (error) {
        //handle errors appropriately
        console.log(error);
      }
      const response = JSON.parse(body);
      const { status, paid_at, reference } = response.data;
      console.log("Payment status: " + status);
      //update order
      if (status === "success") {
        Order.findByIdAndUpdate(orderId, {
          isPaid: true,
        })
          .then((data) => {
            //todo save payment info to database
            res.status(200).json(data);
          })
          .catch((err) => {
            console.log(err);
          });

        const payment_info = { full_name };
      }
    });
  },
};

module.exports = payment;
