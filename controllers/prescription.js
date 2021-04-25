const mongoose = require("mongoose");
require("../models/prescription");

const Prescription = mongoose.model("prescription");
//generate random ID
const orderId = () => {
  const letters = "0123456789ABCDEF";
  let id = "PSC";
  for (let i = 0; i < 6; i++) {
    id += letters[Math.floor(Math.random() * 16)];
  }
  return id;
};

const prescription = {
  create: (req, res) => {
    console.log("Creating prescription");
    const { firstname, lastname, prescription, phone } = req.body;
    const newPrescription = new Prescription({
      firstname,
      lastname,
      prescription,
      phone,
      orderId: orderId(),
    });

    newPrescription
      .save()
      .then((data) => {
        console.log(data);
        res.json({ message: "success", data });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  get: (req, res, id) => {
    Prescription.findById(req.params.id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getUserEvents: (req, res) => {
    Prescription.find({ userId: req.params.id }, {})
      .then((data) => {
        console.log(data);
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getAll: (req, res) => {
    Prescription.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  delete: (req, res) => {
    Prescription.findByIdAndRemove(req.params.id)
      .then((data) => {
        console.log(data);
        res.send("deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  update: (req, res) => {
    console.log("updating");
    const { title, description, venue, date, time, userId, price } = req.body;
    Prescription.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        venue,
        date,
        time,
        price,
        userId,
        _id: req.params.id,
      },
      {
        new: true,
      }
    )
      .then((data) => {
        console.log(data);
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  togglePublish: (req, res, id) => {
    Prescription.findById(req.params.id)
      .then((data) => {
        const isPublished = data.isPublished;
        console.log("publish 117: " + isPublished);
        if (isPublished === "true") {
          Prescription.findByIdAndUpdate(
            req.params.id,
            {
              isPublished: false,
              _id: req.params.id,
            },
            {
              new: true,
            }
          )
            .then((data) => {
              // console.log("is published: "+data);
              res.send(data);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          Prescription.findByIdAndUpdate(
            req.params.id,
            {
              isPublished: true,
              _id: req.params.id,
            },
            {
              new: true,
            }
          )
            .then((data) => {
              console.log("is published: " + data);
              res.send(data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  toggleComplete: (req, res, id) => {
    Prescription.findById(req.params.id)
      .then((data) => {
        const isCompleted = data.isCompleted;
        console.log("complete 155: " + isCompleted);
        if (isCompleted === "true") {
          Prescription.findByIdAndUpdate(
            req.params.id,
            {
              isCompleted: false,
              _id: req.params.id,
            },
            {
              new: true,
            }
          )
            .then((data) => {
              // console.log("is published: "+data);
              res.send(data);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          Prescription.findByIdAndUpdate(
            req.params.id,
            {
              isCompleted: true,
              _id: req.params.id,
            },
            {
              new: true,
            }
          )
            .then((data) => {
              console.log("is published: " + data);
              res.send(data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

module.exports = prescription;
