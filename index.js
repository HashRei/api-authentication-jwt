const express = require("express");
const authRoute = require("./routes/auth");
const mongoose = require("mongoose")
// const bodyParser = require("body-parser");
const postRoute = require("./routes/posts")
require("dotenv/config");


const app = express();

// Connect to database
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("Connected to my Mongo DB!!!!!!!!!");
});

// Middlewares
// app.use(bodyParser.json());
app.use(express.json()) // This is a body parser, ables post requests
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute)

app.listen(3000, () => console.log("Server is running on port: 3000"));
