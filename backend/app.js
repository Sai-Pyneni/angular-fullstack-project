
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const Post = require("./models/posts")

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
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post ("/api/posts", (req,res,next)=>{
const posts = new Post({
  title: req.body.title,
  content: req.body.content
});
console.log(posts);
res.status(201).json({
message: "Post added successfully"
});

});

app.get ( "/api/posts" ,(req, res, next) => {
  const posts = [
    {
      id: "fadf12421l",
      title: "First server-side post",
      content: "This is coming from the server"
    },
    {
      id: "ksajflaj132",
      title: "Second server-side post",
      content: "This is coming from the server!"
    }
  ];
  res.status(200).json({
    message: "Posts fetched succesfully!",
    posts: posts
  });
});
  module.exports = app;