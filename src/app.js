require("dotenv").config();

const express = require("express");
const router = require("./Routes/routes");
const cors = require("cors");

const mongoose = require("mongoose");
const token = require("./Controllers/SellbieController");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/bagaggio/", router);

console.log(token.token);

mongoose.connect(`${process.env.MONGOOSE_URL}`).then(() => {
  console.log("Connected to Mongoose");
  app.listen(process.env.PORT || 3333, () => {
    console.log(`Server running at port ${process.env.PORT}`);
  });
});
