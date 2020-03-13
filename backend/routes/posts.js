const express = require("express");
const Post = require("../models/posts");
const multer = require("multer");

const router = express.Router();
const Mime_Type_Map ={
'image/png': 'png',
'image/jpeg': 'jpg',
'image/jpg': 'jpg'

};

const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    const isValid = Mime_Type_Map[file.mimetype];
    let error = new Error("invalid mime type");
    if(isValid)
    {
      error = null;
    }
    
    cb(error, "backend/images");
  },
  filename: (rq, file, cb)=>
  {
    
  const name = file.originalname.toLowerCase().split('').join('-');
  const ext = Mime_Type_Map[file.mimetype];
  cb(null, name +'-'+ Date.now()+ '.', ext);
}
});

router.post ("", multer({storage:storage}).single("image"), (req,res,next)=>{
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
