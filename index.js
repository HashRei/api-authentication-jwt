const express = require("express");
const authRoute = require("./routes/auth");
const mongoose = require("mongoose")
require("dotenv/config");

const app = express();

// Middlewares
app.use("/api/user", authRoute);


// Connect to database
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log("Connected to my Mongo DB!!!!!!!!!");
  });

app.listen(3000, () => console.log("Server is running on port: 3000"));
