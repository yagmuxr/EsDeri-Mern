const express = require("express");
const router = express.Router();

// Diğer rota dosyalarını içe aktarıyoruz
const categoryRoute = require("./categories.js");
const productRoute = require("./products.js");
const authRoute = require("./auth.js");
const couponRoute = require("./coupons.js");
const userRoute = require("./users.js");
const paymentRoute = require("./payments.js");
const orderRoute = require("./orders.js");

// Her rotayı ilgili yol altında kullanıyoruz
router.use("/categories", categoryRoute);
router.use("/products", productRoute);
router.use("/auth", authRoute);
router.use("/coupons", couponRoute);
router.use("/users", userRoute);
router.use("/payment", paymentRoute);
router.use("/orders", orderRoute);

module.exports = router;