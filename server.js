const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const package = require("./package.json");
const port = process.env.PORT;
const db = require("./app/models");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({
    message: `Welcome to Note Application.`,
  });
});

// routes
require("./app/routes/noteData.routes")(app);
require("./app/routes/auth.routes")(app);

//handle all kind of error that sent by this app
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message || "Server Error";
  const data = error.data || [];
  res.status(status).json({
    message: message,
    data: data,
  });
});
//Staring db and server
db.mongoose
  .connect(
    process.env.MONGO_URI_DEV,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    app.listen(port, () => {
    });
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

