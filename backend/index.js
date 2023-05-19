const express = require("express");
const app = express();
const cors = require("cors");
const paymentRouters = require("./routes/paymentRouters");

const dotenv = require("dotenv");
dotenv.config();

app.use(cors({
  origin: '*'
}));


app.use(express.json());





// app.use(express.urlencoded())

app.use("/stripe", paymentRouters);

app.listen(process.env.PORT, () => {
  console.log(`Backend is running at ${process.env.PORT}`);
});
module.exports = app;
