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

app.use("/api/auth", authRoutes);

app.use("/api/shop", shopRoutes);

app.use("/api/preview", directoryRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

mongoose
  .connect(
    `mongodb://admin:admin%40123@103.82.24.207:27017/store?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then((result) => {
    console.log("Connected database");
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
