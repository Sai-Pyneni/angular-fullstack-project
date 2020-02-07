const express = require("express");
const Post = require("../models/posts");

const router = express.Router();

router.post ("", (req,res,next)=>{
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
    
    router.get ( "" ,(req, res, next) => {
      Post.find().then(documents => {
        console.log(documents);
        res.status(200).json({
          message: "Posts fetched succesfully!",
          posts: documents
        });
      });
      
      
    });
    
    router.put("/:id", (req,res,next)=>{
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
    
    router.get("/:id", (req,res,next)=>{
    Post.findById(req.params.id).then(post=> {
      if(post)
      {
        res.status(200).json(post);
    
      }
      else
      res.status(404).json({message: "Post not found!"});
    });
      
    });
    
    router.delete("/:id", (req, res, next) => {
      Post.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({ message: "Post deleted!" });
      });
    });
module.exports = router;
