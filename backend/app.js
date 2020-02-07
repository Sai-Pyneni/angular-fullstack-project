
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");

mongoose.connect('mongodb+srv://sp713s:RlVRTZ2OWpih1SlU@cluster0-b9ks5.mongodb.net/test?retryWrites=true&w=majority',{
  useUnifiedTopology: true,
  useNewUrlParser: true,
  }).then(()=>
{
  console.log("successlly connected!");
})
.catch(()=>
{
  console.log("Could not connect");
  
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/posts",postsRoutes);

  module.exports = app;