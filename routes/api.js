var express = require("express");
var router = express.Router();
const user = require("../controllers/user");
const prescription = require("../controllers/prescription");
const order = require("../controllers/order");
const auth = require("../middleware/auth");
const uplaod = require("../middleware/upload");
const payment = require("../controllers/payment");

/* payment. */
router.post("/pay", payment.start);
router.post("/verify-payment", payment.verify);

//user routes
router.post("/signup", auth.register);
router.post("/login", auth.login);
router.get("/user/:id", auth.jwt, user.getUser);
router.get("users", auth.jwt, user.getAllUsers);
router.patch("/user", auth.jwt, user.updateUser);
router.delete("/user", auth.jwt, user.deleteUser);

//event routes
router.post("/prescription", prescription.create);
router.get("/prescription", auth.jwt, prescription.getAll);
router.get("/prescriptions", auth.jwt, prescription.getUserEvents);
router.get("/prescription/:id", auth.jwt, prescription.getUserEvents);
router.patch("/prescription/:id", auth.jwt, prescription.update);
router.put("/complete/:id", auth.jwt, prescription.toggleComplete);
router.delete("/prescription/:id", auth.jwt, prescription.delete);

//ticket routes
router.post("/order", auth.jwt, order.create);
router.get("/orders", auth.jwt, order.getAll);
router.get("/order", auth.jwt, order.get);
router.patch("/order", auth.jwt, order.update);
router.get("/order-count/:id", order.count);

module.exports = router;
