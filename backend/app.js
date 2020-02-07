
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
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.post ("/api/posts", (req,res,next)=>{
const posts = new Post({
  title: req.body.title,
  content: req.body.content
});
posts.save().then(result => {
  res.status(201).json({
    message: "Post added successfully",
    postId: result._id  
});
console.log(posts);

});

});

app.get ( "/api/posts" ,(req, res, next) => {
  Post.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message: "Posts fetched succesfully!",
      posts: documents
    });
  });
  
  
});

app.put("/api/posts/:id", (req,res,next)=>{
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post).then(result =>{
    console.log(result);
    res.status(200).json({message: "Update Successful!"});

  })

});

app.get("/api/posts/:id", (req,res,next)=>{
Post.findById(req.params.id).then(post=> {
  if(post)
  {
    res.status(200).json(post);

  }
  else
  res.status(404).json({message: "Post not found!"});
});
  
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});
  module.exports = app;