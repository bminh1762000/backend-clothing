const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const authRoutes = require("./routes/auth");
const directoryRoutes = require("./routes/directory");
const shopRoutes = require("./routes/shop");

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRoutes);

app.use("/shop", shopRoutes);

app.use("/preview", directoryRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

mongoose
  .connect("mongodb://localhost:27017/shop", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((result) => {
    console.log("Connected database");
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });